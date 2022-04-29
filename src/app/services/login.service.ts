import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contentHeaders } from '../common/headers';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<String>;
  public currentUser: Observable<String>;
  private url = environment.api_url;

  constructor(private http: HttpClient, public router: Router, private commonService : CommonService) { 
    this.currentUserSubject = new BehaviorSubject<String>(localStorage.getItem('pw_checksum'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**************************Method to get whether the user is logged in or not************************************* */
  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }
  
  getAllUsers() {
    //const headers = { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers','content-type': 'application/json'};
    this.http.get<any>(`${this.url}/db-test`, { }).subscribe(data => {
        alert("success")
    });
  }

  /*************************************API to Login****************************************** */
  login(email: string, password: string): Promise<any> {
    const headers = { 'Content-Type' : 'application/json'};
    let body = JSON.stringify({ email, password});
    return this.http
      .post(`${this.url}/admin/login`, body, {headers: headers})
      .toPromise()
      .then(response => {
        console.log(response['code']);
		if(response['code']==1) { //success
			localStorage.setItem('pw_checksum', response['checksum']);
			localStorage.setItem('pw_id', response['id']);
      localStorage.setItem('pw_compid', response['comp_id']);
			localStorage.setItem('pw_fname', response['first_name']);
			localStorage.setItem('pw_lname', response['last_name']);
			localStorage.setItem('pw_email', response['email']);
			localStorage.setItem('pw_role', response['role']);
        }
        return response;
        
      })
      .catch(this.commonService.handleError);
  }
  
  /****************************************API to Logout******************************************************** */
  logout() {
    // remove user from local storage to log user out
      this.currentUserSubject.next("");
      this.commonService.logout();
  }
}
