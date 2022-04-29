import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';


import { AuthGuard } from '../../common/auth.guard';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: 'all',
              component: AllProductsComponent,
            },
            {
                path: 'add',
                component: AddProductComponent,
            },
            {
              path: 'edit/:id',
              component: EditProductComponent
            },
            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }