import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all brand details**************************************** */
  getAllBrands() {
    return this.http
      .get(`${this.url}/v1/brands`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Brand Detail*************************************** */
  getBrandDetail(brandId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/brands/view/${brandId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Brand**********************************************/
  addNewBrand(dataObj){
    return this.http
      .post(`${this.url}/v1/brands/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Brand detail**********************************************/
  editBrand(brandId : string, dataObj){
    return this.http
      .post(`${this.url}/v1/brands/update/${brandId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update Brand Status*********************************************/
  updateBrandStatus(brandId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/brands/del/${brandId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }


}