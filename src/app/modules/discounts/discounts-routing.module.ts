import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountsComponent } from './discounts/discounts.component';
import { AllDiscountsComponent } from './all-discounts/all-discounts.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';


import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'discounts',
        component: DiscountsComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllDiscountsComponent,
            },
            {
                path: 'add',
                component: AddDiscountComponent,
            },
            {
              path: 'edit/:id',
              component: EditDiscountComponent
            },
            { path: '', redirectTo: 'discounts', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }