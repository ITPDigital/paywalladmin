import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
		private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            const userRole : number = parseInt(localStorage.getItem('pw_role'));
            if (route.data.role) {
                if(route.data.role===userRole) {
                    return true;
                } else {
                    alert("Permission denied!")
                    this.router.navigate(['/dashboard']);
                    return false;
                }
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}