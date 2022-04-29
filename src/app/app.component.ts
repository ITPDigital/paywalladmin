import { Component } from '@angular/core';
import { LoginService} from './services/login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  isUserLoggedIn : boolean = false;

  constructor(private loginService : LoginService, 
    private router: Router,
    private titleService: Title) { 
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) { 
      this.isUserLoggedIn = true;
    } else {
     //this.router.navigate(['/login']);
    }
  }
}
