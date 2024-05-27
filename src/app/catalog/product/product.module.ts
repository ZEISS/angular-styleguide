/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';

import { ProductDetailComponent } from '@app/catalog/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '@app/catalog/product/components/product-master/product-master.component';
import { ProductService } from '@app/catalog/product/services/product.service';
import { ProductEffects } from '@app/catalog/product/store/product.effects';
import { RecommendationModule } from '@app/catalog/recommendation/recommendation.module';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ProductComponent } from '@app/shared/components/product/product.component';

@NgModule({
  declarations: [ProductDetailComponent, ProductMasterComponent],
  exports: [ProductDetailComponent, ProductMasterComponent],
  imports: [CommonModule, RecommendationModule, ProductComponent, ThemeSwitcherComponent],
  providers: [
    ProductService,
    provideEffects(ProductEffects),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class ProductModule {}
