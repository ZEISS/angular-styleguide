import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';

const productRoutes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent},
  {path: '', component: ProductMasterComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      productRoutes,
    ),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductRoutingModule {}
