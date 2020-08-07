import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadProductDetails, loadProductDetailsSuccess, loadProducts, loadProductsSuccess } from './product.actions';
import { ProductService } from '@app/catalog/product/services/product.service';
import { navigate } from '@app/shared/navigation/navigation.actions';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private service: ProductService) {
  }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() => this.service.loadProducts().pipe(
      map(products => loadProductsSuccess({products})),
      catchError(() => EMPTY)
    )),
  ));

  loadProductDetails$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductDetails),
    switchMap(({productId}) => this.service.getProduct(productId).pipe(
      switchMap(product =>
        of(
          loadProductDetailsSuccess({product}),
          navigate({url: `/product/${product.id}`})
        )
      ),
      catchError(() => EMPTY)
    )),
  ));
}
