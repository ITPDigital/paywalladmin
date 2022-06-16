import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MessagingTemplatesComponent } from './messaging-templates/messaging-templates.component';
import { AllMessagingTemplatesComponent } from './all-messaging-templates/all-messaging-templates.component';
import { AddMessagingTemplatesComponent } from './add-messaging-templates/add-messaging-templates.component';
import { EditMessagingTemplatesComponent } from './edit-messaging-templates/edit-messaging-templates.component';

import { MessagingTemplatesRoutingModule } from './messaging-templates-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//Services
import { MessagingTemplatesService } from '../../services/messaging-templates.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [MessagingTemplatesComponent, AllMessagingTemplatesComponent, AddMessagingTemplatesComponent, EditMessagingTemplatesComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    MessagingTemplatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [MessagingTemplatesService]
})
export class MessagingTemplatesModule { }
