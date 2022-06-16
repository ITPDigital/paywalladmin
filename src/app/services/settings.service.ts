import { Injectable } from '@angular/core';
import { contentHeaders } from '../common/headers';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url = environment.api_url;

  constructor(private http: HttpClient, private commonService : CommonService) { }

  /*********************************API to Get all Admin User details**************************************** */
  getAllCompanyAdmins() {
    return this.http
      .get(`${this.url}/v1/admin/settings/users`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(
        this.commonService.handleError
      );
  }

  /*************************************API to Update Admin User Status*********************************************/
  updateCompanyAdminStatus(userId : number, isChecked: number): Promise<any> {
    return this.http
      .post(`${this.url}/v1/admin/settings/user/del/${userId}/${isChecked}`, '', {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Add New Admin User**********************************************/
  addNewAdmin(dataObj){
    return this.http
      .post(`${this.url}/v1/admin/settings/user/add`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /*************************************API to Get Admin User Detail*************************************** */
  getAdminUserDetail(userId : string) : Promise<any> {
    return this.http
      .get(`${this.url}/v1/admin/settings/user/${userId}`, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }

  /**********************************API to Edit Admin user detail**********************************************/
  editAdminProfile(userId : string, dataObj){
    return this.http
      .post(`${this.url}/v1/admin/settings/user/update/${userId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
  /**********************************API to Update Admin user's password detail**********************************************/
  editAdminUserPwd(userId : string, dataObj){
    return this.http
      .post(`${this.url}/v1/admin/settings/user/updatepwd/${userId}`, dataObj, {headers: contentHeaders})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.commonService.handleError);
  }
}
