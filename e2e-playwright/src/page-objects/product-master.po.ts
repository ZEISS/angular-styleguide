import { ElementHandle, Page } from 'playwright';

export class ProductMasterPage {

  constructor(private page: Page) {
  }

  async navigateTo(): Promise<void> {
    // Could not find a good way to type global jest variables.
    // See https://stackoverflow.com/questions/64172325/typescript-jest-global-variable-example
    const url = (global as any).__BASE_URL__;
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    const title = await this.page.textContent('app-product-master h1');
    if (title === null) {
      throw 'Could not find title tag';
    }
    return title;
  }

  async getProductImageByName(name: string): Promise<ElementHandle<SVGElement | HTMLElement>> {
    const title = await this.page.waitForSelector(`app-product-master .product-title:text-is("${name}")`);
    const parent = await title.$('xpath=..');
    const image = await parent?.$('img');
    if (image == null) {
      throw 'Could not find product link';
    }
    return image;
  }
}