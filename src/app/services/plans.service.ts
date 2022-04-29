import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all plan details**************************************** */
  getAllPlans() {
    return this.http
      .get(`${this.url}/v1/plans`, {headers: contentHeaders})
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

  /*********************************API to Get all all active plan details**************************************** */
  getAllActivePlans(status:number) {
    return this.http
      .get(`${this.url}/v1/plans/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all all active discounts details**************************************** */
  getAllActiveDiscounts(status:number) {
    return this.http
      .get(`${this.url}/v1/discounts/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Payment Plan**********************************************/
  addNewPlan(dataObj){
    return this.http
      .post(`${this.url}/v1/plans/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update Plan Status*********************************************/
  updatePlanStatus(planId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/plans/del/${planId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Plan Detail*************************************** */
  getPlanDetail(planId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/plans/view/${planId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit product detail**********************************************/
  editPlan(planId,dataObj){
    return this.http
      .post(`${this.url}/v1/plans/update/${planId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
}
