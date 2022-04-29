import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { CustomersService } from '../../../services/customers.service';
import { Constants } from '../../../common/constants';
import { DropdownConstants } from '../../../common/dropdown_constants';
import { customValidators } from '../../../helpers/validator';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  addNewCustomerForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  allActiveBrands: any[];

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private customersService: CustomersService,
    private cdr: ChangeDetectorRef, 
    private router: Router,
    private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getAllActiveBrands();
    /****************Add New User Form Validation****************** */
    this.addNewCustomerForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      country: ['', [Validators.required]],
      compSize: ['', [Validators.required]],
      compName: ['', [Validators.required]],
      subType: [1, [Validators.required]],
      dob: [''],
      gender: [''],
      phone: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      markOptin: [1],
      thirdPartyOptin: [1],
      status: [1],
      giftAddress1: [''],
      giftAddress2: [''],
      giftAddressCity: [''],
      giftAddressState: [''],
      trn: [''],
      shipContactNum: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      shippingCountry: [''],
      giftOpted: [0]
    }, {
        validator: customValidators.MustMatch('password', 'confirmPassword')
    });
  }

  /**********************************API Method to Get All active Brands*********************/
  getAllActiveBrands() {
    this.customersService.getAllActiveBrands(Constants.STATUS_ACTIVE).then(
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
  get f() { return this.addNewCustomerForm.controls; }

  /*******************************Method to submit add new brand form***************************************** */
  addNewCustomerFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewCustomerForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['brand_id'] = this.f.brandName.value;
    dataObj['first_name'] = this.f.firstName.value;
    dataObj['last_name'] = this.f.lastName.value;
    dataObj['email'] = this.f.email.value;
    dataObj['password'] = this.f.password.value;
    dataObj['confirm_password'] = this.f.confirmPassword.value;
    dataObj['industry'] = this.f.industry.value;
    dataObj['job_title'] = this.f.jobTitle.value;
    dataObj['country'] = this.f.country.value;
    dataObj['company_size'] = this.f.compSize.value;
    dataObj['comp_name'] = this.f.compName.value;
    dataObj['access_role'] = this.f.subType.value;
    dataObj['dob'] = this.f.dob.value;
    dataObj['marketing_optin'] = this.f.markOptin.value==1 ? 'TRUE' : 'FALSE';
    dataObj['third_party_optin'] = this.f.thirdPartyOptin.value==1 ? 'TRUE' : 'FALSE';
    dataObj['status'] = this.f.status.value;
    dataObj['gender'] = this.f.gender.value;
    dataObj['phone'] = this.f.phone.value;
    dataObj['gift_address1'] = this.f.giftAddress1.value;
    dataObj['gift_address2'] = this.f.giftAddress2.value;
    dataObj['gift_adress_city'] = this.f.giftAddressCity.value;
    dataObj['gift_adress_state'] = this.f.giftAddressState.value;
    dataObj['shipping_contact_number'] = this.f.shipContactNum.value;
    dataObj['gift_address_country'] = this.f.shippingCountry.value;
    dataObj['tax_reg_no'] = this.f.trn.value;
    dataObj['comp_gift_consent'] = this.f.giftOpted.value==1 ? 'TRUE' : 'FALSE';
    console.log("--------"+JSON.stringify(dataObj))
    this.customersService.addNewCustomer(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_CUSTOMER_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/customers/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_BRAND_FAILURE_MSG;
            if(resStatus==2) {
              errorMsg = Constants.UPDATE_CUSTOMER_EXISTS_MSG;
            }
            else if(resStatus==3) {
              errorMsg = Constants.ADD_CUSTOMER_FAILURE_MSG;
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
          msg: Constants.ADD_CUSTOMER_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });
  }

}
