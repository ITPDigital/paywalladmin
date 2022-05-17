import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all active brand details**************************************** */
  getAllWidgetGroups() {
    return this.http
      .get(`${this.url}/v1/widgets/group`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all widget details**************************************** */
  getAllWidgets() {
    return this.http
      .get(`${this.url}/v1/widgets`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all widget constants**************************************** */
  getAllWidgetConstants() {
    return this.http
      .get(`${this.url}/v1/widgets/constants`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Widget**********************************************/
  addNewWidget(dataObj){
    return this.http
      .post(`${this.url}/v1/widgets/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

   /*************************************API to Get Widget Detail*************************************** */
   getWidgetDetail(widgetId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/widgets/view/${widgetId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit widget detail**********************************************/
  editWidget(widgetId,dataObj){
    return this.http
      .post(`${this.url}/v1/widgets/update/${widgetId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update Widget Status*********************************************/
  updateWidgetStatus(widgetId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/widgets/del/${widgetId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
}
