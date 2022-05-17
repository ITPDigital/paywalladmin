import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans/plans.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

import { PlansRoutingModule } from './plans-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PlansService } from '../../services/plans.service';
import { TwoDigitDecimaNumberDirective } from '../../directives/two-digit-decima-number.directive';


@NgModule({
  declarations: [PlansComponent, AllPlansComponent, AddPlanComponent, EditPlanComponent, TwoDigitDecimaNumberDirective],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [PlansService]
})
export class PlansModule { }

