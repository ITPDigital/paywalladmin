import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from './plans/plans.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';


import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllPlansComponent,
            },
            {
                path: 'add',
                component: AddPlanComponent,
            },
            {
              path: 'edit/:id',
              component: EditPlanComponent
            },
            { path: '', redirectTo: 'plans', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }