import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute,Router} from '@angular/router';
import { CustomersService } from '../../../services/customers.service';
import { Constants } from '../../../common/constants';
import { DropdownConstants } from '../../../common/dropdown_constants';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  companySizeArr : any[] = DropdownConstants.COMPANY_SIZE_DATA;
  industriesArr : any[] = DropdownConstants.INDUSTRIES_DATA;
  jobTtlArr : any[] = DropdownConstants.JOB_TITLE_DATA;
  countriesArr : any[] = DropdownConstants.COUNTRIES_DATA;
  userRolesArr : any[];
  editCustomerForm: FormGroup;
  submitted = false;
  loading = false;
  customerId : string;
  alerts: any[];
  allActiveBrands: any[];
  userEmail : string;
  brandId : string;
  showLoadingSpinner = true;
  selSubType : number;
  userOrderArr: any[];
  subProId : number;
  orderStatusArr : any[] = Constants.ORDER_STATUS;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private customersService: CustomersService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {
      this.getAllActiveBrands();
      this.getAllCustomerRoles();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.brandId = this.route.snapshot.paramMap.get('brandid');
    /****************Edit customer Form Validation****************** */
    this.editCustomerForm = this.formBuilder.group({
      brandName: [{value: '', disabled: true}, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      industry: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      country: ['', [Validators.required]],
      compSize: ['', [Validators.required]],
      compName: ['', [Validators.required]],
      subType: ['', [Validators.required]],//Regular
      subStartDate: [''],
      subEndDate: [''],
      dob: [''],
      gender: [''],
      phone: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      markOptin: [false],
      thirdPartyOptin: [false],
      status: [false],
      giftAddress1: [''],
      giftAddress2: [''],
      giftAddressCity: [''],
      giftAddressState: [''],
      trn: [''],
      shipContactNum: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      shippingCountry: [''],
      giftOpted: [false]
    });
    this.getCustomerDetail(this.customerId);
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

  /**********************************API Method to Get All Customer roles*********************/
  getAllCustomerRoles() {
    this.customersService.getAllCustomerRoles(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.userRolesArr = res['result'];
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
  get f() { return this.editCustomerForm.controls; }

  /**************************Method to get customer detail*******************************/
  getCustomerDetail(customerId) {
    this.customersService.getCustomerDetail(customerId,this.brandId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result.userObj[0];
            let order = res.result.orderObj[0];
            this.userOrderArr = res.result.orderObj;
            this.userEmail = data['email'];
            this.editCustomerForm.controls['brandName'].setValue(data['brand_id']);
            this.editCustomerForm.controls['firstName'].setValue(data['first_name']);
            this.editCustomerForm.controls['lastName'].setValue(data['last_name']);
            this.editCustomerForm.controls['email'].setValue(this.userEmail);
            this.editCustomerForm.controls['industry'].setValue(data['industry']);
            this.editCustomerForm.controls['jobTitle'].setValue(data['job_ttl']);
            this.editCustomerForm.controls['country'].setValue(data['country']);
            this.editCustomerForm.controls['compSize'].setValue(data['comp_size']);
            this.editCustomerForm.controls['compName'].setValue(data['comp']);
            this.editCustomerForm.controls['subType'].setValue(data['access_role']);
            this.selSubType = data['access_role'];
            this.editCustomerForm.controls['dob'].setValue(this.commonService.formatDate(data['dob']));
            this.editCustomerForm.controls['gender'].setValue(data['gender']);
            this.editCustomerForm.controls['phone'].setValue(data['phone']);
            this.editCustomerForm.controls['markOptin'].setValue(data['marketing_optin']=="TRUE" ? true: false);
            this.editCustomerForm.controls['thirdPartyOptin'].setValue(data['third_party_optin']=="TRUE" ? true: false);
            this.editCustomerForm.controls['status'].setValue(data['status']);
            this.editCustomerForm.controls['giftAddress1'].setValue(data['gift_address1']);
            this.editCustomerForm.controls['giftAddress2'].setValue(data['gift_address2']);
            this.editCustomerForm.controls['giftAddressCity'].setValue(data['gift_adress_city']);
            this.editCustomerForm.controls['giftAddressState'].setValue(data['gift_adress_state']);
            this.editCustomerForm.controls['trn'].setValue(data['tax_reg_no']);
            this.editCustomerForm.controls['shipContactNum'].setValue(data['shipping_contact_number']);
            this.editCustomerForm.controls['shippingCountry'].setValue(data['gift_address_country']);
            this.editCustomerForm.controls['giftOpted'].setValue(data['comp_gift_consent']=="TRUE" ? true: false);
            //if(order['status']==Constants.STATUS_ACTIVE &&  (this.selSubType== Constants.CUSTOMER_TYPE_FREE_USER || this.selSubType== Constants.CUSTOMER_TYPE_CORP_USER || this.selSubType== Constants.CUSTOMER_TYPE_STUDENT_USER) ) {
             if(order) {
              this.editCustomerForm.controls['subStartDate'].setValue(this.commonService.formatDate(order['start_date']));
              this.editCustomerForm.controls['subEndDate'].setValue(this.commonService.formatDate(order['end_date']));
              this.subProId = order['product_id'];
             }
             
           // }
        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_CUSTOMER_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_CUSTOMER_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit edit customer form***************************************** */
  editCustomerFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editCustomerForm.invalid) {
        return;
    }
    this.loading = true;
    let orderLen = this.userOrderArr.length;
    let dataObj = { 
      'first_name' : this.f.firstName.value, 
      'last_name' : this.f.lastName.value, 
      'email' : this.f.email.value==this.userEmail ? "" : this.f.email.value, 
      'industry' : this.f.industry.value, 
      'job_title': this.f.jobTitle.value, 
      'country': this.f.country.value, 
      'company_size': this.f.compSize.value,
      'comp_name' : this.f.compName.value, 
      'gender': this.f.gender.value, 
      'dob': this.f.dob.value, 
      'phone': this.f.phone.value,
      'marketing_optin' : this.f.markOptin.value ==1 ? "TRUE" : "FALSE", 
      'third_party_optin': this.f.thirdPartyOptin.value ==1 ? "TRUE" : "FALSE", 
      'access_role': this.f.subType.value, 
      'gift_address1': this.f.giftAddress1.value,
      'gift_address2' : this.f.giftAddress2.value, 
      'gift_address_city': this.f.giftAddressCity.value, 
      'gift_address_state': this.f.giftAddressState.value, 
      'shipping_contact_number': this.f.shipContactNum.value,
      'gift_address_country' : this.f.shippingCountry.value, 
      'tax_reg_no': this.f.trn.value, 
      'comp_gift_consent': this.f.giftOpted.value ==1 ? "TRUE" : "FALSE", 
      'sub_start_date': this.f.subStartDate.value, 
      'sub_end_date': this.f.subEndDate.value, 
      'sub_id': orderLen > 0 ? this.userOrderArr[0].id : '', 
      'sub_pro_id': orderLen > 0 ? this.userOrderArr[0].product_id : '', 
      'status': this.commonService.getStatusValue(this.f.status.value)
    };
    this.customersService.editCustomer(this.customerId,this.brandId,dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_CUSTOMER_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/customers/all']);
            },2000);*/
          } else {
            let errorMsg = Constants.UPDATE_CUSTOMER_FAILURE_MSG;
            if(resStatus== 2) {
              errorMsg = Constants.UPDATE_CUSTOMER_NO_CHANGE_MSG;
            } else if(resStatus== 3) {
              errorMsg = Constants.UPDATE_CUSTOMER_EXISTS_MSG;
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
          msg: Constants.UPDATE_CUSTOMER_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
        this.loading = false;
      });
  }

  onSubTypeChange(type) {
      this.selSubType = type;
  }

}
