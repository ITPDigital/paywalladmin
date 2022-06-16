import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { MessagingTemplatesService } from '../../../services/messaging-templates.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-messaging-templates',
  templateUrl: './all-messaging-templates.component.html',
  styleUrls: ['./all-messaging-templates.component.scss']
})
export class AllMessagingTemplatesComponent implements OnInit {
  rows: any[];
  tmp: any[];
  allEmailTypes: any[];
  alerts: any[];
  showLoadingSpinner = true;
  selectedType : number = 1;

  constructor(private commonService: CommonService, 
    private cdr: ChangeDetectorRef,
    private messagingTemplatesService: MessagingTemplatesService) {
    this.getAllEmailTypes();
    this.getAllTemplates();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

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

  /**********************************API Method to Get All Templates*********************/
  getAllTemplates() {
    this.showLoadingSpinner = true;
    this.messagingTemplatesService.getAllEmailTemplates().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.getAllTemplatesByGroup(this.selectedType);
       } else {
          this.alerts = [{
            type: 'danger',
            msg: res['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
       }
       this.showLoadingSpinner = false;
      },error=>{
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
          this.showLoadingSpinner = false;
      }
    );
  }

  /******************************Method to update email template Status (Active/Inactive)***************************/
  updateTemplateStatus( templateId: number, event: any) {
    const isChecked = this.commonService.getStatusValue(event.target.checked);
    this.messagingTemplatesService.updateEmailTmpltStatus(templateId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_EMAIL_TMPLT_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_EMAIL_TMPLT_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       //this.getAllTemplatesByGroup(this.selectedType);
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: Constants.DEL_EMAIL_TMPLT_FAILURE_MSG,
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
      // this.getAllTemplatesByGroup(this.selectedType);
     });
  }

  getAllTemplatesByGroup(typeId) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.email_type_id == typeId;
    });
    this.rows = temp;
  }

  /******************************Method to filter name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.brand_name.toLowerCase().indexOf(val) !== -1 || d.from_address.toLowerCase().indexOf(val) !== -1 || d.subject.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.getAllTemplatesByGroup(this.selectedType);
    }
  }
}
