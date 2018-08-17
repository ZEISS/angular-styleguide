import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDescriptionComponent} from '../product-detail/components/product-description/product-description.component';
import {ProductOverviewComponent} from './components/product-overview/product-overview.component';

const productRoutes: Routes = [
  {path: '', component: ProductOverviewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      productRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ProductOverviewRoutingModule {}
