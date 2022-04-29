import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Products";
  selStatus: number = Constants.STATUS_ACTIVE;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private commonService: CommonService, 
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef, 
    private titleService: Title) {
      this.getAllProducts();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
    
  }

  /**********************************API Method to Get All the Products*********************/
  getAllProducts() {
    this.productsService.getAllProducts().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchProductsData(this.selStatus);
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

    /******************************Method to filter the status based product data***************************/
  fetchProductsData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected product status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Products"
      this.fetchProductsData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Products"
      this.fetchProductsData(status);
    }
  }

  /******************************Method to update Product Status (Active/Inactive)***************************/
  updateProductStatus( productId: number, event: any) {
    const isChecked = event.target.checked == true ? Constants.STATUS_ACTIVE : Constants.STATUS_INACTIVE; //1- Active; 0-Inactive
    this.productsService.updateProductStatus(productId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_PRODUCT_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_PRODUCT_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllProducts();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllProducts();
     });
  }

  /******************************Method to filter product name column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.product_name.toLowerCase().indexOf(val) !== -1 || d.display_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchProductsData(this.selStatus);
    }
  }

}
