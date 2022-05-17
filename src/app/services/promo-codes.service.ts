import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }
  
  /*********************************API to Get all promo code details**************************************** */
  getAllPromocodes() {
    return this.http
      .get(`${this.url}/v1/promos`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Promo code Detail*************************************** */
  getPromocodeDetail(promoId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/promos/view/${promoId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Promo code**********************************************/
  addNewPromocode(dataObj){
    return this.http
      .post(`${this.url}/v1/promos/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Promo code detail**********************************************/
  editPromocode(promoId : string, dataObj){
    return this.http
      .post(`${this.url}/v1/promos/update/${promoId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }  
  
  /*************************************API to Update PromoCode Status*********************************************/
  updatePromocodeStatus(id : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/promos/del/${id}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }  

}
