import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StManageAdminComponent } from './st-manage-admin/st-manage-admin.component';
import { StAllAdminsComponent } from './st-all-admins/st-all-admins.component';
import { StEditAdminComponent } from './st-edit-admin/st-edit-admin.component';
import { StAddAdminComponent } from './st-add-admin/st-add-admin.component';
import { StAdminChangePwdComponent } from './st-admin-change-pwd/st-admin-change-pwd.component';
import { AuthGuard } from '../../common/auth.guard';
import { Constants } from '../../common/constants';

const routes: Routes = [
    {
        path: 'settings/admin',
        component: StManageAdminComponent,
        canActivate: [AuthGuard],
        data: {
          role: Constants.ADMIN_ROLE_SUPER_ADMIN
        },
        children: [
            {
              path: 'all',
              component: StAllAdminsComponent,
            },
            {
                path: 'add',
                component: StAddAdminComponent
            },
            {
              path: 'edit/:id',
              component: StEditAdminComponent
            },
            {
              path: 'changepwd/:id',
              component: StAdminChangePwdComponent
            },
            { path: '', redirectTo: 'settings/admin/all', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StAllAdminsRoutingModule { }