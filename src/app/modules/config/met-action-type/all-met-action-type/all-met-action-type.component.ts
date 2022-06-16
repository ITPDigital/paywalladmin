import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../../common/constants';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-all-met-action-type',
  templateUrl: './all-met-action-type.component.html',
  styleUrls: ['./all-met-action-type.component.scss']
})
export class AllMetActionTypeComponent implements OnInit {
  rows: any[];
  tmp: any[];
  alerts: any[];
  showLoadingSpinner = true;
  metActTypeArr : any[] = Constants.WIDGET_TYPE_DATA;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,  private configService: ConfigService, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_MET_ACT_TYPE);
    this.getAllMetActTypes();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Config - Metering Action Types");
    this.commonService.setTitle("Config - Metering Action Types");
  }

  /**********************************API Method to Get All metering action types*********************/
  getAllMetActTypes() {
    this.configService.getAllMetActTypes().then(
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

  /******************************Method to filter type column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.rows = this.tmp;
    }
  }

}
