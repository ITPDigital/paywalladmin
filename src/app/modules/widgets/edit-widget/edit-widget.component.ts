import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { ActivatedRoute, Router} from '@angular/router';
import { WidgetsService } from '../../../services/widgets.service';
import { Constants } from '../../../common/constants';
import * as CustomBuild from '../ckeditor5-build-classic/build/ckeditor';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.scss']
})
export class EditWidgetComponent implements OnInit {
  editWidgetForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  allActiveBrands: any[];
  widgetTypeArr : any[] = Constants.WIDGET_TYPE_DATA;
  widgetActionArr : any[];
  widgetActionFltrArr : any[];
  widgetGroupArr : any[];
  widgetCntTypeArr : any[];
  widgetCntCatArr : any[];
  selWidgetAction : number;
  selWidgetType : number;
  widgetId : string;
  showLoadingSpinner: boolean = true;
  public Editor = CustomBuild;
  public config={
    toolbar:['heading','bold','italic','link','bulletedList','numberedList','|','outdent','indent','|','imageUpload','blockQuote','insertTable','mediaEmbed','undo','redo','sourceEditing'],
    language:'en'

  };
  
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private widgetsService: WidgetsService,
    private cdr: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.getAllWidgetConstants();
      this.getAllActiveBrands();
    }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.widgetId = this.route.snapshot.paramMap.get('id');
    /****************Edit Widget Form Validation****************** */
    this.editWidgetForm = this.formBuilder.group({
      widgetType: ['', [Validators.required]],
      actionType: ['', [Validators.required]],
      widgetDesc: ['', [Validators.required]],
      widgetName: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      customCount: [''],
      widgetGroup: ['0', [Validators.required]],
      contentType: ['0'],
      contentCategory: ['0'],
      isLoggedIn: [false],
      widgetStatus: [false],
      widgetContent: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editWidgetForm.controls; }

  /**********************************API Method to Get All Widget Constants*********************/
  getAllWidgetConstants() {
    this.widgetsService.getAllWidgetConstants().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          let data = res['result'];
          this.widgetActionArr = data['mtActionObj'];
          this.widgetGroupArr = data['mtGroupObj'];
          this.widgetCntTypeArr = data['mtContTypeObj'];
          this.widgetCntCatArr = data['mtContCatObj'];
          this.getWidgetDetail(this.widgetId);
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

  /**************************Method to get Widget detail to prefill the form*******************************/
  getWidgetDetail(widgetId) {
    this.widgetsService.getWidgetDetail(widgetId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            let type = data['type'];
            let actionType = data['metering_action_id'];
            this.editWidgetForm.controls['widgetType'].setValue(type);
            this.selWidgetType = type;
            this.onWidgetTypeChange(type);
            this.editWidgetForm.controls['actionType'].setValue(actionType);
            this.selWidgetAction = actionType;
            if(actionType==Constants.WIDGET_ACTION_TYPE_CUSTOM_COUNT) {
              this.editWidgetForm.controls['customCount'].setValue(data['custom_count']);
            }
            this.editWidgetForm.controls['widgetDesc'].setValue(data['description']);
            this.editWidgetForm.controls['widgetName'].setValue(data['name']);
            this.editWidgetForm.controls['brandName'].setValue(data['brand_id']);
            this.editWidgetForm.controls['widgetGroup'].setValue(data['widget_group_id']);
            this.editWidgetForm.controls['contentType'].setValue(data['content_type_id']);
            this.editWidgetForm.controls['contentCategory'].setValue(data['content_category_id']);
            this.editWidgetForm.controls['isLoggedIn'].setValue(parseInt(data['is_logged_in']));
            this.editWidgetForm.controls['widgetStatus'].setValue(parseInt(data['is_active']));
            this.editWidgetForm.controls['widgetContent'].setValue(data['content']);
        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_BRAND_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_BRAND_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit add new brand form***************************************** */
  editWidgetFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editWidgetForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['brandId'] = parseInt(this.f.brandName.value);
    dataObj['widgetType'] = parseInt(this.f.widgetType.value);
    dataObj['actionType'] = parseInt(this.f.actionType.value);
    dataObj['customCount'] = this.f.customCount.value != '' ? parseInt(this.f.customCount.value) : 0;
    dataObj['widgetDesc'] = this.f.widgetDesc.value;
    dataObj['widgetName'] = this.f.widgetName.value;
    dataObj['widgetGroup'] = parseInt(this.f.widgetGroup.value);
    dataObj['contentType'] = parseInt(this.f.contentType.value);
    dataObj['contentCategory'] = parseInt(this.f.contentCategory.value);
    dataObj['isLoggedIn'] = this.f.isLoggedIn.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
    dataObj['status'] = this.f.widgetStatus.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
    dataObj['widgetContent'] = this.f.widgetContent.value;
    console.log("-----dataObj"+JSON.stringify(dataObj))
    this.widgetsService.editWidget(this.widgetId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_WIDGET_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/widgets/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.UPDATE_WIDGET_FAILURE_MSG;
            if(resStatus==2) {
              errorMsg = Constants.UPDATE_WIDGET_RULE_EXISTS_MSG;
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
          msg: Constants.UPDATE_WIDGET_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }

  onWidgetTypeChange(type) {
    this.selWidgetType = type;
    this.widgetActionFltrArr = this.widgetActionArr;
    const temp = this.widgetActionArr.filter(function (d) {
      return d.type == type;
    });
    this.widgetActionFltrArr = temp;
  }

  onWidgetActionChange(type) {
    this.selWidgetAction = type;
  }

}
