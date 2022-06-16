import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerOrderDetailsComponent } from './customer-order-details/customer-order-details.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllCustomersComponent
            },
            {
              path: 'add',
              component: AddCustomerComponent
            },
            {
              path: 'edit/:id/:brandid',
              component: EditCustomerComponent
            },
            {
              path: 'order/:id/account/:userid/brand/:brandid',
              component: CustomerOrderDetailsComponent
            },
            { path: '', redirectTo: 'customers/all', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }