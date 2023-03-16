/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from '@app/catalog/product/store/product.actions';
import { selectProducts } from '@app/catalog/product/store/product.selectors';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { navigate } from '@app/shared/navigation/navigation.actions';

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
    //product details are now loaded from product-detail component while product-master handles navigation only
    this.store.dispatch(navigate({ url: `/product/${id}` }));
  }
}
