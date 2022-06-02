import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
import { DiscountService } from '../../../services/discount.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {
  allPromoCodeData: any[];
  tmpAllPromoCodeData: any[];
  selPromoCodeArr:any = [];
  selPromoIds:any = [];
  currenciesFltrArr: any[];
  periodsFltrArr: any[];
  updatePromoArr:any = [];

  discountId : string;
  editDiscountForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  showLoadingSpinner = true;
  showCurrency : boolean =  false;
  discountStatus : string;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private discountService: DiscountService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePeriods();
    this.getAllActiveCurrencies();
    this.getAllActivePromos();
    this.discountId = this.route.snapshot.paramMap.get('id');
    /****************Add New User Form Validation****************** */
    this.editDiscountForm = this.formBuilder.group({
      discountID: [{value:this.discountId,disabled: true}],
      discountName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      discountValue: ['', [Validators.required]],
      discountPeriod: ['', [Validators.required]],
      currency: [''],
      discountDesc: [''],
      promoCodes: ['']
      //discountStatus: [false]
    });
  }

  /**************************Method to get active plans dropdown values*******************************/
  getAllActivePromos(){
    this.discountService.getAllActivePromos(Constants.STATUS_ACTIVE).then(
      res => {
        this.getDiscountDetail(this.discountId);
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
        this.getDiscountDetail(this.discountId);
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
  get f() { return this.editDiscountForm.controls; }

  /**************************Method to get Discount detail*******************************/
  getDiscountDetail(discountId) {
    //this.editProductForm.controls['productId'].setValue(productId);
    this.discountService.getDiscountDetail(discountId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            this.editDiscountForm.controls['discountID'].setValue(data['id']);
            this.editDiscountForm.controls['discountName'].setValue(data['discout_name']);
            this.editDiscountForm.controls['displayName'].setValue(data['display_name']);
            this.editDiscountForm.controls['discountType'].setValue(data['discount_type']);
            this.editDiscountForm.controls['discountValue'].setValue(data['discount_value']);
            this.editDiscountForm.controls['discountPeriod'].setValue(data['discount_period']);
            this.editDiscountForm.controls['currency'].setValue(data['currency']);
            this.editDiscountForm.controls['discountDesc'].setValue(data['discount_desc']);
           // this.editDiscountForm.controls['discountStatus'].setValue(data['is_active']);
           this.discountStatus = this.commonService.getStatusLabel(parseInt(data['is_active']));
            let mappedPromoArr = res.result.promo;
            let promoId =0;
            for(let i=0;i<mappedPromoArr.length;i++) {
              promoId = mappedPromoArr[i].id;
              if(promoId && promoId!=0 && !this.selPromoCodeArr.some(el => el.id === promoId)) {
                const selPromoObj= this.getPromoDet(promoId);
                if(selPromoObj) {
                  this.selPromoCodeArr.push(selPromoObj);
                  this.allPromoCodeData = this.allPromoCodeData.filter(function (d) {
                    return d.id != promoId;
                  });
                }
              }
            }
        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_BRAND_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: error.json().message,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit add new brand form***************************************** */
  editDiscountFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editDiscountForm.invalid) {
        return;
    }
    this.loading = true;
    console.log("---editProductFormSubmit editPlansArr---"+JSON.stringify(this.updatePromoArr));
    let dataObj = { 
      'discout_name' : this.f.discountName.value, 
      'display_name' : this.f.displayName.value, 
      'discount_type' : this.f.discountType.value, 
      'currency' : this.f.currency.value, 
      'discount_value': parseFloat(this.f.discountValue.value), 
      'discount_desc': this.f.discountDesc.value, 
      'discount_period': this.f.discountPeriod.value,
      //'status': this.f.discountStatus.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE, 
      'promos': this.updatePromoArr
    };
    this.discountService.editDiscount(this.discountId,dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_DISCOUNT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/discounts/all']);
            },2000);
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.UPDATE_DISCOUNT_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: error.json().message,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
        this.loading = false;
      });
  }

  addPromoCode() {
    let promoId : number = parseInt(this.f.promoCodes.value);
    this.editDiscountForm.controls['promoCodes'].setValue(0);
    if(promoId && promoId!=0 && !this.selPromoCodeArr.some(el => el.id === promoId)) {
      const selPromoObj= this.getPromoDet(promoId);
      if(selPromoObj) {
        this.selPromoCodeArr.push(selPromoObj);
        this.setUpdatePromoArr(promoId, Constants.VERSION_ADD, Constants.STATUS_ACTIVE);
        this.allPromoCodeData = this.allPromoCodeData.filter(function (d) {
          return d.id != promoId;
        });
      }
    }
  }

  deletePromoRow(index:any, promoId) {
    this.selPromoCodeArr.splice(index, 1);
    this.setUpdatePromoArr(promoId, Constants.VERSION_EDIT, Constants.STATUS_INACTIVE);
    const selPromoObj= this.getPromoDet(parseInt(promoId));
    this.allPromoCodeData.push(selPromoObj);
  }

  setUpdatePromoArr(promoId:number, version:number, status:number) {
    var isPresent = this.updatePromoArr.some(function(el){ 
      return el.promo_id == promoId 
    });
    console.log(isPresent)
    if(!isPresent) {
      let editPlanObj = {};
      editPlanObj['promo_id'] = promoId;
      editPlanObj['status'] = status;
      editPlanObj['version'] = version;
      this.updatePromoArr.push(editPlanObj);
    } else {
      this.updatePromoArr = this.updatePromoArr.filter(obj => {return obj.promo_id != promoId});
    }
    console.log("---setUpdatePlanArr editPlanObj---"+JSON.stringify(this.updatePromoArr));
  }

  getPromoDet(promoId:number) {
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
