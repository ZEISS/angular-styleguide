/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ShoppingCartStore } from '@app/shared/signal-store/shopping-cart.store';
import { ProductInCart } from '@models/product-in-cart';
import { FormsModule } from '@angular/forms';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { Store } from '@ngrx/store';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { productInCartToToProductWithCount } from '@models/product.mapper';
import { ProductWithCount } from '@models/product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FaIconComponent, NgIf, NgClass, AsyncPipe, NgFor, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  public faCartShopping: IconDefinition = faCartShopping;
  public isCartContentVisible: boolean;
  public shoppingCartSignalStore = inject(ShoppingCartStore);
  public subTotal: Signal<number> = computed(() => {
    return this.shoppingCartSignalStore
      .products()
      .reduce((accumulator: number, item: ProductInCart) => {
        return accumulator + item.count * Number(item.price);
      }, 0);
  });

  public get products(): ProductInCart[] {
    return this.shoppingCartSignalStore.products() as ProductInCart[];
  }

  public get totalCountOfProducts(): number {
    return this.products.reduce((accumulator: number, p: ProductInCart) => {
      return accumulator + p.count;
    }, 0);
  }

  public switchCartVisibility(): void {
    this.isCartContentVisible = !this.isCartContentVisible;
  }

  public handleCountChange(productId: number, newCount: number): void {
    if (newCount < 1) {
      this.shoppingCartSignalStore.deleteProduct(productId);
      return;
    }

    this.shoppingCartSignalStore.updateCount(productId, newCount);
  }

  public handleBuyButtonClick() {
    const boughtProducts: ProductWithCount[] = this.shoppingCartSignalStore
      .products()
      .map((p) => productInCartToToProductWithCount(p));

    this.store.dispatch(
      navigate({
        url: '/order',
        navigationExtras: {
          state: {
            products: boughtProducts,
          },
        },
      }),
    );

    this.shoppingCartSignalStore.deleteCartContent();
    this.switchCartVisibility();
  }

  constructor(private store: Store<StateWithCatalog>) {}
}
