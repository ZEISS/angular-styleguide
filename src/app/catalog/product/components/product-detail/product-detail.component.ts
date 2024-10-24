/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { loadProductDetails } from '@app/catalog/product/store/product.actions';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartStore } from '@app/shared/signal-store/shopping-cart.store';
import { Product } from '@models/product';
import { Subscription } from 'rxjs';
import { productToProductInCart } from '@models/product.mapper';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$ = this.store.select(selectCurrentProductDetails);
  private loadedProduct: Product;
  private loadProductSubscription: Subscription;

  public shoppingCartSignalStore = inject(ShoppingCartStore);

  productNumber = signal(1);

  constructor(
    private store: Store<StateWithCatalog>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  backToProductOverview(): void {
    this.store.dispatch(navigate({ url: '/' }));
  }

  addToCart(): void {
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

  public ngOnInit() {
    const productId: number = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProductDetails({ productId: productId }));
    this.loadProductSubscription = this.product$.subscribe({
      next: (product: Product) => (this.loadedProduct = product),
      error: (error: Error) =>
        console.log(`Error while loading product in ProductDetailsComponent: ${error}`),
    });
  }

  public ngOnDestroy() {
    this.loadProductSubscription.unsubscribe();
  }
}
