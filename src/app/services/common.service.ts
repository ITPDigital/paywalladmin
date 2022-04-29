import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { contentHeaders } from '../common/headers';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  //Top Nav Title Service
  private pageTtlSrc = new BehaviorSubject<string>("Paywall Admin");
  currentPage = this.pageTtlSrc.asObservable();

  /***************************************Method to Set Top Nav Title based on the Current Page********************************************************** */
  setTitle(title: string) {
    this.pageTtlSrc.next(title)
  }

  //Sub Nav link activationService
  activeLink: BehaviorSubject<string> = new BehaviorSubject('users');
  activeLink$ = this.activeLink.asObservable();

  /***************************************Method to Activate Selected Sub Nav********************************************************** */
  subNavSelect(activeLink: string) {
    this.activeLink.next(activeLink);
  }

  /***************************************Method to Set Content Type********************************************************** */
  setContentType(){
    //contentHeaders.delete('content-type');
    //contentHeaders.delete('Content-Disposition');
    //contentHeaders.append('content-type','application/json');
  }

   /***************************************Method to Handle Errors********************************************************** */
   public handleError(error: any): Promise<any> {
    if(error.status == 403 || error.status == 401 || error.status==0) {//Logging out for access denied case
      this.logout();
    } else {
      return Promise.reject(error.message || error);
    }
  }

  logout() {
    localStorage.removeItem('pw_checksum');
    localStorage.removeItem('pw_id');
    localStorage.removeItem('pw_fname');
    localStorage.removeItem('pw_lname');
    localStorage.removeItem('pw_email');
    localStorage.removeItem('pw_role');
    localStorage.removeItem('pw_compid');
    window.location.href = '/login';
  }

  formatDate(dateObject) {
    if(dateObject){
      const date = new Date(dateObject);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const joined = [year, month, day].join('-');
      return joined;
    } else {
      return '';
    }
  }

}