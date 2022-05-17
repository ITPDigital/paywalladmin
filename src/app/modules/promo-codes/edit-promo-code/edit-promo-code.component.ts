import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute,Router} from '@angular/router';
import { PromoCodesService } from '../../../services/promo-codes.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-edit-promo-code',
  templateUrl: './edit-promo-code.component.html',
  styleUrls: ['./edit-promo-code.component.scss']
})
export class EditPromoCodeComponent implements OnInit {
  editPromocodeForm: FormGroup;
  submitted = false;
  loading = false;
  promoId : string;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private promoCodeService: PromoCodesService,
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
    this.promoId = this.route.snapshot.paramMap.get('id');    
    /****************Add New User Form Validation****************** */
    this.editPromocodeForm = this.formBuilder.group({
      promoCode: ['', [Validators.required]],
      promoName: ['', [Validators.required]],
      promoDesc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      promocodeStatus: [0]
    });
    this.getPromocodeDetail(this.promoId);    
  }

  // convenience getter for easy access to form fields
  get f() { return this.editPromocodeForm.controls; }

  /**************************Method to get Brand detail to prefill the form*******************************/
  getPromocodeDetail(promoId) {
    this.promoCodeService.getPromocodeDetail(promoId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result; //console.log('NN ' + data['is_active']);
            this.editPromocodeForm.controls['promoCode'].setValue(data['promo_code']);
            this.editPromocodeForm.controls['promoName'].setValue(data['promo_name']);
            this.editPromocodeForm.controls['promoDesc'].setValue(data['description']);
            this.editPromocodeForm.controls['startDate'].setValue(this.commonService.formatDate(data['start_date'])); //console.log(this.commonService.formatDate(data['start_date']));
            this.editPromocodeForm.controls['endDate'].setValue(this.commonService.formatDate(data['end_date'])); //this.commonService.formatDate(data['end_date'])
            this.editPromocodeForm.controls['promocodeStatus'].setValue(data['is_active']);
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
            msg: error.json().message,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }  

  /*******************************Method to submit add new brand form***************************************** */
  editPromocodeFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editPromocodeForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['promo_code'] = this.f.promoCode.value;
    dataObj['promo_name'] = this.f.promoName.value;
    dataObj['promo_desc'] = this.f.promoDesc.value;
    dataObj['start_date'] = this.f.startDate.value;
    dataObj['end_date'] = this.f.endDate.value;
    dataObj['status'] = this.f.promocodeStatus.value == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
    this.promoCodeService.editPromocode(this.promoId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_PROMOS_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/promocodes/all']);
            },2000);
          } else {
            let errorMsg = Constants.UPDATE_PROMOS_FAILURE_MSG;
            if(resStatus==3) {
              errorMsg = Constants.UPDATE_PROMOS_EXISTS_MSG;
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
