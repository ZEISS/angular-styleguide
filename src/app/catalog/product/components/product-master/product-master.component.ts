/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductDetails, loadProducts } from '@app/catalog/product/store/product.actions';
import { selectProducts } from '@app/catalog/product/store/product.selectors';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent implements OnInit {
  products$ = this.store.select(selectProducts);

  constructor(private store: Store<StateWithCatalog>) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  loadProductDetails(id: number) {
    this.store.dispatch(loadProductDetails({ productId: id }));
  }
}
