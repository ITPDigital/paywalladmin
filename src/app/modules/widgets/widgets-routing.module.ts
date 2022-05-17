import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetsComponent } from './widgets/widgets.component';
import { AllWidgetsComponent } from './all-widgets/all-widgets.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'widgets',
        component: WidgetsComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllWidgetsComponent,
            },
            {
              path: 'add',
              component: AddWidgetComponent,
            },
            {
              path: 'edit/:id',
              component: EditWidgetComponent
            },
            { path: '', redirectTo: 'widgets/all', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }