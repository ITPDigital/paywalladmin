import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all product details**************************************** */
  getAllProducts() {
    return this.http
      .get(`${this.url}/v1/products`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Product Detail*************************************** */
  getProductDetail(productId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/products/view/${productId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Product**********************************************/
  addNewProduct(dataObj){
    return this.http
      .post(`${this.url}/v1/products/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit product detail**********************************************/
  editProduct(productId,dataObj){
    return this.http
      .post(`${this.url}/v1/products/update/${productId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all all active plan details with price**************************************** */
  getAllActivePlansWithPrice(status:number) {
    return this.http
      .get(`${this.url}/v1/plans/price/${status}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update Product Status*********************************************/
  updateProductStatus(productId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/products/del/${productId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

}
