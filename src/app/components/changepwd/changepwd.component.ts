import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customValidators } from '../../helpers/validator';
import { LoginService} from '../../services/login.service';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {
  changePwdForm : FormGroup;
  submitted : boolean = false;
  loading : boolean = false;
  alerts: any[];

  constructor(private commonService : CommonService,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private loginService : LoginService,
    private formBuilder: FormBuilder) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.titleService.setTitle("Change Password");
    this.commonService.setTitle("Change Password");
    /****************Change Password Form Validation****************** */
    this.changePwdForm = this.formBuilder.group({
      oldPwd: ['', [Validators.required]],
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
    dataObj['old_password'] = this.f.oldPwd.value;
    dataObj['password'] = this.f.newPwd.value;
    dataObj['confirm_password'] = this.f.confirmPwd.value;
    if(dataObj['old_password']!=dataObj['password']) {
      this.loginService.changeAdminPwd(dataObj).then(
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
              let error = Constants.UPDATE_ADMIN_PWD_FAILURE_MSG;
              if(resStatus == 1) {
                  error = Constants.UPDATE_ADMIN_PWD_INCORRECT;
              } else if(resStatus == 2) {
                error = Constants.UPDATE_ADMIN_PWD_USER_NOT_FOUND;
              } else if(resStatus == 3) {
                error = Constants.UPDATE_ADMIN_PWD_NO_CHANGES;
              }
              this.alerts = [{
                type: 'danger',
                msg: error,
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
    else {
      this.alerts = [{
        type: 'danger',
        msg: Constants.UPDATE_ADMIN_PWD_SAME,
        timeout: Constants.DEF_ALERT_MSG_TIMEOUT
      }];
      this.loading = false;
    }
  }
}
