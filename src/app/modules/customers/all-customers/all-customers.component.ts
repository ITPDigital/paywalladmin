import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { CustomersService } from '../../../services/customers.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  allActiveBrands: any[];
  alerts: any[];
  showLoadingSpinner = true;
  selectedBrand : number = 1;

  constructor(private commonService: CommonService, 
    private cdr: ChangeDetectorRef, 
    private customersService: CustomersService) {
    //this.fetchCustomersData(8);
    this.getAllActiveBrands();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

  /**********************************API Method to Get All active Brands*********************/
  getAllActiveBrands() {
    this.commonService.getAllActiveBrands(Constants.STATUS_ACTIVE).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
        this.allActiveBrands = res['result'];
        this.getAllCustomers(this.selectedBrand);
       } else {
          this.alerts = [{
            type: 'danger',
            msg: res['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
       }
      },error=>{
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
      }
    );
  }

  /**********************************API Method to Get All the Products*********************/
  getAllCustomers(brandId: number) {
    this.showLoadingSpinner = true;
    this.customersService.getAllCustomers(brandId).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
         // this.rows = this.tmp;
       } else {
          this.alerts = [{
            type: 'danger',
            msg: res['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
       }
       this.showLoadingSpinner = false;
      },error=>{
          this.alerts = [{
            type: 'danger',
            msg: error['message'],
            timeout: Constants.DEF_ALERT_MSG_TIMEOUT
          }];
          this.showLoadingSpinner = false;
      }
    );
  }

  /******************************Method to filter the brand based customer data***************************/
  fetchCustomersData(brandId: number) {
    this.rows = this.tmp;
   /* const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;*/
  }

  /******************************Method to filter email/firstName/lastName column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.first_name.toLowerCase().indexOf(val) !== -1 || d.last_name.toLowerCase().indexOf(val) !== -1 || d.email.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchCustomersData(this.selectedBrand);
    }
  }

}
