/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { loadProductDetails, loadProducts } from '@app/catalog/product/store/product.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$ = this.store.select(selectCurrentProductDetails);

  constructor(private store: Store<StateWithCatalog>, private route: ActivatedRoute) {}

  backToProductOverview(): void {
    this.store.dispatch(navigate({ url: '/' }));
  }

  showConfirmation(): void {
    this.store.dispatch(navigate({ url: '/order' }));
  }

  ngOnInit() {
    const productId: number = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProductDetails({ productId: productId }));
  }
}
