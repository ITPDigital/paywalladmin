import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { customValidators } from '../../../helpers/validator';
import { Constants } from '../../../common/constants';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-st-admin-change-pwd',
  templateUrl: './st-admin-change-pwd.component.html',
  styleUrls: ['./st-admin-change-pwd.component.scss']
})
export class StAdminChangePwdComponent implements OnInit {
  changePwdForm : FormGroup;
  submitted : boolean = false;
  loading : boolean = false;
  alerts: any[];

  constructor(private commonService : CommonService,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    /****************Change Password Form Validation****************** */
    this.changePwdForm = this.formBuilder.group({
      newPwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', [Validators.required]]
    }, {validator: customValidators.MustMatch('newPwd', 'confirmPwd')});
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePwdForm.controls; }

  /*******************************Method to submit change password form***************************************** */
  changePwdFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePwdForm.invalid) {
        return;
    }

    this.loading = true;
    let dataObj = {};
    dataObj['password'] = this.f.newPwd.value;
    dataObj['confirm_password'] = this.f.confirmPwd.value;
    
    const userId = this.route.snapshot.paramMap.get('id');
    this.settingsService.editAdminUserPwd(userId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.UPDATE_ADMIN_PWD_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          } else {
            this.alerts = [{
              type: 'danger',
              msg: Constants.UPDATE_ADMIN_PWD_FAILURE_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
          }
      },
      error => {
        this.alerts = [{
          type: 'danger',
          msg: Constants.UPDATE_ADMIN_PWD_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });
  }
}
