import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { Router} from '@angular/router';
import { SettingsService } from '../../../services/settings.service';
import { Constants } from '../../../common/constants';
import { customValidators } from '../../../helpers/validator';

@Component({
  selector: 'app-st-add-admin',
  templateUrl: './st-add-admin.component.html',
  styleUrls: ['./st-add-admin.component.scss']
})
export class StAddAdminComponent implements OnInit {
  addNewCompAdminForm: FormGroup;
  submitted = false;
  loading = false;
  alerts: any[];
  adminRoleArr : any[] = Constants.ADMIN_ROLES;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef, 
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    /****************Add New Admin User Form Validation****************** */
    this.addNewCompAdminForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: [Constants.ADMIN_ROLE_COMPANY_ADMIN, [Validators.required]],
      adminStatus: [true]
    }, {
      validator: customValidators.MustMatch('password', 'confirmPassword')
     });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewCompAdminForm.controls; }

  /*******************************Method to submit add new admin form***************************************** */
  addNewCompAdminFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addNewCompAdminForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['first_name'] = this.f.firstName.value;
    dataObj['last_name'] = this.f.lastName.value;
    dataObj['email'] = this.f.email.value;
    dataObj['password'] = this.f.password.value;
    dataObj['confirm_password'] = this.f.confirmPassword.value;
    dataObj['role'] = this.f.role.value;
    dataObj['status'] = this.commonService.getStatusValue(this.f.adminStatus.value);

    this.settingsService.addNewAdmin(dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_ADMIN_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            setTimeout(()=>{
              this.router.navigate(['/settings/admin/all']);
            }, 2000);
          } else {
            let errorMsg = Constants.ADD_ADMIN_FAILURE_MSG;
            if(resStatus==2) {
              errorMsg = Constants.UPDATE_ADMIN_EXISTS_MSG;
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
          msg: Constants.ADD_ADMIN_FAILURE_MSG,
          timeout: Constants.DEF_ALERT_MSG_TIMEOUT
        }];
          this.loading = false;
      });

  }
}
