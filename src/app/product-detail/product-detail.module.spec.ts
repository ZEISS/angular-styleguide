import { ProductDetailModule } from './product-detail.module';

describe('ProductDetailModule', () => {
  let productDetailModule: ProductDetailModule;

  beforeEach(() => {
    productDetailModule = new ProductDetailModule();
  });

  it('should create an instance', () => {
    expect(productDetailModule).toBeTruthy();
  });
});
