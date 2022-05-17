import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router} from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  allPlansData: any[];
  tmpAllPlansData: any[];
  selPlanArr:any = [];
  selPlanIds:any = [];
  allActiveBrands: any[];

  addNewProductForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private productService: ProductsService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePlans();
    this.getAllActiveBrands();
    /****************Add New Product Form Validation****************** */
    this.addNewProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      proDesc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      paymentPlans: [''],
      endDate: [''],
      productStatus: [true]
    });
  }

  /**************************Method to get active plans dropdown values*******************************/
  getAllActivePlans(){
    this.productService.getAllActivePlansWithPrice(Constants.STATUS_ACTIVE).then(
      res => {
        if(res['code']==1 && res['status']==1) {
            this.allPlansData = res['result'];
            this.tmpAllPlansData = res['result'];
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

  /**********************************API Method to Get All active Brands*********************/
  getAllActiveBrands() {
    this.commonService.getAllActiveBrands(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.allActiveBrands = res['result'];
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
  get f() { return this.addNewProductForm.controls; }

  /*******************************Method to submit add new brand form***************************************** */
  addNewProductFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewProductForm.invalid) {
        return;
    }
    let dataObj = { 
      'brand_id' : this.f.brandName.value, 
      'product_name' : this.f.productName.value, 
      'display_name' : this.f.displayName.value, 
      'product_desc' : this.f.proDesc.value, 
      'start_date': this.f.startDate.value, 
      'end_date': this.f.endDate.value, 
      'status': this.f.productStatus.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE, 
      'plans': this.selPlanIds, 
    };
    this.loading = true;
    this.productService.addNewProduct(dataObj).then(
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
              this.router.navigate(['/products/all']);
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
    let planId : number = parseInt(this.f.paymentPlans.value);
    this.addNewProductForm.controls['paymentPlans'].setValue(0);
    if(planId && planId!=0 && !this.selPlanArr.some(el => el.id === planId)) {
      const selPlanObj= this.getPlanDet(planId);
      this.selPlanIds.push(planId);
      if(selPlanObj) {
        this.selPlanArr.push(selPlanObj);
        this.allPlansData = this.allPlansData.filter(function (d) {
          return d.id != planId;
        });
      }
    }
  }

  deletePlanRow(index:any, planId) {
    this.selPlanArr.splice(index, 1);
    this.selPlanIds.pop(planId);
    const selPlanObj= this.getPlanDet(parseInt(planId));
    this.allPlansData.push(selPlanObj);
  }

  getPlanDet(planId:number) {
    if(planId) {
      return this.tmpAllPlansData.filter(t=>t.id ==planId)[0];
    }
  }
}
