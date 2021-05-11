import { AppPage } from './page-objects-webdriver/app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title WEBDRIVER', async () => {
        await page.navigateTo();
        expect(await page.getTitle()).toEqual('GET YOUR ICE CREAM');
    });
});

