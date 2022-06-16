import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  alerts: any[];
  showLoadingSpinner = true;
  defStatusArr : any[] = Constants.DEF_STATUS;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private titleService: Title) { 
    this.commonService.subNavSelect(Constants.NAV_REPORTS);
    this.titleService.setTitle("Reports");
    this.commonService.setTitle("Reports");
    this.getAllReportTypes();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

   /**********************************API Method to Get All Reports*********************/
   getAllReportTypes() {
    this.commonService.getAllReportTypes().then(
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

  /******************************Method to filter title/description column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.title.toLowerCase().indexOf(val) !== -1 || d.description.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.rows = this.tmp;
    }
  }

}
