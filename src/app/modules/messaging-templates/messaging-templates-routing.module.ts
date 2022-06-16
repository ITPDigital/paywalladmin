import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagingTemplatesComponent } from './messaging-templates/messaging-templates.component';
import { AllMessagingTemplatesComponent } from './all-messaging-templates/all-messaging-templates.component';
import { EditMessagingTemplatesComponent } from './edit-messaging-templates/edit-messaging-templates.component';
import { AddMessagingTemplatesComponent } from './add-messaging-templates/add-messaging-templates.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'messagingtemplates',
        component: MessagingTemplatesComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllMessagingTemplatesComponent,
            },
            {
              path: 'add',
              component: AddMessagingTemplatesComponent,
            },
            {
              path: 'edit/:id',
              component: EditMessagingTemplatesComponent
            },
            { path: '', redirectTo: 'messagingtemplates/all', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingTemplatesRoutingModule { }