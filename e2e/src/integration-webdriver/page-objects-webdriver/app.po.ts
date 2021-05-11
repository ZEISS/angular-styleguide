export class AppPage {

  async navigateTo(): Promise<string> {
    return browser.url('');
  }

  async getTitle(): Promise<string> {
    const $h1: WebdriverIO.Element = await $('app-root h1');
    return $h1.getText();
  }

  async getProductLinkByName(name: string): Promise<WebdriverIO.Element> {
    const $productMaster = await $('app-root app-product-master');
    const $name = await $productMaster.$(`.product-title=${name}`);
    // clicking on the image triggers the navigation
    return (await $name.parentElement()).$('img');
  }
}
