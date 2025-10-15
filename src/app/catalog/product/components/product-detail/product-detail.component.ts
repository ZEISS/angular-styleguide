/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from '@app/catalog/product/product.store';
import { RecommendationsComponent } from '@app/catalog/recommendation/components/recommendations/recommendations.component';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ShoppingCartStore } from '@app/order/shopping-cart.store';
import { productToProductInCart } from '@models/product.mapper';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, RecommendationsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private productStore = inject(ProductStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public shoppingCartStore = inject(ShoppingCartStore);

  public product = this.productStore.currentProductDetails;
  public productNumber = signal(1);

  ngOnInit(): void {
    const productId: number = Number.parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.productStore.loadProductDetails(productId);
  }

  backToProductOverview(): void {
    this.router.navigateByUrl('/');
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (!currentProduct) {
      return;
    }
    this.shoppingCartStore.addProduct(productToProductInCart(currentProduct, this.productNumber()));
    this.productNumber.set(1);
  }

  increseProductNumber(): void {
    this.productNumber.update((c) => c + 1);
  }

  decreaseProductNumber(): void {
    this.productNumber.update((c) => (c > 1 ? c - 1 : 1));
  }
}
