import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Router} from '@angular/router';
import { MessagingTemplatesService } from '../../../services/messaging-templates.service';
import { Constants } from '../../../common/constants';
import * as CustomBuild from '../ckeditor5-build-classic/build/ckeditor';

@Component({
  selector: 'app-add-messaging-templates',
  templateUrl: './add-messaging-templates.component.html',
  styleUrls: ['./add-messaging-templates.component.scss']
})
export class AddMessagingTemplatesComponent implements OnInit {
  addNewTmpltForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  allActiveBrands: any[];
  public Editor = CustomBuild;
  allEmailTypes: any[];
  
  public config={
    toolbar:['heading','bold','italic','link','bulletedList','numberedList','|','outdent','indent','|','imageUpload','blockQuote','insertTable','mediaEmbed','undo','redo','sourceEditing'],
    language:'en',
    startupMode: 'sourceEditing'

  };
  

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private messagingTemplatesService: MessagingTemplatesService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { 
      this.getAllEmailTypes();
      this.getAllActiveBrands();
    }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    /****************Add New Email Template Form Validation****************** */
    this.addNewTmpltForm = this.formBuilder.group({
      emailType: ['', [Validators.required]],
      fromAddress: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      tmpltStatus: [true],
      template: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewTmpltForm.controls; }

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

  /*******************************Method to submit add new email template form***************************************** */
  addNewTmpltFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewTmpltForm.invalid) {
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
    this.messagingTemplatesService.addNewTemplate(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_EMAIL_TMPLT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/messagingtemplates/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_EMAIL_TMPLT_FAILURE_MSG;
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
          msg: Constants.ADD_EMAIL_TMPLT_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }
}
