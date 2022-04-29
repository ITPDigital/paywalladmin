import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.commonService.subNavSelect(Constants.SUB_NAV_CHANGE_PASSWORD);

    /****************Change Password Form Validation****************** */
    this.changePwdForm = this.formBuilder.group({
      oldPwd: ['', [Validators.required]],
      newPwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', [Validators.required]]
    }, {validator: this.checkIfMatchingPasswords('newPwd', 'confirmPwd')});
  }

  /*******************************Custom Method to Validate New and Confirm Password Fields***************************************** */
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (changePwdForm: FormGroup) => {
      const passwordInput = changePwdForm.controls[passwordKey],
        passwordConfirmationInput = changePwdForm.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
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
    
  }
}
