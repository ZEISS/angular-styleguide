/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadProducts } from '@app/catalog/product/store/product.actions';
import { selectProducts } from '@app/catalog/product/store/product.selectors';
import { AppState } from '@app/reducers';
import { ProductComponent } from '@app/shared/components/product/product.component';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { Product } from '@models/product';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [CommonModule, ProductComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent implements OnInit {
  public products: Product[] = [];
  private displayableContentSections: boolean[] = [];

  private productReceiveHandler = (products: Product[]): void => {
    this.displayableContentSections = new Array(Math.round(products.length / 3)).fill(false);
    this.products = products;
    this.cdr.markForCheck();
  };

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
  ) {
    this.store
      .select(selectProducts)
      .pipe(takeUntilDestroyed())
      .subscribe(this.productReceiveHandler);
  }

  public ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  public loadProductDetails(id: number) {
    this.store.dispatch(navigate({ url: `/product/${id}` }));
  }

  public isContentInTheViewport(index: number): boolean {
    return this.displayableContentSections[index / 3];
  }
}
