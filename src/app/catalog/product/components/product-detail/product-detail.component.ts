/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { loadProductDetails } from '@app/catalog/product/store/product.actions';
import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { RecommendationsComponent } from '@app/catalog/recommendation/components/recommendations/recommendations.component';
import { AppState } from '@app/reducers';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { ShoppingCartStore } from '@app/shared/signal-store/shopping-cart.store';
import { Product } from '@models/product';
import { productToProductInCart } from '@models/product.mapper';
import { BackToAllProductsComponent } from '@app/shared/components/back-to-all-products/back-to-all-products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcherComponent,
    RecommendationsComponent,
    BackToAllProductsComponent,
    FontAwesomeModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  protected readonly faComment = faComment;
  product$ = this.store.select(selectCurrentProductDetails);
  private loadedProduct: Product | null = null;

  public shoppingCartSignalStore = inject(ShoppingCartStore);

  productNumber = signal(1);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    const productId: number = Number.parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.store.dispatch(loadProductDetails({ productId: productId }));
    this.product$.pipe(takeUntilDestroyed()).subscribe({
      next: (product) => (this.loadedProduct = product),
      error: (error: Error) =>
        console.log(`Error while loading product in ProductDetailsComponent: ${error}`),
    });
  }

  addToCart(): void {
    if (!this.loadedProduct) {
      return;
    }
    this.shoppingCartSignalStore.addProduct({
      ...productToProductInCart(this.loadedProduct, this.productNumber()),
    });
    this.cdr.markForCheck();
  }

  increseProductNumber(): void {
    this.productNumber.update((c) => c + 1);
  }

  decreaseProductNumber(): void {
    this.productNumber.update((c) => (c > 1 ? c - 1 : 1));
  }

  public navigateToFeedback(): void {
    this.store.dispatch(navigate({ url: '/feedback-form' }));
  }
}
