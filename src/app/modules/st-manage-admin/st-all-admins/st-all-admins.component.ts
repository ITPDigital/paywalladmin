import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { SettingsService } from '../../../services/settings.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-st-all-admins',
  templateUrl: './st-all-admins.component.html',
  styleUrls: ['./st-all-admins.component.scss']
})
export class StAllAdminsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Users";
  selStatus: number = Constants.STATUS_ACTIVE;
  alerts: any[];
  showLoadingSpinner = true;
  curruserId : number = parseInt(localStorage.getItem('pw_id'));

  constructor(private commonService: CommonService, 
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef) {
      this.getAllCompanyAdmins();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

  /**********************************API Method to Get All Company Admin List*********************/
  getAllCompanyAdmins() {
    this.settingsService.getAllCompanyAdmins().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchManageAdminsData(this.selStatus);
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

  /******************************Method to filter the status based company admin data***************************/
  fetchManageAdminsData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected admin status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Users"
      this.fetchManageAdminsData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Users"
      this.fetchManageAdminsData(status);
    }
  }

  /******************************Method to update Admin User Status (Active/Inactive)***************************/
  updateAdminStatus( adminId: number, event: any) {
    const isChecked = this.commonService.getStatusValue(event.target.checked);
    this.settingsService.updateCompanyAdminStatus(adminId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_ADMIN_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_ADMIN_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllCompanyAdmins();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllCompanyAdmins();
     });
  }

  /******************************Method to filter column based search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.first_name.toLowerCase().indexOf(val) !== -1 || d.last_name.toLowerCase().indexOf(val) !== -1 || d.email.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchManageAdminsData(this.selStatus);
    }
  }

  getAdminRoleName(id){
    let roleObj = Constants.ADMIN_ROLES.find(x => x.id === id);
    return roleObj['name'];
  }
}
