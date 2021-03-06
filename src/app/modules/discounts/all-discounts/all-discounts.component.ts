import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { DiscountService } from '../../../services/discount.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-discounts',
  templateUrl: './all-discounts.component.html',
  styleUrls: ['./all-discounts.component.scss']
})
export class AllDiscountsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Discounts";
  selStatus: number = Constants.STATUS_ACTIVE;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private commonService: CommonService, 
    private discountService: DiscountService,
    private cdr: ChangeDetectorRef) {
      this.getAllDiscounts();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

  /**********************************API Method to Get All the Products*********************/
  getAllDiscounts() {
    this.discountService.getAllDiscounts().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          console.log(res['result'])
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchDiscountsData(this.selStatus);
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

    /******************************Method to filter the status based Discount data***************************/
  fetchDiscountsData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected Discount status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Discounts"
      this.fetchDiscountsData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Discounts"
      this.fetchDiscountsData(status);
    }
  }

  /******************************Method to update Discount Status (Active/Inactive)***************************/
  updateDiscountStatus( discountId: number, event: any) {
    const isChecked = this.commonService.getStatusValue(event.target.checked);
    this.discountService.updateDiscountStatus(discountId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_DISCOUNT_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
          let errorMsg = Constants.DEL_DISCOUNT_FAILURE_MSG;
          let planArr = [];
          if(res['status']==2) {
            planArr = this.commonService.getIdsFromArr(planArr, res.result);
            errorMsg = Constants.DEL_DISCOUNT_FAILURE_ALREADY_MAPPED_MSG+" '"+planArr+"'";
          }
          this.alerts = [{
            type: 'danger',
            msg: errorMsg,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
       this.getAllDiscounts();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllDiscounts();
     });
  }

  /******************************Method to filter Discount name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.discout_name.toLowerCase().indexOf(val) !== -1 || d.display_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchDiscountsData(this.selStatus);
    }
  }

}
