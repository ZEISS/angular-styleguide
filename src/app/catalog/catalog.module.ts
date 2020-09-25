import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RecommendationModule } from '@app/catalog/recommendation/recommendation.module';
import { ProductModule } from '@app/catalog/product/product.module';
import { reducer, catalogFeatureKey } from '@app/catalog/store/catalog.reducer';
import { CatalogRoutingModule } from '@app/catalog/catalog-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModule,
    CatalogRoutingModule,
    RecommendationModule,
    StoreModule.forFeature(catalogFeatureKey, reducer)
  ]
})
export class CatalogModule { }
