import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
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
  alerts: any[];
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private plansService: PlansService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private titleService: Title) {

    }


  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePeriods();
    this.getAllActiveCurrencies();
    this.getAllActivePlans();
    this.getAllActiveDiscounts();
    /****************Add New User Form Validation****************** */
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
      basicPrice: ['1', [Validators.required]],
      discount: [''],
      taxCode: ['',[Validators.required]],
      taxType: ['',[Validators.required]],
      taxValue: ['1', [Validators.required]],
      trialPrice: [{value:'0',disabled: true}],
      finalPrice: [{value:'0',disabled: true}],
      promoCodeDiscounts: [''],
      planStatus: [1],
      planAutoRenew: [1],
      compGiftStatus: [0],
      compGiftDesc: [''],
      compGiftConsentStatus: [0],
      features: this.formBuilder.array([])
    })
    this.setupRecalculation();
  }


  // convenience getter for easy access to form fields
  get f() { return this.addNewPlanForm.controls; }

  /**********************************API Method to Get All active Periods*********************/
  getAllActivePeriods() {
    this.plansService.getAllActivePeriods(Constants.STATUS_ACTIVE).then(
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
    this.plansService.getAllActiveCurrencies(Constants.STATUS_ACTIVE).then(
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

  /*******************************Method to submit add new brand form***************************************** */
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
      'auto_renew': this.f.planAutoRenew.value, 
      'frequency': this.f.frequency.value, 
      'offset': this.f.offset.value, 
      'currency': this.f.currency.value, 
      'base_price': this.f.basicPrice.value, 
      'tax_code': this.f.taxCode.value, 
      'tax_type': this.f.taxType.value, 
      'tax_value': this.f.taxValue.value, 
      'plan_discount': this.f.discount.value, 
      'payment_type': this.f.paymentType.value, 
      'is_comp_gift_enabled': this.f.compGiftStatus.value, 
      'comp_gift_desc': this.f.compGiftDesc.value, 
      'show_comp_gift_consent': this.f.compGiftConsentStatus.value, 
      'status': this.f.planStatus.value, 
      'features': ['test1','test2'], 
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
              msg: Constants.ADD_PRODUCT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/plans/all']);
            }, 2000);
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.ADD_PRODUCT_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.ADD_PRODUCT_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }
  
  addPaymentPlan() {
    let planId : number = parseInt(this.f.promoCodeDiscounts.value);
    this.addNewPlanForm.controls['promoCodeDiscounts'].setValue(0);
    if(planId && planId!=0 && !this.selPromoDiscArr.some(el => el.id === planId)) {
      const selPlanObj= this.getPlanDet(planId);
      this.selDiscountIds.push(planId);
      if(selPlanObj) {
        this.selPromoDiscArr.push(selPlanObj);
        this.allPromoDiscData = this.allPromoDiscData.filter(function (d) {
          return d.id != planId;
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

  deletePlanRow(index:any, planId) {
    this.selPromoDiscArr.splice(index, 1);
    this.selDiscountIds.pop(planId);
    const selPlanObj= this.getPlanDet(parseInt(planId));
    this.allPromoDiscData.push(selPlanObj);
    console.log("--this.selPromoDiscArr--"+JSON.stringify(this.selPromoDiscArr))
  }

  getPlanDet(planId:number) {
    if(planId) {
      return this.tmpAllDiscountsData.filter(t=>t.id ==planId)[0];
    }
  }

  onChangeUpdatePrices() {
    alert("here")
  }
  /*Calculate final Price*/
  

  formula1 = `basicPrice * taxValue`;
  onChange(event: any, formValue: any) {
    var taxTypeValue = event.target.value;
    if (taxTypeValue == 'AMOUNT'){
      var formula1 = `basicPrice + taxValue`;
      console.log(formula1);
    }else if(taxTypeValue == 'PERCENTAGE'){
      formula1 = `basicPrice * taxValue`;
      console.log(formula1);
    }else{
      formula1 = `0`;
      console.log(formula1);
    }
  }
  
  calculateResult(formValue: any, formulaName: 'formula1') {
    let formula = this[formulaName];
    Object.keys(formValue).forEach(
      (variable) => (formula = formula.replace(variable, formValue[variable]))
    );
    return eval(formula);
  }
  setupRecalculation(){
    this.addNewPlanForm.valueChanges.subscribe(value => {
      value.finalPrice = this.calculateResult(value, "formula1")
      this.addNewPlanForm.controls.finalPrice.setValue(value.finalPrice, { emitEvent: false })
    });
  }

}
