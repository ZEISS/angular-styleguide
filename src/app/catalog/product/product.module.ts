/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';

import { ProductDetailComponent } from '@app/catalog/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from '@app/catalog/product/components/product-master/product-master.component';
import { ProductService } from '@app/catalog/product/services/product.service';
import { ProductEffects } from '@app/catalog/product/store/product.effects';
import { RecommendationModule } from '@app/catalog/recommendation/recommendation.module';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ProductComponent } from '@app/shared/components/product/product.component';
import { ShoppingCartStore } from '@app/shared/signal-store/shopping-cart.store';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RecommendationModule,
    ThemeSwitcherComponent,
    ProductComponent,
  ],
  declarations: [ProductDetailComponent, ProductMasterComponent],
  exports: [ProductDetailComponent, ProductMasterComponent],
  providers: [ProductService, provideEffects(ProductEffects), AsyncPipe, ShoppingCartStore],
})
export class ProductModule {}
