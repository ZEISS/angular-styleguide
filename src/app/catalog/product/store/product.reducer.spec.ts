import { initialState, reducer } from './product.reducer';
import { loadProductDetailsSuccess, loadProductsSuccess } from './product.actions';
import { ProductTestData } from '@models/product.testdata';

describe('Product Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('a loadProductsSuccess action', () => {
    it('should put products into state', () => {
      const action = loadProductsSuccess({ products: ProductTestData.validProductList });

      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, products: ProductTestData.validProductList });
    });
  });

  describe('a loadProductDetailsSuccess action', () => {
    it('should put detailed product into state', () => {
      const action = loadProductDetailsSuccess({ product: ProductTestData.validProduct });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentProductDetails: ProductTestData.validProduct,
      });
    });
  });
});
