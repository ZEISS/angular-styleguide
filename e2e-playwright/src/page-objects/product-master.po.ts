import { Page, Response } from '@playwright/test';
import { baseUrl } from '../../playwright.config';

export class ProductMasterPage {

  constructor(private page: Page) {
  }

  navigateTo(): Promise<Response> {
    return this.page.goto(baseUrl);
  }

  getTitle(): Promise<string | null> {
    return this.page.textContent('app-product-master h1');
  }

  async getProductImageByName(name: string) {
    const title = await this.page.waitForSelector(`app-product-master .product-title:text-is("${name}")`);
    const parent = await title.$('xpath=..');
    if (parent == null) {
      return null;
    }
    return parent.$('img');
  }
}
