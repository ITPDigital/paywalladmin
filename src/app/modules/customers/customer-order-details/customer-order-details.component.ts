import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute,Router} from '@angular/router';
import { CustomersService } from '../../../services/customers.service';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.scss']
})
export class CustomerOrderDetailsComponent implements OnInit {
  customerId : string;
  brandId : string;
  orderId : string;
  alerts: any[];
  showLoadingSpinner = true;
  userTransHistArr: any[];
  transStatusArr : any[] = Constants.TRANSACTION_STATUS;
  purchaseStatusArr : any[] = Constants.PURCHASE_STATUS;
  orderStatusArr : any[] = Constants.ORDER_STATUS;
  recentTransArr : any[];
  userPurchaseArr: any[];
  userOrderObj: any;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService, 
    private customersService: CustomersService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('userid');
    this.brandId = this.route.snapshot.paramMap.get('brandid');
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getCustomerTransHistDetail(this.customerId,this.brandId,this.orderId);
  }

  /**********************************API Method to Get All Transaction History details based on order id passed*********************/
  getCustomerTransHistDetail(customerId, brandId, orderId) {
    this.customersService.getCustomerTransHistDetail(customerId, brandId, orderId).then(
      res=>{
       if(res['code']==1 && res['status']==1) {
          this.userTransHistArr = res.result.transObj;
          this.showLoadingSpinner = false;
          this.recentTransArr = [ ...this.userTransHistArr ].pop();
          this.userPurchaseArr = res.result.purchaseObj;
          this.userOrderObj = res.result.orderObj[0];
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

  /**********************************Click event to trigger view invoice event*********************/
  viewInvoice(orderId) {
    alert('viewInvoice feature is under development--'+orderId);
  }

  /*********************************Click event to trigger change card event*********************/
  changeCard() {
    alert('changeCard feature is under development');
  }

  /**********************************Click event to trigger cancel transaction event*********************/
  cancelTrans() {
    alert('cancelTrans feature is under development');
  }

}
