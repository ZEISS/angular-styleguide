import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadProductDetails, loadProductDetailsSuccess, loadProducts, loadProductsSuccess } from '@app/product/product.actions';
import { ProductService } from '@app/product/services/product.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private service: ProductService, private router: Router) {
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
      map(product => loadProductDetailsSuccess({product})),
      // TODO Create effect for routing
      tap(({product}) => this.router.navigate([`/product/${product.id}`])),
      catchError(() => EMPTY)
    )),
  ));
}
