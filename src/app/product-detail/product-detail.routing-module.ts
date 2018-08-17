import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmationInfoComponent} from '../confirmation/components/confirmation-info/confirmation-info.component';
import {ProductDescriptionComponent} from './components/product-description/product-description.component';

const productDetailRoutes: Routes = [
  {path: 'product/:id', component: ProductDescriptionComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      productDetailRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ProductDetailRoutingModule {}
