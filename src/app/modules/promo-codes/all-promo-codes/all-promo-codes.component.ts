import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
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
  
  constructor(private commonService: CommonService, 
    private promoCodeService: PromoCodesService,
    private cdr: ChangeDetectorRef) {
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
  

  /******************************Method to filter the status based promo data***************************/
  fetchPromocodesData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected promo status dropdown***************************/
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

  /******************************Method to update promo code Status (Active/Inactive)***************************/
  updatePromocodeStatus( id: number, event: any) {
    const isChecked = this.commonService.getStatusValue(event.target.checked);
    this.promoCodeService.updatePromocodeStatus(id, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_PROMOS_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         let errorMsg = Constants.DEL_PROMOS_FAILURE_MSG;
         let discArr = [];
         if(res['status']==2) {
            discArr = this.commonService.getIdsFromArr(discArr, res.result);
            errorMsg = Constants.DEL_PROMOS_FAILURE_ALREADY_MAPPED_MSG+" '"+discArr+"'";
         }
         this.alerts = [{
           type: 'danger',
           msg: errorMsg,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllPromocodes();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: Constants.DEL_PROMOS_FAILURE_MSG,
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllPromocodes();
     });
  }

  /******************************Method to filter promocode/name column based on search string***************************/
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
