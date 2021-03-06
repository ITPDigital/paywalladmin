import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url = environment.api_url;
  constructor(private http: HttpClient) { }

  //Top Nav Title Service
  private pageTtlSrc = new BehaviorSubject<string>("Paywall Admin");
  currentPage = this.pageTtlSrc.asObservable();

  /***************************************Method to Set Top Nav Title based on the Current Page********************************************************** */
  setTitle(title: string) {
    this.pageTtlSrc.next(title)
  }

  //Sub Nav link activationService
  activeLink: BehaviorSubject<string> = new BehaviorSubject('brands');
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
      localStorage.removeItem('pw_checksum');
      localStorage.removeItem('pw_id');
      localStorage.removeItem('pw_fname');
      localStorage.removeItem('pw_lname');
      localStorage.removeItem('pw_email');
      localStorage.removeItem('pw_role');
      localStorage.removeItem('pw_compid');
      window.location.href = '/login';
      //this.logout();
    } else {
      return Promise.reject(error.message || error);
    }
  }

  logout() {
    alert("here1")
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

  /*********************************API to Get all active brand details**************************************** */
  getAllActiveBrands(status:number) {
    return this.http
      .get(`${this.url}/v1/brands/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /*********************************API to Get all active period constant details**************************************** */
  getAllActivePeriods(status:number) {
    return this.http
      .get(`${this.url}/v1/constants/periods/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /*********************************API to Get all active currencies constant details**************************************** */
  getAllActiveCurrencies(status:number) {
    return this.http
      .get(`${this.url}/v1/constants/currencies/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /*********************************API to Get all report types details**************************************** */
  getAllReportTypes() {
    return this.http
      .get(`${this.url}/v1/reports`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /*********************************Method to get status name based on status value**************************************** */
  getStatusLabel(status:number) :string {
    return status==Constants.STATUS_ACTIVE ? Constants.STATUS_ACTIVE_LABEL : Constants.STATUS_INACTIVE_LABEL;
  }

  /*********************************Method to get Ids from the array passed**************************************** */
  getIdsFromArr(arr, data) {
    for(let i=0;i<data.length;i++) {
      arr.push(data[i].id);
    }
    return arr;
  }

  /*********************************Method to get value from ID**************************************** */
  getValueFromArr(arr, value, name) {
    const foundObj = arr.find(({ id }) => id == value);
    return foundObj[name];
  }

  /*********************************Common method to get status value**************************************** */
  getStatusValue(currentValue : boolean) : number {
      return currentValue === true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE;
  }

  /*********************************Common method to get status value**************************************** */
  setStatusValue(status) : boolean {
    return status == Constants.STATUS_ACTIVE ? true : false;
  }

}
