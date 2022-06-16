import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './../../../services/common.service';
import { ActivatedRoute,Router} from '@angular/router';
import { SettingsService } from '../../../services/settings.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-st-edit-admin',
  templateUrl: './st-edit-admin.component.html',
  styleUrls: ['./st-edit-admin.component.scss']
})
export class StEditAdminComponent implements OnInit {
  editCompAdminForm: FormGroup;
  submitted = false;
  loading = false;
  userId : string;
  alerts: any[];
  showLoadingSpinner = true;
  adminEmail : string;
  adminRoleArr : any[] = Constants.ADMIN_ROLES;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    /****************Edit Company Admin Form Validation****************** */
    this.editCompAdminForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      adminStatus: [true]
    });
     this.getAdminUserDetail(this.userId);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editCompAdminForm.controls; }

  /**************************Method to get Admin User detail to prefill the form*******************************/
  getAdminUserDetail(userId) {
    this.settingsService.getAdminUserDetail(userId).then(
      res => {
        if(res['code']==1 && res['status']==1) {//success
            this.showLoadingSpinner = false;
            let data = res.result[0];
            this.adminEmail = data['email'];
            this.editCompAdminForm.controls['firstName'].setValue(data['first_name']);
            this.editCompAdminForm.controls['lastName'].setValue(data['last_name']);
            this.editCompAdminForm.controls['email'].setValue(this.adminEmail);
            this.editCompAdminForm.controls['role'].setValue(data['role']);
            this.editCompAdminForm.controls['adminStatus'].setValue(this.commonService.setStatusValue(data['is_active']));
        } else {
          this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_ADMIN_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
        }
      },
      error => {
           this.alerts = [{
            type: 'danger',
            msg: Constants.VIEW_ADMIN_FAILURE_MSG,
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      });
  }

  /*******************************Method to submit add new company admin form***************************************** */
  editCompAdminFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editCompAdminForm.invalid) {
        return;
    }
    this.loading = true;
    let dataObj = {};
    dataObj['first_name'] = this.f.firstName.value;
    dataObj['last_name'] = this.f.lastName.value;
    dataObj['email'] = this.f.email.value === this.adminEmail ? "" : this.f.email.value;
    dataObj['role'] = this.f.role.value;
    dataObj['status'] = this.commonService.getStatusValue(this.f.adminStatus.value);

    this.settingsService.editAdminProfile(this.userId, dataObj).then(
      res => {
          this.loading = false;
          let resStatus = res['status']
          if(res['code']==1 && resStatus==1) {//success
            this.alerts = [{
              type: 'success',
              msg: Constants.ADD_ADMIN_SUCCESS_MSG,
              timeout: Constants.DEF_ALERT_MSG_TIMEOUT
            }];
            /*setTimeout(()=>{
              this.router.navigate(['/settings/admin/all']);
            }, 2000);*/
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
