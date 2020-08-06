import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ProductRoutingModule } from '@app/product/product.routing-module';
import { ProductDetailComponent } from '@app/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '@app/product/components/product-master/product-master.component';
import { RecommendationsModule } from '@app/product/recommendations/recommendations.module';
import { ProductService } from '@app/product/services/product.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    RecommendationsModule,
    SharedModule,
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [
    ProductDetailComponent,
    ProductMasterComponent,
  ],
  exports: [
    ProductDetailComponent,
    ProductMasterComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductModule {
}
