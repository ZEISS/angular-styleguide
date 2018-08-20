import { ProductOverviewModule } from './product-overview.module';

describe('SharedModule', () => {
  let productOverviewModule: ProductOverviewModule;

  beforeEach(() => {
    productOverviewModule = new ProductOverviewModule();
  });

  it('should create an instance', () => {
    expect(productOverviewModule).toBeTruthy();
  });
});
