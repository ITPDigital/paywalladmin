import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  editCustomerForm: FormGroup;
  submitted = false;
  loading = false;
  customerId : string;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    //this.titleService.setTitle("Add Brand");
    //this.commonService.setTitle("Add Brands");
    this.customerId = this.route.snapshot.paramMap.get('id');
    /****************Add New User Form Validation****************** */
    this.editCustomerForm = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      industry: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      country: ['', [Validators.required]],
      compSize: ['', [Validators.required]],
      dob: [''],
      gender: [''],
      phone: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      markOptin: [0],
      thirdPartyOptin: [0],
      status: [0],
      giftAddress1: [''],
      giftAddress2: [''],
      giftAddressCity: [''],
      giftAddressState: [''],
      shipContactNum: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      shippingCountry: [''],
      giftOpted: [0]
    });
    this.getCustomerDetail(this.customerId);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editCustomerForm.controls; }

  /**************************Method to get customer detail*******************************/
  getCustomerDetail(customerId) {
    this.editCustomerForm.controls['brandName'].setValue(1);
    this.editCustomerForm.controls['firstName'].setValue("Test");
    this.editCustomerForm.controls['lastName'].setValue("Test");
    this.editCustomerForm.controls['email'].setValue("test@test.com");
    this.editCustomerForm.controls['industry'].setValue(1);
    this.editCustomerForm.controls['jobTitle'].setValue(1);
    this.editCustomerForm.controls['country'].setValue(1);
    this.editCustomerForm.controls['compSize'].setValue(1);
    this.editCustomerForm.controls['markOptin'].setValue(1);
    this.editCustomerForm.controls['thirdPartyOptin'].setValue(1);
    this.editCustomerForm.controls['status'].setValue(1);
  }

  /*******************************Method to submit edit customer form***************************************** */
  editCustomerFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editCustomerForm.invalid) {
        return;
    }
    this.loading = true;
  }

}
