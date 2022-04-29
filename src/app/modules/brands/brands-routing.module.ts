import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllBrandsComponent } from './all-brands/all-brands.component';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'brands',
        component: BrandsComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllBrandsComponent,
            },
            {
                path: 'add',
                component: AddBrandComponent,
            },
            {
              path: 'edit/:id',
              component: EditBrandComponent
            },
            { path: '', redirectTo: 'brands', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }