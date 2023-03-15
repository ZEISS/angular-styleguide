/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { loadProducts } from '@app/catalog/product/store/product.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$ = this.store.select(selectCurrentProductDetails);

  constructor(private store: Store<StateWithCatalog>) {}

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }

  showConfirmation() {
    this.store.dispatch(navigate({ url: '/order' }));
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }
}
