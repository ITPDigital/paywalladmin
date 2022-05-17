import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingTemplatesComponent } from './messaging-templates/messaging-templates.component';
import { AllMessagingTemplatesComponent } from './all-messaging-templates/all-messaging-templates.component';
import { AddMessagingTemplatesComponent } from './add-messaging-templates/add-messaging-templates.component';
import { EditMessagingTemplatesComponent } from './edit-messaging-templates/edit-messaging-templates.component';
import { ViewMessagingTemplatesComponent } from './view-messaging-templates/view-messaging-templates.component';



@NgModule({
  declarations: [MessagingTemplatesComponent, AllMessagingTemplatesComponent, AddMessagingTemplatesComponent, EditMessagingTemplatesComponent, ViewMessagingTemplatesComponent],
  imports: [
    CommonModule
  ]
})
export class MessagingTemplatesModule { }
