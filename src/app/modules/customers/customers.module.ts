import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerOrderDetailsComponent } from './customer-order-details/customer-order-details.component';

import { CustomersRoutingModule } from './customers-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//Services
import { CustomersService } from '../../services/customers.service';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CustomersComponent,AllCustomersComponent, EditCustomerComponent, AddCustomerComponent, CustomerOrderDetailsComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [CustomersService]
})
export class CustomersModule { }
