import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import {ProductComponent} from './components/product/product.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductOverviewComponent, ProductComponent],
  exports: [ProductOverviewComponent]
})
export class ProductOverviewModule { }
