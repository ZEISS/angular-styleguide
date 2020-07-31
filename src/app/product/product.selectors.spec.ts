import { selectCurrentProductDetails, selectProducts } from '@app/product/product.selectors';
import { State } from '@app/reducers';
import { productFeatureKey } from '@app/product/product.reducer';
import { ProductTestData } from '@models/product.testdata';


describe('Product Selectors', () => {
  describe('selectProducts', () => {
    it('should select the products', () => {
      const state = {
        [productFeatureKey]: {
          products: ProductTestData.validProductList,
          currentProductDetails: undefined
        }
      } as State;
      expect(selectProducts(state)).toEqual(ProductTestData.validProductList);
    });
  });

  describe('selectProductDetails', () => {
    it('should select the current product details', () => {
      const state = {
        [productFeatureKey]: {
          products: ProductTestData.validProductList,
          currentProductDetails: ProductTestData.validProduct
        }
      } as State;
      expect(selectCurrentProductDetails(state)).toEqual(ProductTestData.validProduct);
    });
  });
});
