import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingTemplatesService {

  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all active email type details**************************************** */
  getAllEmailTypes() {
    return this.http
      .get(`${this.url}/v1/email/type`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*********************************API to Get all email template details**************************************** */
  getAllEmailTemplates() {
    return this.http
      .get(`${this.url}/v1/email`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Update Email Template Status*********************************************/
  updateEmailTmpltStatus(templateId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/email/del/${templateId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Email Template**********************************************/
  addNewTemplate(dataObj){
    return this.http
      .post(`${this.url}/v1/email/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Email Template Detail*************************************** */
  getTmpltDetail(templateId) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/email/view/${templateId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Email Template detail**********************************************/
  editEmailTmplt(templateId,dataObj){
    return this.http
      .post(`${this.url}/v1/email/update/${templateId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
}
