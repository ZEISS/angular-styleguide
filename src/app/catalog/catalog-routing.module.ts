import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from './product/components/product-master/product-master.component';

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
export class CatalogRoutingModule {}
