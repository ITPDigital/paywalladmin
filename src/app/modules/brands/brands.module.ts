import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AllBrandsComponent } from './all-brands/all-brands.component';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

import { BrandsRoutingModule } from './brands-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { BrandsService } from '../../services/brands.service';

import { DomainValidation } from '../../directives/domain-validation.directive';

@NgModule({
  declarations: [AllBrandsComponent, BrandsComponent, AddBrandComponent, EditBrandComponent, DomainValidation],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [BrandsService]
})
export class BrandsModule { }
