import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config/config.component';
import { AllCurrencyComponent } from './currency/all-currency/all-currency.component';
import { AllPeriodsComponent } from './periods/all-periods/all-periods.component';
import { AllCancelReasonsComponent } from './cancel-reasons/all-cancel-reasons/all-cancel-reasons.component';
import { AllContTypeComponent } from './cont-type/all-cont-type/all-cont-type.component';
import { AllContCategoryComponent } from './cont-category/all-cont-category/all-cont-category.component';
import { AllMetActionTypeComponent } from './met-action-type/all-met-action-type/all-met-action-type.component';
import { AllUserRoleComponent } from './user-role/all-user-role/all-user-role.component';
import { AllPaymentTypeComponent } from './payment-type/all-payment-type/all-payment-type.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'config',
        component: ConfigComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'currency/all',
              component: AllCurrencyComponent,
            },
            {
                path: 'periods/all',
                component: AllPeriodsComponent,
            },
            {
              path: 'cancelreason/all',
              component: AllCancelReasonsComponent
            },
            {
              path: 'conttype/all',
              component: AllContTypeComponent,
            },
            {
              path: 'contcat/all',
              component: AllContCategoryComponent,
            },
            {
              path: 'metactiontype/all',
              component: AllMetActionTypeComponent,
            },
            {
              path: 'userrole/all',
              component: AllUserRoleComponent,
            },
            {
              path: 'paymenttype/all',
              component: AllPaymentTypeComponent,
            },
            { path: '', redirectTo: 'config/currency/all', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }