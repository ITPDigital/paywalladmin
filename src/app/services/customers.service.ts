import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all active brand details**************************************** */
  getAllActiveBrands(status:number) {
    return this.http
      .get(`${this.url}/v1/brands/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all customer details**************************************** */
  getAllCustomers(brandId:number) {
    return this.http
      .get(`${this.url}/v1/users/${brandId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Customer**********************************************/
  addNewCustomer(dataObj){
    return this.http
      .post(`${this.url}/v1/admin/customer/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Customer Details*************************************** */
  getCustomerDetail(customerId,brandId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/admin/customer/${customerId}/${brandId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Customer details**********************************************/
  editCustomer(customerId,brandId,dataObj){
    return this.http
      .post(`${this.url}/v1/admin/customer/${customerId}/${brandId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
}
