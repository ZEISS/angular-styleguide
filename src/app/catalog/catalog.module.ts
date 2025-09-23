/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideState } from '@ngrx/store';
import { RecommendationModule } from '@app/catalog/recommendation/recommendation.module';
import { ProductModule } from '@app/catalog/product/product.module';
import { reducer, catalogFeatureKey } from '@app/catalog/store/catalog.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductModule, RecommendationModule],
  providers: [provideState(catalogFeatureKey, reducer)],
})
export class CatalogModule {}
