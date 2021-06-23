import { ElementHandleForTag } from 'playwright/types/structs';

export class ProductMasterPage {

  async navigateTo(): Promise<void> {
    // Could not find a good way to type global jest variables.
    // See https://stackoverflow.com/questions/64172325/typescript-jest-global-variable-example
    const url = (global as any).__BASE_URL__;
    await page.goto(url);
  }

  getTitle(): Promise<string | null> {
    return page.textContent('app-product-master h1');
  }

  async getProductImageByName(name: string): Promise<ElementHandleForTag<"img"> | null> {
    const title = await page.waitForSelector(`app-product-master .product-title:text-is("${name}")`);
    const parent = await title.$('xpath=..');
    if (parent == null) {
      return null;
    }
    return parent.$('img');
  }
}