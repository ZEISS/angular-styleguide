import { selectCurrentProductDetails, selectProducts } from './product.selectors';
import { State } from '@app/reducers';
import { productFeatureKey } from './product.reducer';
import { ProductTestData } from '@models/product.testdata';
import { catalogFeatureKey, StateWithCatalog } from '@app/catalog/store/catalog.reducer';


describe('Product Selectors', () => {
  describe('selectProducts', () => {
    it('should select the products', () => {
      const state = {
        [catalogFeatureKey]: {
          [productFeatureKey]: {
            products: ProductTestData.validProductList,
            currentProductDetails: undefined
          }
        }
      } as StateWithCatalog;
      expect(selectProducts(state)).toEqual(ProductTestData.validProductList);
    });
  });

  describe('selectProductDetails', () => {
    it('should select the current product details', () => {
      const state = {
        [catalogFeatureKey]: {
          [productFeatureKey]: {
            products: ProductTestData.validProductList,
            currentProductDetails: ProductTestData.validProduct
          }
        }
      } as StateWithCatalog;
      expect(selectCurrentProductDetails(state)).toEqual(ProductTestData.validProduct);
    });
  });
});
