import { ProductMasterPage } from './page-objects/product-master.po';
import { ProductDetailPage } from './page-objects/product-detail.po';

describe('workspace-project App', async () => {
    let page: ProductMasterPage;
    let detailPage: ProductDetailPage;

    beforeEach(() => {
        page = new ProductMasterPage();
        detailPage = new ProductDetailPage();
    });

    it('should display title', async () => {
        await page.navigateTo();
        await expectAsync(page.title).toHaveText('GET YOUR ICE CREAM');
    });

    it('should navigate to correct detail page when product was clicked', async () => {
        await page.navigateTo();
        const productName = 'Solero';
        const productImage = await page.getProductImageByName(productName);

        await productImage.click();

        await expectAsync(detailPage.title).toHaveText(productName);
    });
});

