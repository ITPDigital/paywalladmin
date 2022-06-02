import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Router} from '@angular/router';
import { WidgetsService } from '../../../services/widgets.service';
import { Constants } from '../../../common/constants';
import * as CustomBuild from '../ckeditor5-build-classic/build/ckeditor';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {
  addNewWidgetForm: FormGroup;
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
  selWidgetType : number = Constants.WIDGET_TYPE_PAYWALL;
  public Editor = CustomBuild;
  public config={
    toolbar:['heading','bold','italic','link','bulletedList','numberedList','|','outdent','indent','|','imageUpload','blockQuote','insertTable','mediaEmbed','undo','redo','sourceEditing'],
    language:'en'

  };
  

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private widgetsService: WidgetsService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { 
      this.getAllWidgetConstants();
      this.getAllActiveBrands();
    }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    /****************Add Widget Form Validation****************** */
    this.addNewWidgetForm = this.formBuilder.group({
      widgetType: [Constants.WIDGET_TYPE_PAYWALL, [Validators.required]],
      actionType: ['', [Validators.required]],
      widgetDesc: ['', [Validators.required]],
      widgetName: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      customCount: [''],
      widgetGroup: ['0', [Validators.required]],
      contentType: ['0'],
      contentCategory: ['0'],
      isLoggedIn: [false],
      widgetStatus: [true],
      widgetContent: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewWidgetForm.controls; }

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
          this.onWidgetTypeChange(Constants.WIDGET_TYPE_PAYWALL);
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

  /*******************************Method to submit add new brand form***************************************** */
  addNewWidgetFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewWidgetForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['brandId'] = this.f.brandName.value;
    dataObj['widgetType'] = this.f.widgetType.value;
    dataObj['actionType'] = this.f.actionType.value;
    dataObj['customCount'] = this.f.customCount.value != '' ? this.f.customCount.value : 0;
    dataObj['widgetDesc'] = this.f.widgetDesc.value;
    dataObj['widgetName'] = this.f.widgetName.value;
    dataObj['widgetGroup'] = this.f.widgetGroup.value;
    dataObj['contentType'] = this.f.contentType.value;
    dataObj['contentCategory'] = this.f.contentCategory.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
    dataObj['isLoggedIn'] = this.f.isLoggedIn.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
    dataObj['status'] = this.f.widgetStatus.value;
    dataObj['widgetContent'] = this.f.widgetContent.value;
    this.widgetsService.addNewWidget(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_WIDGET_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/widgets/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_WIDGET_FAILURE_MSG;
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
          msg: Constants.ADD_WIDGET_FAILURE_MSG,
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
