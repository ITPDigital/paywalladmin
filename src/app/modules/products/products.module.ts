import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

import { ProductsRoutingModule } from './products-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductsService } from '../../services/products.service';

import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [ProductsComponent, AllProductsComponent, EditProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DirectivesModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [ProductsService]
})
export class ProductsModule { }
