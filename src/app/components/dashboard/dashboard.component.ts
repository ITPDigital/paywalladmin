import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allActiveBrands: any[];
  alerts: any[];
  selBrand : number = 1;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { 
    this.commonService.subNavSelect(Constants.NAV_DASHBOARD);
    this.titleService.setTitle("Dashboard");
    this.commonService.setTitle("Dashboard");
    this.getAllActiveBrands();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
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

  dateRangeChange($event) {  
    let startDate = $event[0].toJSON().split('T')[0];  
    let endDate = $event[1].toJSON().split('T')[0];  
    console.log("-----"+startDate+"-------"+endDate);
  }

  brandFilterChange(val) {  
    this.selBrand = val;
  }


}
