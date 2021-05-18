import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { AppPage } from './page-objects/app.po';
import { ProductDetailPage } from './page-objects/product-detail.po';

describe('workspace-project App', () => {
    let page: AppPage;
    let detailPage: ProductDetailPage;
    let browser: Browser;
    let browserPage: Page;
    let context: BrowserContext;

    beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        browserPage = await context.newPage();
    });

    afterAll(async () => {
        browser.close();
    });

    beforeEach(async () => {
        page = new AppPage(browserPage);
        detailPage = new ProductDetailPage(browserPage);
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
