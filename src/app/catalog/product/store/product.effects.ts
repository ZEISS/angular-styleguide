/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  loadProductDetails,
  loadProductDetailsSuccess,
  loadProducts,
  loadProductsSuccess,
} from './product.actions';
import { ProductService } from '@app/catalog/product/services/product.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private service: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.service.loadProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductDetails),
      switchMap(({ productId }) =>
        this.service.getProduct(productId).pipe(
          map((product) => loadProductDetailsSuccess({ product })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
