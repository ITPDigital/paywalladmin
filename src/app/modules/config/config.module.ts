import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfigComponent } from './config/config.component';
import { AllCurrencyComponent } from './currency/all-currency/all-currency.component';
import { AllPeriodsComponent } from './periods/all-periods/all-periods.component';
import { AllCancelReasonsComponent } from './cancel-reasons/all-cancel-reasons/all-cancel-reasons.component';
import { AllContTypeComponent } from './cont-type/all-cont-type/all-cont-type.component';
import { AllContCategoryComponent } from './cont-category/all-cont-category/all-cont-category.component';
import { AllMetActionTypeComponent } from './met-action-type/all-met-action-type/all-met-action-type.component';
import { AllUserRoleComponent } from './user-role/all-user-role/all-user-role.component';
import { AllPaymentTypeComponent } from './payment-type/all-payment-type/all-payment-type.component';

import { ConfigRoutingModule } from './config-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ConfigService } from '../../services/config.service';

@NgModule({
  declarations: [ConfigComponent, AllCurrencyComponent, AllPeriodsComponent, AllCancelReasonsComponent, AllContTypeComponent, AllContCategoryComponent, AllMetActionTypeComponent, AllUserRoleComponent, AllPaymentTypeComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [ConfigService]
})
export class ConfigModule { }
