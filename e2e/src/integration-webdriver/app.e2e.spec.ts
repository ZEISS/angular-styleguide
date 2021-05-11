import { AppPage } from './page-objects-webdriver/app.po';
import { Browser } from 'webdriverio';

describe('workspace-project App', async () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title', async () => {
        const b = (global as any).browser as Browser<'async'>;
        await page.navigateTo(b);
        expect(await page.getTitle(b)).toEqual('GET YOUR ICE CREAM');
    });
});

