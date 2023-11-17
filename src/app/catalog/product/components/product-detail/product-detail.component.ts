/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { loadProductDetails } from '@app/catalog/product/store/product.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$ = this.store.select(selectCurrentProductDetails);

  productNumber = signal(1);

  constructor(private store: Store<StateWithCatalog>, private route: ActivatedRoute) {}

  backToProductOverview(): void {
    this.store.dispatch(navigate({ url: '/' }));
  }

  showConfirmation(): void {
    this.store.dispatch(navigate({ url: '/order' }));
  }

  increseProductNumber(): void {
    this.productNumber.update((c) => c + 1);
  }

  decreaseProductNumber(): void {
    this.productNumber.update((c) => (c > 1 ? c - 1 : 1));
  }

  ngOnInit() {
    const productId: number = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProductDetails({ productId: productId }));
  }
}
