import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { ProductDetailComponent } from '@app/catalog/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '@app/catalog/product/components/product-master/product-master.component';
import { ProductService } from '@app/catalog/product/services/product.service';
import { ProductEffects } from '@app/catalog/product/store/product.effects';
import { RecommendationModule } from '@app/catalog/recommendation/recommendation.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RecommendationModule,
    SharedModule,
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [ProductDetailComponent, ProductMasterComponent],
  exports: [ProductDetailComponent, ProductMasterComponent],
  providers: [ProductService],
})
export class ProductModule {}
