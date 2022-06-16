import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router} from '@angular/router';
import { PlansService } from '../../../services/plans.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  allPromoDiscData: any[];
  tmpAllDiscountsData: any[];
  allProPlansData: any[];
  selPromoDiscArr:any = [];
  periodsFltrArr: any[];
  currenciesFltrArr: any[];
  selDiscountIds:any = [];
  addNewPlanForm: FormGroup;
  submitted = false;
  loading = false;
  showTrialPrice = false;
  alerts: any[];
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private plansService: PlansService,
    private cdr: ChangeDetectorRef,
    private router: Router) {

    }


  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePeriods();
    this.getAllActiveCurrencies();
    this.getAllActivePlans();
    this.getAllActiveDiscounts();
    /****************Add New Plan Form Validation****************** */
    this.addNewPlanForm = this.formBuilder.group({
      planName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      proDesc: ['', [Validators.required]],
      paymentType: ['CARD', [Validators.required]],
      contractLength: ['None', [Validators.required]],
      renewalPlan: [0, [Validators.required]],
      frequency: ['None', [Validators.required]],
      offset: ['None'],
      currency: ['USD', [Validators.required]],
      basicPrice: ['0.00', [Validators.required]],
      discount: [0],
      taxCode: ['',[Validators.required]],
      taxType: ['',[Validators.required]],
      taxValue: ['0.00', [Validators.required]],
      trialPrice: [{value:'0.00',disabled: true}],
      finalPrice: [{value:'0.00',disabled: true}],
      promoCodeDiscounts: [''],
      planStatus: [true],
      planAutoRenew: [true],
      compGiftStatus: [false],
      compGiftDesc: [''],
      compGiftConsentStatus: [false],
      features: this.formBuilder.array([])
    })
    //this.setupRecalculation();
  }


  // convenience getter for easy access to form fields
  get f() { return this.addNewPlanForm.controls; }

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

  /**************************Method to get active plans dropdown values*******************************/
  getAllActivePlans(){
    this.plansService.getAllActivePlans(Constants.STATUS_ACTIVE).then(
      res => {
        if(res['code']==1 && res['status']==1) {
            this.allProPlansData = res['result'];
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

  /**************************Method to get active discounts dropdown values*******************************/
  getAllActiveDiscounts(){
    this.plansService.getAllActiveDiscounts(Constants.STATUS_ACTIVE).then(
      res => {
        if(res['code']==1 && res['status']==1) {
          this.allPromoDiscData = res['result'];
          this.tmpAllDiscountsData = res['result'];
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

  /*******************************Method to submit add new plan form***************************************** */
  addNewPlanFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewPlanForm.invalid) {
        return;
    }
    let dataObj = { 
      'plan_name' : this.f.planName.value, 
      'plan_display_name' : this.f.displayName.value, 
      'plan_desc' : this.f.proDesc.value, 
      'contract_length': this.f.contractLength.value, 
      'renewal_plan': this.f.renewalPlan.value, 
      'auto_renew': this.commonService.getStatusValue(this.f.planAutoRenew.value),
      'frequency': this.f.frequency.value, 
      'offset': this.f.offset.value, 
      'currency': this.f.currency.value, 
      'base_price': this.f.basicPrice.value, 
      'tax_code': this.f.taxCode.value, 
      'tax_type': this.f.taxType.value, 
      'tax_value': this.f.taxValue.value, 
      'plan_discount': this.f.discount.value, 
      'payment_type': this.f.paymentType.value, 
      'is_comp_gift_enabled': this.commonService.getStatusValue(this.f.compGiftStatus.value), 
      'comp_gift_desc': this.f.compGiftDesc.value, 
      'show_comp_gift_consent': this.commonService.getStatusValue(this.f.compGiftConsentStatus.value), 
      'status': this.commonService.getStatusValue(this.f.planStatus.value), 
      'features': this.f.features.value, 
      'promo_discounts': this.selDiscountIds
    };
    console.log("---dataObj---"+JSON.stringify(dataObj));
    this.loading = true;
    this.plansService.addNewPlan(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_PLAN_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/plans/all']);
            }, 2000);
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.ADD_PLAN_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.ADD_PLAN_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }
  
  addPromoDiscount() {
    let discountId : number = parseInt(this.f.promoCodeDiscounts.value);
    this.addNewPlanForm.controls['promoCodeDiscounts'].setValue(0);
    if(discountId && discountId!=0 && !this.selPromoDiscArr.some(el => el.id === discountId)) {
      const selPlanObj= this.getDiscountDet(discountId);
      this.selDiscountIds.push(discountId);
      if(selPlanObj) {
        this.selPromoDiscArr.push(selPlanObj);
        this.allPromoDiscData = this.allPromoDiscData.filter(function (d) {
          return d.id != discountId;
        });
      }
    }
    console.log("--this.selPromoDiscArr--"+JSON.stringify(this.selPromoDiscArr))
  }

  addFeature(): void {
    (this.addNewPlanForm.get('features') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removeFeature(index) {
    (this.addNewPlanForm.get('features') as FormArray).removeAt(index);
  }

  getFeaturesFormControls(): AbstractControl[] {
    return (<FormArray> this.addNewPlanForm.get('features')).controls
  }

  deletePromoDiscountRow(index:any, discountId) {
    this.selPromoDiscArr.splice(index, 1);
    this.selDiscountIds.pop(discountId);
    const selPlanObj= this.getDiscountDet(parseInt(discountId));
    this.allPromoDiscData.push(selPlanObj);
    console.log("--this.selPromoDiscArr--"+JSON.stringify(this.selPromoDiscArr))
  }

  getDiscountDet(discountId:number) {
    if(discountId) {
      return this.tmpAllDiscountsData.filter(t=>t.id ==discountId)[0];
    }
  }

  onTaxTypeChange() {
    this.calculateFinalPrice();
  }

  onPriceChange(): void {  
    this.calculateFinalPrice();
  }

  calculateFinalPrice() {
    let basePrice = parseFloat(this.f.basicPrice.value);
    let taxType = this.f.taxType.value;
    let taxValue = parseFloat(this.f.taxValue.value);
    let finalPrice : number = basePrice;
    if(taxType=="AMOUNT") {
      finalPrice = (basePrice + taxValue);
    } else if(taxType=="PERCENTAGE") {
      finalPrice += (basePrice * taxValue) / 100;
    }
    if(finalPrice) {
      this.addNewPlanForm.controls['finalPrice'].setValue(finalPrice.toFixed(2));
    }
    let discountId = this.f.discount.value;
    if(discountId!=0) {
      this.calculateTrialPrice(discountId);
    }
  }

  calculateTrialPrice(val:number) {
    if(val!=0) {
      this.showTrialPrice = true;
      const selPlanObj= this.getDiscountDet(val);
      let trialPrice = 0.00;
      let finalPrice = parseFloat(this.f.finalPrice.value);
      console.log("----discount---"+JSON.stringify(selPlanObj))
      if(selPlanObj && finalPrice!=0 && finalPrice!=0.00) {
        if(selPlanObj['discount_type']=="AMOUNT") {
          trialPrice = finalPrice - selPlanObj['discount_value'];
        } else if(selPlanObj['discount_type']=="PERCENTAGE") {
          trialPrice = finalPrice - ((finalPrice * selPlanObj['discount_value'])/100);
        }
        if(trialPrice) {
          this.addNewPlanForm.controls['trialPrice'].setValue(trialPrice.toFixed(2));
        }
      }
    } else {
      this.showTrialPrice = false;
    }
  }

}