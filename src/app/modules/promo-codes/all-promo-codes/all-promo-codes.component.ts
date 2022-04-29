import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { PromoCodesService } from '../../../services/promo-codes.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-promo-codes',
  templateUrl: './all-promo-codes.component.html',
  styleUrls: ['./all-promo-codes.component.scss']
})
export class AllPromoCodesComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Promo codes";
  selStatus: number = 1;
  alerts: any[];
  showLoadingSpinner = true;

  /*constructor(private commonService: CommonService, private promoCodeService: PromoCodesService, private cdr: ChangeDetectorRef, private titleService: Title) {
    this.fetchPromocodesData(this.selStatus);
  }*/
  
  constructor(private commonService: CommonService, 
    private promoCodeService: PromoCodesService,
    private cdr: ChangeDetectorRef, 
    private titleService: Title) {
      this.getAllPromocodes();
  }  

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    //this.titleService.setTitle("Promocodes");
    //this.commonService.setTitle("Promocodes");
  }
  
  /**********************************API Method to Get All the Promo Codes*********************/
  getAllPromocodes() {
    let comp_id = localStorage.getItem('pw_compid');
    this.promoCodeService.getAllPromocodes().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchPromocodesData(this.selStatus);
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
  

    /******************************Method to filter the status based brand data***************************/
  fetchPromocodesData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected brand status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Promo codes"
      this.fetchPromocodesData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Promo codes"
      this.fetchPromocodesData(status);
    }
  }

  /******************************Method to update Brand Status (Active/Inactive)***************************/
  updatePromocodeStatus( id: number, event: any) {
    const isChecked = event.target.checked == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE; //1- Active; 0-Inactive
    this.promoCodeService.updatePromocodeStatus(id, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_PRMOS_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_BRAND_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllPromocodes();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllPromocodes();
     });
  }

  /******************************Method to filter brand/domain column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.promo_code.toLowerCase().indexOf(val) !== -1 || d.promo_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchPromocodesData(this.selStatus);
    }
  }

}
