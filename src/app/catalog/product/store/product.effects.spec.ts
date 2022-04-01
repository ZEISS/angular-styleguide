import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { ProductService } from '@app/catalog/product/services/product.service';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { ProductTestData } from '@models/product.testdata';
import {
  loadProductDetails,
  loadProductDetailsSuccess,
  loadProducts,
  loadProductsSuccess,
} from './product.actions';
import { ProductEffects } from './product.effects';
import { testObservable } from '@support/testing/observable-helper';

describe('ProductEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductEffects;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj<ProductService>(['loadProducts', 'getProduct']),
        },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  describe('loadProducts$', () => {
    it('should load products from service and dispatch successful action', () => {
      const loadedProducts = ProductTestData.validProductList;
      productServiceSpy.loadProducts.and.returnValue(of(loadedProducts));

      actions$ = of(loadProducts());
      const result$: Observable<Action> = effects.loadProducts$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(a|)', {
          a: loadProductsSuccess({ products: loadedProducts }),
        });
      });

      expect(productServiceSpy.loadProducts).toHaveBeenCalledWith();
    });

    it('should complete the observable if service throws an error', () => {
      productServiceSpy.loadProducts.and.returnValue(throwError(() => new HttpErrorResponse({})));

      actions$ = of(loadProducts());
      const result$: Observable<Action> = effects.loadProducts$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(|)', {});
      });
    });
  });

  describe('loadProductDetails$', () => {
    const productId = ProductTestData.validProduct.id;

    it('should load product details from service, dispatch successful action and navigate to details', () => {
      const detailedProducts = ProductTestData.validProduct;
      productServiceSpy.getProduct.and.returnValue(of(detailedProducts));

      actions$ = of(loadProductDetails({ productId }));
      const result$: Observable<Action> = effects.loadProductDetails$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(ab|)', {
          a: loadProductDetailsSuccess({ product: detailedProducts }),
          b: navigate({ url: `/product/${productId}` }),
        });
      });

      expect(productServiceSpy.getProduct).toHaveBeenCalledWith(productId);
    });

    it('should complete the observable if service throws', () => {
      productServiceSpy.getProduct.and.returnValue(throwError(() => new HttpErrorResponse({})));

      actions$ = of(loadProductDetails({ productId }));
      const result$ = effects.loadProductDetails$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(|)', {});
      });
    });
  });
});
