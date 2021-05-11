import { AppPage } from './page-objects-webdriver/app.po';
import { remote, Browser, Element } from 'webdriverio';




describe('workspace-project App', async () => {
    let page: AppPage;
    const browser: Promise<Browser<'async'>> = remote({
        capabilities: { browserName: 'chrome' }, baseUrl: 'http://localhost:4200/'
    });

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title WEBDRIVER', async () => {
        await page.navigateTo(await browser);
        expect(await page.getTitle(await browser)).toEqual('GET YOUR ICE CREAM');
    });
});

