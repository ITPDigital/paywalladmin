import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all discount details**************************************** */
  getAllDiscounts() {
    return this.http
      .get(`${this.url}/v1/discounts`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all discount details**************************************** */
  getAllActivePromos(status:number) {
    return this.http
      .get(`${this.url}/v1/promos/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Discount**********************************************/
  addNewDiscount(dataObj){
    return this.http
      .post(`${this.url}/v1/discounts/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit product detail**********************************************/
  editDiscount(discountId,dataObj){
    return this.http
      .post(`${this.url}/v1/discounts/update/${discountId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Product Detail*************************************** */
  getDiscountDetail(discountId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/discounts/view/${discountId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update discount Status*********************************************/
  updateDiscountStatus(discountId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/discounts/del/${discountId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all active currencies constant details**************************************** */
  getAllActiveCurrencies(status:number) {
    return this.http
      .get(`${this.url}/v1/constants/currencies/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all active period constant details**************************************** */
  getAllActivePeriods(status:number) {
    return this.http
      .get(`${this.url}/v1/constants/periods/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

}
