import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MessagingTemplatesService } from '../../../services/messaging-templates.service';
import { Constants } from '../../../common/constants';
import * as CustomBuild from '../ckeditor5-build-classic/build/ckeditor';

@Component({
  selector: 'app-edit-messaging-templates',
  templateUrl: './edit-messaging-templates.component.html',
  styleUrls: ['./edit-messaging-templates.component.scss']
})
export class EditMessagingTemplatesComponent implements OnInit {
  editTmpltForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  allActiveBrands: any[];
  templateId : string;
  showLoadingSpinner: boolean = true;
  public Editor = CustomBuild;
  allEmailTypes: any[];
  public config={
    toolbar:['heading','bold','italic','link','bulletedList','numberedList','|','outdent','indent','|','imageUpload','blockQuote','insertTable','mediaEmbed','undo','redo','sourceEditing'],
    language:'en'

  };
  
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private messagingTemplatesService: MessagingTemplatesService,
    private cdr: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.getAllEmailTypes();
      this.getAllActiveBrands();
    }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id');
    /****************Edit Email Template Form Validation****************** */
    this.editTmpltForm = this.formBuilder.group({
      emailType: ['', [Validators.required]],
      fromAddress: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      tmpltStatus: [true],
      template: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editTmpltForm.controls; }

  /**********************************API Method to Get All Email Types*********************/
  getAllEmailTypes() {
    this.messagingTemplatesService.getAllEmailTypes().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.allEmailTypes = res['result'];
       } else {
          this.alerts = [{
            type: 'danger',
            msg: res['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
       }
      },error=>{
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      }
    );
  }

  /**********************************API Method to Get All active Brands*********************/
  getAllActiveBrands() {
    this.commonService.getAllActiveBrands(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.allActiveBrands = res['result'];
        this.getTemplateDetail();
       } else {
          this.alerts = [{
            type: 'danger',
            msg: res['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
       }
      },error=>{
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      }
    );
  }

  /**************************Method to get email template detail to prefill the form*******************************/
  getTemplateDetail() {
    this.messagingTemplatesService.getTmpltDetail(this.templateId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            this.editTmpltForm.controls['emailType'].setValue(data['email_type_id']);
            this.editTmpltForm.controls['fromAddress'].setValue(data['from_address']);
            this.editTmpltForm.controls['subject'].setValue(data['subject']);
            this.editTmpltForm.controls['brandName'].setValue(data['brand_id']);
            this.editTmpltForm.controls['tmpltStatus'].setValue(this.commonService.setStatusValue(parseInt(data['is_active'])));
            this.editTmpltForm.controls['template'].setValue(data['template']);
        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_EMAIL_TMPLT_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_EMAIL_TMPLT_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit edit email template***************************************** */
  editTmpltFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editTmpltForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['emailType'] = this.f.emailType.value;
    dataObj['brandId'] = this.f.brandName.value;
    dataObj['fromAddress'] = this.f.fromAddress.value;
    dataObj['subject'] = this.f.subject.value;
    dataObj['subject'] = this.f.subject.value;
    dataObj['status'] = this.commonService.getStatusValue(this.f.tmpltStatus.value);
    dataObj['template'] = this.f.template.value;
    
    this.messagingTemplatesService.editEmailTmplt(this.templateId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_EMAIL_TMPLT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/messagingtemplates/all']);
            }, 2000);*/
          } else {
            let errorMsg = Constants.UPDATE_EMAIL_TMPLT_FAILURE_MSG;
            if(resStatus==2) {
              errorMsg = Constants.UPDATE_EMAIL_TMPLT_RULE_EXISTS_MSG;
            }
            this.alerts = [{
              type: 'danger',
              msg: errorMsg,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.UPDATE_EMAIL_TMPLT_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }
}
