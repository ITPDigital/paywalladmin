import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllCustomersComponent,
            },
            {
              path: 'add',
              component: AddCustomerComponent,
            },
            {
                path: 'view/:id',
                component: ViewCustomerComponent,
            },
            {
              path: 'edit/:id/:brandid',
              component: EditCustomerComponent
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