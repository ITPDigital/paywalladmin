import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { BrandsService } from '../../../services/brands.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  addNewBrandForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private brandService: BrandsService,
    private cdr: ChangeDetectorRef, 
    private router: Router,
    private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    /****************Add New User Form Validation****************** */
    this.addNewBrandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      domainName: ['', [Validators.required]],
      maxLim: ['', [Validators.required]],
      offLim: ['', [Validators.required]],
      meteringPeriod: ['MONTH1', [Validators.required]],
      brandStatus: [1]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewBrandForm.controls; }

  /*******************************Method to submit add new brand form***************************************** */
  addNewBrandFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewBrandForm.invalid) {
        return;
    }
    this.loading = true;
    this.brandService.addNewBrand(this.f.brandName.value, this.f.domainName.value, this.f.maxLim.value, this.f.offLim.value, this.f.meteringPeriod.value, this.f.brandStatus.value).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_BRAND_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/brands/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_BRAND_FAILURE_MSG;
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
          msg: Constants.ADD_BRAND_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }

}
