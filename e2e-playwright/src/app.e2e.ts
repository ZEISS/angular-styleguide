import { ProductMasterPage } from './page-objects/product-master.po';
import { ProductDetailPage } from './page-objects/product-detail.po';

describe('Product master page', () => {
  const masterPage = new ProductMasterPage();
  const detailPage = new ProductDetailPage();

  it('should display title', async () => {
    await masterPage.navigateTo();
    expect(await masterPage.getTitle()).toEqual('GET YOUR ICE CREAM');
  });

  it('should navigate to correct detail page when product was clicked', async () => {
    await masterPage.navigateTo();
    const productName = 'Solero';
    const productImage = await masterPage.getProductImageByName(productName);

    await productImage?.click();

    expect(await detailPage.getTitle()).toEqual(productName);
  });
});
