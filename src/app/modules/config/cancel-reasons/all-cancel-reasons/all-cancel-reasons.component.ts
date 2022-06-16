import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../../common/constants';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-all-cancel-reasons',
  templateUrl: './all-cancel-reasons.component.html',
  styleUrls: ['./all-cancel-reasons.component.scss']
})
export class AllCancelReasonsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  alerts: any[];
  showLoadingSpinner = true;
  defStatusArr : any[] = Constants.DEF_STATUS;
  cancelReasonTypeArr : any[] = Constants.CANCEL_REASON_TYPE;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,  private configService: ConfigService, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_CANCEL_REASON);
    this.getAllCancelReasons();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Config - Cancel Reasons");
    this.commonService.setTitle("Config - Cancel Reasons");
  }

  /**********************************API Method to Get All Cancel Reasons*********************/
  getAllCancelReasons() {
    this.configService.getAllCancelReasons().then(
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

  /******************************Method to filter reason column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.reason.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.rows = this.tmp;
    }
  }

}
