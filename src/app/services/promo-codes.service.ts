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
  addNewPromocode(promo_code : string, promo_name : string, promo_desc : string, start_date : string, end_date : string, status : number){
    let body = JSON.stringify({ promo_code, promo_name, promo_desc, start_date, end_date, status });
    return this.http
      .post(`${this.url}/v1/promos/add`, body, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Promo code detail**********************************************/
  editPromocode(promo_code : string, promo_name : string, promo_desc : string, start_date : string, end_date : string, status : number, promoId : string){
    let body = JSON.stringify({ promo_code, promo_name, promo_desc, start_date, end_date, status });
    return this.http
      .post(`${this.url}/v1/promos/update/${promoId}`, body, {headers: contentHeaders})
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
