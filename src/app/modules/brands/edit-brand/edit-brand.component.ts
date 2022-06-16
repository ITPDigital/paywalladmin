import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute,Router} from '@angular/router';
import { BrandsService } from '../../../services/brands.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  editBrandForm: FormGroup;
  submitted = false;
  loading = false;
  brandId : string;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private brandService: BrandsService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('id');
    /****************Add New User Form Validation****************** */
    this.editBrandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      domainName: ['', [Validators.required]],
      maxLim: ['', [Validators.required]],
      offLim: ['', [Validators.required]],
      meteringPeriod: ['MONTH1', [Validators.required]],
      brandStatus: [false]
    });
    this.getBrandDetail(this.brandId);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editBrandForm.controls; }

  /**************************Method to get Brand detail to prefill the form*******************************/
  getBrandDetail(brandId) {
    this.brandService.getBrandDetail(brandId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result;
            this.editBrandForm.controls['brandName'].setValue(data['brand_name']);
            this.editBrandForm.controls['domainName'].setValue(data['domain_name']);
            this.editBrandForm.controls['maxLim'].setValue(data['max_limit']);
            this.editBrandForm.controls['offLim'].setValue(data['offered_limit']);
            this.editBrandForm.controls['meteringPeriod'].setValue(data['metering_period']);
            this.editBrandForm.controls['brandStatus'].setValue(this.commonService.setStatusValue(data['is_active']));
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
            msg: Constants.VIEW_BRAND_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit add new brand form***************************************** */
  editBrandFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editBrandForm.invalid) {
        return;
    }
    this.loading = true;

    let dataObj = {};
    dataObj['brand_name'] = this.f.brandName.value;
    dataObj['domain_name'] = this.f.domainName.value;
    dataObj['max_limit'] = this.f.maxLim.value;
    dataObj['offered_limit'] = this.f.offLim.value;
    dataObj['metering_period'] = this.f.meteringPeriod.value;
    dataObj['status'] = this.commonService.getStatusValue(this.f.brandStatus.value);
    this.brandService.editBrand(this.brandId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_BRAND_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/brands/all']);
            },2000);*/
          } else {
            let errorMsg = Constants.UPDATE_BRAND_FAILURE_MSG;
            if(resStatus==3) {
              errorMsg = Constants.UPDATE_BRAND_BRAND_EXISTS_MSG;
            }
            else if(resStatus==2) {
              errorMsg = Constants.UPDATE_BRAND_DOMAIN_EXISTS_MSG;
            }
            this.alerts = [{
              type: 'danger',
              msg: errorMsg,
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

}
