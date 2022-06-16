import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../../../common/constants';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-all-cont-category',
  templateUrl: './all-cont-category.component.html',
  styleUrls: ['./all-cont-category.component.scss']
})
export class AllContCategoryComponent implements OnInit {
  rows: any[];
  tmp: any[];
  alerts: any[];
  showLoadingSpinner = true;
  defStatusArr : any[] = Constants.DEF_STATUS;

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,  private configService: ConfigService, private titleService: Title) {
    this.commonService.subNavSelect(Constants.NAV_CONT_CAT);
    this.getAllContentCategories();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.titleService.setTitle("Config - Content Categories");
    this.commonService.setTitle("Config - Content Categories");
  }

  /**********************************API Method to Get All content categories*********************/
  getAllContentCategories() {
    this.configService.getAllContentCategories().then(
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

  /******************************Method to filter column based search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.category_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.rows = this.tmp;
    }
  }

}
