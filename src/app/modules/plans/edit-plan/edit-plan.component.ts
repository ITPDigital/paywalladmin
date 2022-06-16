import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute} from '@angular/router';
import { PlansService } from '../../../services/plans.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  allPromoDiscData: any[];
  tmpAllDiscountsData: any[];
  allProPlansData: any[];
  selPromoDiscArr:any = [];
  periodsFltrArr: any[];
  currenciesFltrArr: any[];
  selDiscountIds:any = [];
  updateDiscArr:any = [];
  showTrialPrice:boolean = false;

  planId: string;
  editPlanForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  showLoadingSpinner = true;
  planStatus : string;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private plansService: PlansService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePeriods();
    this.getAllActiveCurrencies();
    this.getAllActivePlans();
    this.getAllActiveDiscounts();
    this.planId = this.route.snapshot.paramMap.get('id');
    /****************Edit Plan Form Validation****************** */
    this.editPlanForm = this.formBuilder.group({
      planID: [{value:1,disabled: true}],
      planName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      proDesc: ['', [Validators.required]],
      paymentType: ['CARD', [Validators.required]],
      contractLength: ['None', [Validators.required]],
      renewalPlan: [0, [Validators.required]],
      frequency: ['None', [Validators.required]],
      offset: ['None'],
      currency: ['USD', [Validators.required]],
      basicPrice: ['', [Validators.required]],
      discount: [''],
      taxCode: ['',[Validators.required]],
      taxType: ['',[Validators.required]],
      taxValue: ['', [Validators.required]],
      trialPrice: [{value:'',disabled: true}],
      finalPrice: [{value:'',disabled: true}],
      promoCodeDiscounts: [''],
      //planStatus: [true],
      planAutoRenew: [true],
      compGiftStatus: [false],
      compGiftDesc: [''],
      compGiftConsentStatus: [false],
      features: this.formBuilder.array([])
    });
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
        this.getPlanDetail(this.planId);
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
        this.getPlanDetail(this.planId);
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editPlanForm.controls; }

  /**************************Method to get Plan detail*******************************/
  getPlanDetail(planId) {
    this.plansService.getPlanDetail(planId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            let planDiscountId = data['discount_id'];
            let trialPrice = data['trial_price'];
            this.editPlanForm.controls['planID'].setValue(data['id']);
            this.editPlanForm.controls['planName'].setValue(data['plan_name']);
            this.editPlanForm.controls['displayName'].setValue(data['plan_display_name']);
            this.editPlanForm.controls['proDesc'].setValue(data['plan_desc']);
            this.editPlanForm.controls['paymentType'].setValue(data['payment_type']);
            this.editPlanForm.controls['contractLength'].setValue(data['contract_length']);
            this.editPlanForm.controls['renewalPlan'].setValue(data['renewal_plan']);
            this.editPlanForm.controls['frequency'].setValue(data['frequency']);
            this.editPlanForm.controls['offset'].setValue(data['offset']);
            this.editPlanForm.controls['currency'].setValue(data['currency']);
            this.editPlanForm.controls['basicPrice'].setValue(data['base_price']);
            this.editPlanForm.controls['discount'].setValue(planDiscountId);
            this.editPlanForm.controls['taxCode'].setValue(data['tax_code']);
            this.editPlanForm.controls['taxType'].setValue(data['tax_type']);
            this.editPlanForm.controls['taxValue'].setValue(data['tax_value']);
            this.editPlanForm.controls['finalPrice'].setValue(data['final_price']);
            //this.editPlanForm.controls['planStatus'].setValue(parseInt(data['is_active']));
            this.editPlanForm.controls['planAutoRenew'].setValue(this.commonService.setStatusValue(parseInt(data['auto_renew'])));
            this.editPlanForm.controls['compGiftStatus'].setValue(this.commonService.setStatusValue(parseInt(data['is_comp_gift_enabled'])));
            this.editPlanForm.controls['compGiftDesc'].setValue(data['comp_gift_desc']);
            this.editPlanForm.controls['compGiftConsentStatus'].setValue(this.commonService.setStatusValue(parseInt(data['show_comp_gift_consent'])));
            this.planStatus = this.commonService.getStatusLabel(parseInt(data['is_active']));
            
            let featuresData = res.result.features;
            for(let i = 0; i < featuresData.length; i++){
              let feature = res.result.features[i];
              (this.editPlanForm.get('features') as FormArray).push(
                this.formBuilder.control(feature['feature_desc'])
              );
            }


            if(parseInt(planDiscountId)!=0 && parseFloat(trialPrice)!=0 && parseFloat(trialPrice)!=0.00) {
              this.showTrialPrice = true;
              this.editPlanForm.controls['trialPrice'].setValue(trialPrice);
            }
            let mappedDiscountArr = res.result.discounts;
            let discountId =0;
            for(let i=0;i<mappedDiscountArr.length;i++) {
              discountId = mappedDiscountArr[i].discount_id;
              if(discountId && discountId!=0 && !this.selPromoDiscArr.some(el => el.discount_id === discountId)) {
                const selPlanObj= this.getDiscountDet(discountId);
                if(selPlanObj) {
                  this.selPromoDiscArr.push(selPlanObj);
                  this.allPromoDiscData = this.allPromoDiscData.filter(function (d) {
                    return d.id != discountId;
                  });
                }
              }
            }

        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_PLAN_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_PLAN_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit edit plan form***************************************** */
  editPlanFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editPlanForm.invalid) {
        return;
    }
    this.loading = true;
    console.log("---editProductFormSubmit editPlansArr---"+JSON.stringify(this.updateDiscArr));
    console.log(this.f.features.value);
    console.log(this.formBuilder.array([]));
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
      //'status': this.f.planStatus.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE, 
      'features': [], 
      'discounts': this.updateDiscArr
    };
    this.plansService.editPlan(this.planId,dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_PLAN_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/plans/all']);
            },2000);*/
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.UPDATE_PLAN_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.UPDATE_PLAN_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
        this.loading = false;
      });
  }

  addPromoDiscount() {
    let discountId : number = parseInt(this.f.promoCodeDiscounts.value);
    this.editPlanForm.controls['promoCodeDiscounts'].setValue(0);
    if(discountId && discountId!=0 && !this.selPromoDiscArr.some(el => el.id === discountId)) {
      const selDiscountObj= this.getDiscountDet(discountId);
      if(selDiscountObj) {
        this.selPromoDiscArr.push(selDiscountObj);
        this.setUpdateDiscArr(discountId, Constants.VERSION_ADD, Constants.STATUS_ACTIVE);
        this.allPromoDiscData = this.allPromoDiscData.filter(function (d) {
          return d.id != discountId;
        });
      }
    }
  }
  
  addFeature(): void {
    
    (this.editPlanForm.get('features') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removeFeature(index) {
    (this.editPlanForm.get('features') as FormArray).removeAt(index);
  }

  getFeaturesFormControls(): AbstractControl[] {
    return (<FormArray> this.editPlanForm.get('features')).controls
  }

  deletePromoDiscountRow(index:any, discountId) {
    this.selPromoDiscArr.splice(index, 1);
    this.setUpdateDiscArr(discountId, Constants.VERSION_EDIT, Constants.STATUS_INACTIVE);
    const selPlanObj= this.getDiscountDet(parseInt(discountId));
    this.allPromoDiscData.push(selPlanObj);
  }

  setUpdateDiscArr(discountId:number, version:number, status:number) {
    var isPresent = this.updateDiscArr.some(function(el){ 
      return el.discount_id == discountId 
    });
    console.log(isPresent)
    if(!isPresent) {
      let editPlanObj = {};
      editPlanObj['discount_id'] = discountId;
      editPlanObj['status'] = status;
      editPlanObj['version'] = version;
      this.updateDiscArr.push(editPlanObj);
    } else {
      this.updateDiscArr = this.updateDiscArr.filter(obj => {return obj.discount_id != discountId});
    }
    console.log("---setUpdateDiscArr editPlanObj---"+JSON.stringify(this.updateDiscArr));
  }

  getDiscountDet(discountId:number) {
    if(discountId) {
      return this.tmpAllDiscountsData.filter(t=>t.id ==discountId)[0];
    }
  }

  onTaxTypeChange() {
    this.calculateFinalPrice();
    console.log(this.f.features.value);
  }

  onPriceChange(val: string): void {  
    console.log(val);
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
      this.editPlanForm.controls['finalPrice'].setValue(finalPrice.toFixed(2));
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
          this.editPlanForm.controls['trialPrice'].setValue(trialPrice.toFixed(2));
        }
      }
    } else {
      this.showTrialPrice = false;
    }
  }


}
