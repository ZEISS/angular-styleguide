import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import {ProductDetailRoutingModule} from './product-detail.routing-module';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailRoutingModule
  ],
  declarations: [ProductDescriptionComponent]
})
export class ProductDetailModule { }
