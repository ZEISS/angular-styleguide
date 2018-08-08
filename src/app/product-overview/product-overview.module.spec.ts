import { ProductOverviewModule } from './product-overview.module';

describe('ProductOverviewModule', () => {
  let productOverviewModule: ProductOverviewModule;

  beforeEach(() => {
    productOverviewModule = new ProductOverviewModule();
  });

  it('should create an instance', () => {
    expect(productOverviewModule).toBeTruthy();
  });
});
