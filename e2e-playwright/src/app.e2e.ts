import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { ProductMasterPage } from './page-objects/product-master.po';
import { ProductDetailPage } from './page-objects/product-detail.po';

describe('workspace-project App', () => {
    let page: ProductMasterPage;
    let detailPage: ProductDetailPage;

    beforeEach(async () => {
        page = new ProductMasterPage();
        detailPage = new ProductDetailPage();
    });

    it('should display title', async () => {
        await page.navigateTo();
        expect(await page.getTitle()).toEqual('GET YOUR ICE CREAM');
    });

    it('should navigate to correct detail page when product was clicked', async () => {
        await page.navigateTo();
        const productName = 'Solero';
        const productImage = await page.getProductImageByName(productName);

        await productImage.click();

        expect(await detailPage.getTitle()).toEqual(productName);
    });
});
