import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../../common/constants';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-all-periods',
  templateUrl: './all-periods.component.html',
  styleUrls: ['./all-periods.component.scss']
})
export class AllPeriodsComponent implements OnInit {

  rows: any[];
  tmp: any[];
  alerts: any[];
  showLoadingSpinner = true;
  defStatusArr : any[] = Constants.DEF_STATUS;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,  private configService: ConfigService, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_PERIODS);
    this.getAllPeriods();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Config - Periods");
    this.commonService.setTitle("Config - Periods");
  }

  /**********************************API Method to Get All the Periods*********************/
  getAllPeriods() {
    this.configService.getAllPeriods().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
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

  /******************************Method to filter display id/name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.disp_id.toLowerCase().indexOf(val) !== -1 || d.display_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.rows = this.tmp;
    }
  }

}
