import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { CustomersService } from '../../../services/customers.service';
import { WidgetsService } from '../../../services/widgets.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-widgets',
  templateUrl: './all-widgets.component.html',
  styleUrls: ['./all-widgets.component.scss']
})
export class AllWidgetsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  allWidgetGroups: any[];
  alerts: any[];
  showLoadingSpinner = true;
  selectedGroup : number = 1;

  constructor(private commonService: CommonService, 
    private cdr: ChangeDetectorRef,
    private widgetsService: WidgetsService,
    private customersService: CustomersService) {
    this.getAllWidgetGroups();
    this.getAllWidgets();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

  /**********************************API Method to Get All active Brands*********************/
  getAllWidgetGroups() {
    this.widgetsService.getAllWidgetGroups().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.allWidgetGroups = res['result'];
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

  /**********************************API Method to Get All the Products*********************/
  getAllWidgets() {
    this.showLoadingSpinner = true;
    this.widgetsService.getAllWidgets().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.getAllWidgetsByGroup(this.selectedGroup);
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

  /******************************Method to update Widget Status (Active/Inactive)***************************/
  updateWidgetStatus( widgetId: number, event: any) {
    const isChecked = event.target.checked == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE; //1- Active; 0-Inactive
    this.widgetsService.updateWidgetStatus(widgetId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_BRAND_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_BRAND_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       //this.getAllWidgetsByGroup(this.selectedGroup);
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
      // this.getAllWidgetsByGroup(this.selectedGroup);
     });
  }

  getAllWidgetsByGroup(groupId) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.widget_group_id == groupId;
    });
    this.rows = temp;
  }

  /******************************Method to filter name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.getAllWidgetsByGroup(this.selectedGroup);
    }
  }

}
