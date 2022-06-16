import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PromoCodesComponent } from './promo-codes/promo-codes.component';
import { AddPromoCodeComponent } from './add-promo-code/add-promo-code.component';
import { EditPromoCodeComponent } from './edit-promo-code/edit-promo-code.component';

import { PromoCodesRoutingModule } from './promo-codes-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AllPromoCodesComponent } from './all-promo-codes/all-promo-codes.component';
import { PromoCodesService } from '../../services/promo-codes.service';

import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [PromoCodesComponent, AddPromoCodeComponent, EditPromoCodeComponent, AllPromoCodesComponent],
  imports: [
    CommonModule,
    PromoCodesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DirectivesModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [PromoCodesService]
})
export class PromoCodesModule { }
