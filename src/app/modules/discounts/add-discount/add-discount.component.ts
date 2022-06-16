import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router} from '@angular/router';
import { DiscountService } from '../../../services/discount.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  allPromoCodeData: any[];
  tmpAllPromoCodeData: any[];
  selPromoCodeArr:any = [];
  selPromoIds:any = [];
  currenciesFltrArr: any[];
  periodsFltrArr: any[];

  addNewDiscountForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  showCurrency : boolean =  false;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private discountService: DiscountService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePeriods();
    this.getAllActiveCurrencies();
    this.getAllActivePromos();
    /****************Add New Discount Form Validation****************** */
    this.addNewDiscountForm = this.formBuilder.group({
      discountName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      discountType: ['PERCENTAGE', [Validators.required]],
      discountValue: ['0.00', [Validators.required]],
      discountPeriod: ['None', [Validators.required]],
      currency: [''],
      discountDesc: [''],
      promoCodes: [''],
      discountStatus: [true]
    });
  }

  /**************************Method to get active plans dropdown values*******************************/
  getAllActivePromos(){
    this.discountService.getAllActivePromos(Constants.STATUS_ACTIVE).then(
      res => {
        if(res['code']==1 && res['status']==1) {
            this.allPromoCodeData = res['result'];
            this.tmpAllPromoCodeData = res['result'];
        } else {
            this.alerts = [{
              type: 'danger',
              msg: res['message'],
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
        }
      },
      error => {
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /**********************************API Method to Get All active Currencies*********************/
  getAllActiveCurrencies() {
    this.commonService.getAllActiveCurrencies(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.currenciesFltrArr = res['result'];
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

  /**********************************API Method to Get All active Periods*********************/
  getAllActivePeriods() {
    this.commonService.getAllActivePeriods(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.periodsFltrArr = res['result'];
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

  // convenience getter for easy access to form fields
  get f() { return this.addNewDiscountForm.controls; }

  /*******************************Method to submit add new discount form***************************************** */
  addNewDiscountFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewDiscountForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = { 
      'discout_name' : this.f.discountName.value, 
      'display_name' : this.f.displayName.value, 
      'discount_type' : this.f.discountType.value, 
      'currency' : this.f.currency.value, 
      'discount_value': parseFloat(this.f.discountValue.value), 
      'discount_desc': this.f.discountDesc.value, 
      'discount_period': this.f.discountPeriod.value,
      'status': this.commonService.getStatusValue(this.f.discountStatus.value), 
      'promos': this.selPromoIds, 
    };
    this.loading = true;
    this.discountService.addNewDiscount(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_DISCOUNT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/discounts/all']);
            }, 2000);
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.ADD_DISCOUNT_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.ADD_DISCOUNT_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });
  }

  addPromoCode() {
    let promoId : number = parseInt(this.f.promoCodes.value);
    this.addNewDiscountForm.controls['promoCodes'].setValue(0);
    if(promoId && promoId!=0 && !this.selPromoCodeArr.some(el => el.id === promoId)) {
      const selPlanObj= this.getPlanDet(promoId);
      this.selPromoIds.push(promoId);
      if(selPlanObj) {
        this.selPromoCodeArr.push(selPlanObj);
        this.allPromoCodeData = this.allPromoCodeData.filter(function (d) {
          return d.id != promoId;
        });
      }
    }
  }

  deletePromoRow(index:any, promoId) {
    this.selPromoCodeArr.splice(index, 1);
    this.selPromoIds.pop(promoId);
    const selPlanObj= this.getPlanDet(parseInt(promoId));
    this.allPromoCodeData.push(selPlanObj);
  }

  getPlanDet(promoId:number) {
    if(promoId) {
      return this.tmpAllPromoCodeData.filter(t=>t.id ==promoId)[0];
    }
  }

  discountType(){
    let discountTypeValue = this.f.discountType.value;
    if(discountTypeValue == 'PERCENTAGE'){
      this.showCurrency = false;
    }else{
      this.showCurrency = true;
    }
  }

}
