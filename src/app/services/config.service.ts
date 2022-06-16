import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all currency details**************************************** */
  getAllCurrencies() {
    return this.http
      .get(`${this.url}/v1/constants/currencies`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all periods details**************************************** */
  getAllPeriods() {
    return this.http
      .get(`${this.url}/v1/constants/periods`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all user role details**************************************** */
  getAllUserRoles() {
    return this.http
      .get(`${this.url}/v1/constants/roles`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all content categories details**************************************** */
  getAllContentCategories() {
    return this.http
      .get(`${this.url}/v1/constants/contentcategory`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all content type details**************************************** */
  getAllContentTypes() {
    return this.http
      .get(`${this.url}/v1/constants/contenttype`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all metering action type details**************************************** */
  getAllMetActTypes() {
    return this.http
      .get(`${this.url}/v1/constants/metacttype`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all cancel reason details**************************************** */
  getAllCancelReasons() {
    return this.http
      .get(`${this.url}/v1/constants/cancelreasons`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all payment type details**************************************** */
  getAllPaymentTypes() {
    return this.http
      .get(`${this.url}/v1/constants/paymenttypes`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }


}
