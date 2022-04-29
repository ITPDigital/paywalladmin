import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoCodesComponent } from './promo-codes/promo-codes.component';
import { AllPromoCodesComponent } from './all-promo-codes/all-promo-codes.component';
import { AddPromoCodeComponent } from './add-promo-code/add-promo-code.component';
import { EditPromoCodeComponent } from './edit-promo-code/edit-promo-code.component';


import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'promocodes',
        component: PromoCodesComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllPromoCodesComponent,
            },
            {
                path: 'add',
                component: AddPromoCodeComponent,
            },
            {
              path: 'edit/:id',
              component: EditPromoCodeComponent
            },
            { path: '', redirectTo: 'promocodes', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoCodesRoutingModule { }