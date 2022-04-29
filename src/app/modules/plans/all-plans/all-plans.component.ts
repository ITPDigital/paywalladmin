import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { PlansService } from '../../../services/plans.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss']
})
export class AllPlansComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Plans";
  selStatus: number = Constants.STATUS_ACTIVE;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private commonService: CommonService, 
    private plansService: PlansService,
    private cdr: ChangeDetectorRef, 
    private titleService: Title) {
      this.getAllPlans();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    //this.titleService.setTitle("Brands");
    //this.commonService.setTitle("Brands");
  }

  /**********************************API Method to Get All the Plans*********************/
  getAllPlans() {
    this.plansService.getAllPlans().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchPlansData(this.selStatus);
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

  /******************************Method to filter the status based plans data***************************/
  fetchPlansData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected plan status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Plans"
      this.fetchPlansData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Plans"
      this.fetchPlansData(status);
    }
  }

  /******************************Method to update Plan Status (Active/Inactive)***************************/
  updatePlanStatus( planId: number, event: any) {
    const isChecked = event.target.checked == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE; //1- Active; 0-Inactive
    this.plansService.updatePlanStatus(planId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_PLAN_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_PLAN_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllPlans();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: Constants.DEL_PLAN_FAILURE_MSG,
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllPlans();
     });
  }

  /******************************Method to filter plan name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.plan_name.toLowerCase().indexOf(val) !== -1 || d.plan_display_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchPlansData(this.selStatus);
    }
  }
}
