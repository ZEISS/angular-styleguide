import { AppPage } from './page-objects/app.po';
import { ProductDetailPage } from './page-objects/product-detail.po';

describe('workspace-project App', async () => {
    let page: AppPage;
    let detailPage: ProductDetailPage;

    beforeEach(() => {
        page = new AppPage();
        detailPage = new ProductDetailPage();
    });

    it('should display title', async () => {
        await page.navigateTo();
        expect(await page.getTitle()).toEqual('GET YOUR ICE CREAM');
    });

    it('should navigate to correct detail page when product was clicked', async () => {
        await page.navigateTo();
        const productName = 'Solero';
        const $product = await page.getProductLinkByName(productName);

        await $product.click();

        expect(await detailPage.getTitle()).toEqual(productName);
    });
});

