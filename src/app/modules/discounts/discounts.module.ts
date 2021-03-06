import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountsComponent } from './discounts/discounts.component';
import { AllDiscountsComponent } from './all-discounts/all-discounts.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DiscountService } from '../../services/discount.service';
import { TwoDigitDecimalNumbersDirective } from '../../directives/two-digit-decimal-numbers.directive';

import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [DiscountsComponent, AllDiscountsComponent, AddDiscountComponent, EditDiscountComponent, TwoDigitDecimalNumbersDirective],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    DirectivesModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [DiscountService]
})
export class DiscountsModule { }

