import { AppPage } from './page-objects-webdriver/app.po';
import { Browser } from 'webdriverio';

describe('workspace-project App', async () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title', async () => {
        await page.navigateTo(browser);
        expect(await page.getTitle(browser)).toEqual('GET YOUR ICE CREAM');
    });
});

