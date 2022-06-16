import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StManageAdminComponent } from './st-manage-admin/st-manage-admin.component';
import { StAllAdminsComponent } from './st-all-admins/st-all-admins.component';
import { StEditAdminComponent } from './st-edit-admin/st-edit-admin.component';
import { StAddAdminComponent } from './st-add-admin/st-add-admin.component';
import { StAdminChangePwdComponent } from './st-admin-change-pwd/st-admin-change-pwd.component';

import { StAllAdminsRoutingModule } from './st-manage-admin-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SettingsService } from '../../services/settings.service';

@NgModule({
  declarations: [StManageAdminComponent, StAllAdminsComponent, StEditAdminComponent, StAddAdminComponent, StAdminChangePwdComponent],
  imports: [
    CommonModule,
    StAllAdminsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [SettingsService]
})
export class StManageAdminModule { }
