import { ElementHandle, Page } from 'playwright';

export class AppPage {

  constructor(private page: Page) {
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('http://localhost:4200/'); // TODO: base url?
  }

  async getTitle(): Promise<string> {
    const title = await this.page.textContent('app-root h1');
    if (title === null) {
      throw 'Could not find title tag';
    }
    return title;
  }

  async getProductLinkByName(name: string): Promise<ElementHandle<SVGElement | HTMLElement>> {
    const $name = await this.page.waitForSelector(`app-root app-product-master .product-title:text-is("${name}")`);
    const $parent = await $name.$('xpath=..');
    // clicking on the image triggers the navigation
    const $result = await $parent?.$('img');
    if ($result == null) {
      throw 'Could not find product link';
    }
    return $result;
  }
}