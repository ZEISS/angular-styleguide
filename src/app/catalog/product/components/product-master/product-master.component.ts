/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductStore } from '@app/catalog/product/product.store';
import { ProductComponent } from '@app/shared/components/product/product.component';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [CommonModule, ProductComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent {
  private productStore = inject(ProductStore);
  private router = inject(Router);

  // Expose as a getter for template compatibility with @for
  public get products() {
    return this.productStore.products();
  }

  public displayableContentSections = computed(() => {
    const products = this.productStore.products();
    return new Array(Math.round(products.length / 3)).fill(false);
  });

  public loadProductDetails(id: number): void {
    this.router.navigateByUrl(`/product/${id}`);
  }

  public isContentInTheViewport(index: number): boolean {
    return this.displayableContentSections()[index / 3];
  }
}
