import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService} from '../../services/login.service';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  alerts: any[];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService : LoginService) { 
        // redirect to home if already logged in
        if (this.loginService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            //accEmailAddFld: ['', [Validators.required, Validators.email]],
            accEmailAddFld: ['', [Validators.required, Validators.email]],
            accPwdFld: ['', [Validators.required]]
        });
		
		//this.loginService.getAllUsers();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/brands/all';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onLoginFormSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;

		this.loginService.login(this.f.accEmailAddFld.value, this.f.accPwdFld.value).then(
            res => {
                if(res['checksum']) {
                   window.location.href= this.returnUrl;
                } else {
                    this.alerts = [{
                        type: 'danger',
                        msg: res.message,
                        timeout: 10000
                    }];
                    this.loading = false;
                }
            },
            error => {
                this.alerts = [{
                    type: 'danger',
                    msg: error.json().message,
                    timeout: 10000
                }];
                this.loading = false;
            });
      //this.loginService.login(this.f.accEmailAddFld.value, this.f.accPwdFld.value);
  }

}
