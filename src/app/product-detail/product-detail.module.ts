import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import {ProductDetailRoutingModule} from './product-detail.routing-module';
import {RecommendationsModule} from './recommendations/recommendations.module';

@NgModule({
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    RecommendationsModule
  ],
  declarations: [ProductDescriptionComponent]
})
export class ProductDetailModule { }
