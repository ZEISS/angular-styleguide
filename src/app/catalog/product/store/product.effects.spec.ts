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
      const resultObservable$ = effects.loadProducts$;

      expect(resultObservable$).toEmitValues([loadProductsSuccess({ products: loadedProducts })]);
      expect(productServiceSpy.loadProducts).toHaveBeenCalled();
    });

    it('should dispatch an empty action if service throws', () => {
      productServiceSpy.loadProducts.and.returnValue(throwError(new HttpErrorResponse({})));

      actions$ = of(loadProducts());
      const resultObservable$ = effects.loadProducts$;

      expect(resultObservable$).toEmitNoValues();
    });
  });

  describe('loadProductDetails$', () => {
    it('should load product details from service, dispatch successful action and navigate to details', () => {
      const detailedProducts = ProductTestData.validProduct;
      productServiceSpy.getProduct.and.returnValue(of(detailedProducts));

      actions$ = of(loadProductDetails({ productId: ProductTestData.validProduct.id }));
      const resultObservable$ = effects.loadProductDetails$;

      expect(resultObservable$).toEmitValues([
        loadProductDetailsSuccess({ product: detailedProducts }),
        navigate({ url: '/product/1' }),
      ]);
      expect(productServiceSpy.getProduct).toHaveBeenCalled();
    });

    it('should dispatch an empty action if service throws', () => {
      productServiceSpy.getProduct.and.returnValue(throwError(new HttpErrorResponse({})));

      actions$ = of(loadProductDetails({ productId: ProductTestData.validProduct.id }));
      const resultObservable$ = effects.loadProductDetails$;

      expect(resultObservable$).toEmitNoValues();
    });
  });
});
