import { Browser, Element } from 'webdriverio';

export class AppPage {

  async navigateTo(browser: Browser<'async'>): Promise<string> {
    return browser.url('');
  }

  async getTitle(browser: Browser<'async'>): Promise<string> {
    const h1 = await browser.$('app-root h1') as Element<'async'>;
    return h1.getText();
  }
}
