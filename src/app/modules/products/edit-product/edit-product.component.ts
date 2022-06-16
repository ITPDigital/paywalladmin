import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  allPlansData: any[];
  tmpAllPlansData: any[];
  selPlanArr:any = [];
  selPlanIds:any = [];
  allActiveBrands: any[];
  updatePlansArr:any = [];

  productId : string;
  editProductForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router, 
    private productService: ProductsService) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllActivePlans();
    this.getAllActiveBrands();
    this.productId = this.route.snapshot.paramMap.get('id');
    /****************Edit Product Form Validation****************** */
    this.editProductForm = this.formBuilder.group({
      productId: [{value: '', disabled: true}, Validators.required],
      productName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      proDesc: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      paymentPlans: [''],
      endDate: [''],
      productStatus: [false]
    });
  }

  /**************************Method to get active plans dropdown values*******************************/
  getAllActivePlans(){
    this.productService.getAllActivePlansWithPrice(Constants.STATUS_ACTIVE).then(
      res => {
        this.getProductDetail(this.productId);
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
        this.getProductDetail(this.productId);
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
  get f() { return this.editProductForm.controls; }

  /**************************Method to get Product detail*******************************/
  getProductDetail(productId) {
    //this.editProductForm.controls['productId'].setValue(productId);
    this.productService.getProductDetail(productId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            this.editProductForm.controls['productId'].setValue(data['id']);
            this.editProductForm.controls['productName'].setValue(data['product_name']);
            this.editProductForm.controls['displayName'].setValue(data['display_name']);
            this.editProductForm.controls['proDesc'].setValue(data['product_desc']);
            this.editProductForm.controls['brandName'].setValue(data['brand_id']);
            this.editProductForm.controls['startDate'].setValue(this.commonService.formatDate(data['start_date']));
            this.editProductForm.controls['endDate'].setValue(this.commonService.formatDate(data['end_date']));
            this.editProductForm.controls['productStatus'].setValue(this.commonService.setStatusValue(parseInt(data['is_active'])));
            let mappedPlanArr = res.result.plans;
            console.log("-------all------"+JSON.stringify(mappedPlanArr))
            let planId =0;
            for(let i=0;i<mappedPlanArr.length;i++) {
              planId = mappedPlanArr[i].id;
              if(planId && planId!=0 && !this.selPlanArr.some(el => el.id === planId)) {
                const selPlanObj= this.getPlanDet(planId);
                if(selPlanObj) {
                  console.log("-----selPlanObj------"+JSON.stringify(selPlanObj))
                  this.selPlanArr.push(selPlanObj);
                  this.allPlansData = this.allPlansData.filter(function (d) {
                    return d.id != planId;
                  });
                }
              }
            }

        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_PRODUCT_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_PRODUCT_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit edit product form***************************************** */
  editProductFormSubmit() {
      this.submitted = true;
    // stop here if form is invalid
    if (this.editProductForm.invalid) {
        return;
    }
    this.loading = true;
    console.log("---editProductFormSubmit editPlansArr---"+JSON.stringify(this.updatePlansArr));
    let dataObj = { 
      'brand_id' : this.f.brandName.value, 
      'product_name' : this.f.productName.value, 
      'display_name' : this.f.displayName.value, 
      'product_desc' : this.f.proDesc.value, 
      'start_date': this.f.startDate.value, 
      'end_date': this.f.endDate.value, 
      'status': this.commonService.getStatusValue(this.f.productStatus.value), 
      'plans': this.updatePlansArr, 
    };
    this.productService.editProduct(this.productId,dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_PRODUCT_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/products/all']);
            },2000);*/
          } else {
              this.alerts = [{
                type: 'danger',
                msg: Constants.UPDATE_PRODUCT_FAILURE_MSG,
                timeout: Constants.DEF_ALERT_MSG_TIMEOUT
              }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.UPDATE_PRODUCT_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
        this.loading = false;
      });
  }

  addPaymentPlan() {
    let planId : number = parseInt(this.f.paymentPlans.value);
    this.editProductForm.controls['paymentPlans'].setValue(0);
    if(planId && planId!=0 && !this.selPlanArr.some(el => el.id === planId)) {
      const selPlanObj= this.getPlanDet(planId);
      if(selPlanObj) {
        this.selPlanArr.push(selPlanObj);
        this.setUpdatePlanArr(planId, Constants.VERSION_ADD, Constants.STATUS_ACTIVE);
        this.allPlansData = this.allPlansData.filter(function (d) {
          return d.id != planId;
        });
      }
    }
  }

  deletePlanRow(index:any, planId) {
    this.selPlanArr.splice(index, 1);
    this.setUpdatePlanArr(planId, Constants.VERSION_EDIT, Constants.STATUS_INACTIVE);
    const selPlanObj= this.getPlanDet(parseInt(planId));
    this.allPlansData.push(selPlanObj);
  }

  setUpdatePlanArr(planId:number, version:number, status:number) {
    var isPresent = this.updatePlansArr.some(function(el){ 
      return el.plan_id == planId 
    });
    console.log(isPresent)
    if(!isPresent) {
      let editPlanObj = {};
      editPlanObj['plan_id'] = planId;
      editPlanObj['status'] = status;
      editPlanObj['version'] = version;
      this.updatePlansArr.push(editPlanObj);
    } else {
      this.updatePlansArr = this.updatePlansArr.filter(obj => {return obj.plan_id != planId});
    }
    console.log("---setUpdatePlanArr editPlanObj---"+JSON.stringify(this.updatePlansArr));
  }

  getPlanDet(planId:number) {
    if(planId) {
      return this.tmpAllPlansData.filter(t=>t.id ==planId)[0];
    }
  }
}
