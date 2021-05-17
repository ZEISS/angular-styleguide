import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;
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
    });

    it('should display title', async () => {
        await page.navigateTo();
        expect(await page.getTitle()).toEqual('GET YOUR ICE CREAM');
    });
});
