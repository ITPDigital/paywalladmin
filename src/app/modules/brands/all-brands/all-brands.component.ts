import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { BrandsService } from '../../../services/brands.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {

  rows: any[];
  tmp: any[];
  activeData: [];
  inactiveData: [];
  statusDropDownLbl : string = "Active Brands";
  selStatus: number = Constants.STATUS_ACTIVE;
  alerts: any[];
  showLoadingSpinner = true;

  constructor(private commonService: CommonService, 
    private brandService: BrandsService,
    private cdr: ChangeDetectorRef) {
      this.getAllBrands();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  
  ngOnInit(): void {
  }

  /**********************************API Method to Get All the Brands*********************/
  getAllBrands() {
    let comp_id = localStorage.getItem('pw_compid');
    this.brandService.getAllBrands().then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.rows = res['result'];
          this.tmp = res['result'];
          this.fetchBrandsData(this.selStatus);
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

  /******************************Method to filter the status based brand data***************************/
  fetchBrandsData(status: number) {
    this.rows = this.tmp;
    const temp = this.rows.filter(function (d) {
      return d.is_active == status;
    });
    this.rows = temp;
  }

  /******************************Method to set selected brand status dropdown***************************/
  filterStaus(status : number) {
    if(status == 1) {
      this.selStatus = status;
      this.statusDropDownLbl = "Active Brands"
      this.fetchBrandsData(status);
    } else {
      this.selStatus = 0;
      this.statusDropDownLbl = "Inactive Brands"
      this.fetchBrandsData(status);
    }
  }

  /******************************Method to update Brand Status (Active/Inactive)***************************/
  updateBrandStatus( brandId: number, event: any) {
    const isChecked = this.commonService.getStatusValue(event.target.checked);
    this.brandService.updateBrandStatus(brandId, isChecked).then(
     res => {
       if(res['code']==1 && res['status']==1) {//Success
         this.alerts = [{
           type: 'success',
           msg: Constants.DEL_BRAND_SUCCESS_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       } else {
         this.alerts = [{
           type: 'danger',
           msg: Constants.DEL_BRAND_FAILURE_MSG,
           timeout: Constants.DEF_ALERT_MSG_TIMEOUT
         }];
       }
       this.getAllBrands();
     },
     error => {
       this.alerts = [{
         type: 'danger',
         msg: error['message'],
         timeout: Constants.DEF_ALERT_MSG_TIMEOUT
       }];
       this.getAllBrands();
     });
  }

  /******************************Method to filter brand/domain column based on search string***************************/
  filterSrchStr(event) {
    const val = event.target.value.toLowerCase();
    if(val) {
      const temp = this.rows.filter(function (d) {
        return d.brand_name.toLowerCase().indexOf(val) !== -1 || d.domain_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    } else {
      this.fetchBrandsData(this.selStatus);
    }
  }
}
