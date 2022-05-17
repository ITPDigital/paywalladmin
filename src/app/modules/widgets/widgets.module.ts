import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets/widgets.component';
import { AllWidgetsComponent } from './all-widgets/all-widgets.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//Services
import { WidgetsService } from '../../services/widgets.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [WidgetsComponent, AllWidgetsComponent, AddWidgetComponent, EditWidgetComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    WidgetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [WidgetsService]
})
export class WidgetsModule { }
