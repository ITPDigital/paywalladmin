import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Router} from '@angular/router';
import { PromoCodesService } from '../../../services/promo-codes.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-add-promo-code',
  templateUrl: './add-promo-code.component.html',
  styleUrls: ['./add-promo-code.component.scss']
})
export class AddPromoCodeComponent implements OnInit {
  addNewPromocodeForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private promoCodeService: PromoCodesService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    /****************Add New Promo-code Form Validation****************** */
    this.addNewPromocodeForm = this.formBuilder.group({
      promoCode: ['', [Validators.required]],
      promoName: ['', [Validators.required]],
      promoDesc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      promocodeStatus: [true]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewPromocodeForm.controls; }

  /*******************************Method to submit add new promo code form***************************************** */
  addNewPromocodeFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewPromocodeForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['promo_code'] = this.f.promoCode.value;
    dataObj['promo_name'] = this.f.promoName.value;
    dataObj['promo_desc'] = this.f.promoDesc.value;
    dataObj['start_date'] = this.f.startDate.value;
    dataObj['end_date'] = this.f.endDate.value;
    dataObj['status'] = this.commonService.getStatusValue(this.f.promocodeStatus.value);
    this.promoCodeService.addNewPromocode(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_PROMOS_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
             this.router.navigate(['/promocodes/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_PROMOS_FAILURE_MSG;
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
          msg: Constants.ADD_PROMOS_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });    
  }
}
