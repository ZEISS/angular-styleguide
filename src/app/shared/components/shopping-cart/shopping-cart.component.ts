/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartStore } from '@app/order/shopping-cart.store';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ProductWithCount } from '@models/product';
import { ProductInCart } from '@models/product-in-cart';
import { productInCartToToProductWithCount } from '@models/product.mapper';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FaIconComponent, NgClass, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  public faCartShopping: IconDefinition = faCartShopping;
  public isCartContentVisible: boolean = false;
  public shoppingCartSignalStore = inject(ShoppingCartStore);
  public router = inject(Router);

  public products = this.shoppingCartSignalStore.products;

  public subTotal: Signal<number> = computed(() => {
    return this.shoppingCartSignalStore
      .products()
      .reduce((accumulator: number, item: ProductInCart) => {
        return accumulator + item.count * Number(item.price);
      }, 0);
  });

  public get totalCountOfProducts(): number {
    return this.products().reduce((accumulator: number, p: ProductInCart) => {
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

    this.router.navigateByUrl('/order', {
      state: {
        products: boughtProducts,
      },
    });

    this.shoppingCartSignalStore.deleteCartContent();
    this.switchCartVisibility();
  }
}
