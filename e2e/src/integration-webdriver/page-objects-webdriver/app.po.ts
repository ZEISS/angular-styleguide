import { remote, Browser, Element } from 'webdriverio';

// const { remote } = require('webdriverio');

export class AppPage {

  async navigateTo() {
    const browser = await this.getBrowser();
    // TODO set base url for webdriver
    return browser.url('http://localhost:4200/');
    // browser.waitUntil(browser.url(''));
  }

  async getTitle() {
    const browser = await this.getBrowser();
    browser.debug();

    // TODO remove debug wait
    try {
      await browser.waitUntil(() => false, { timeout: 2000 });
    } catch (e) { }

    const h1 = await browser.$('app-root h1') as Element<'async'>;
    // const html = await h1.getHTML();
    await h1.waitForExist({ timeout: 3000 });
    // const isLoading = await browser.
    const text = await h1.getText();
    return text;
    // return element(by.css('app-root h1')).getText();
  }

  private getBrowser(): Promise<Browser<'async'>> {
    return remote({
      capabilities: {
        browserName: 'chrome'
      }
    })
  }
}
