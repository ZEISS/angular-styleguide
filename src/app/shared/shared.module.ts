import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './components/product/product.component';
import {RouterModule} from '@angular/router';
import { RecommendationComponent } from './components/recommendation/recommendation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductComponent,
    RecommendationComponent
  ],
  exports: [
    ProductComponent,
    RecommendationComponent
  ]
})
export class SharedModule { }
