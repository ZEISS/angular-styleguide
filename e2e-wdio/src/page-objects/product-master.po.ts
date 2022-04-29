/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

export class ProductMasterPage {
  async navigateTo(): Promise<string> {
    return browser.url('');
  }

  get title(): Promise<WebdriverIO.Element> {
    return $('app-product-master h1');
  }

  async getProductImageByName(name: string): Promise<WebdriverIO.Element> {
    const productMaster = await $('app-product-master');
    const title = await productMaster.$(`.product-title=${name}`);
    return (await title.parentElement()).$('img');
  }
}

export const productMasterPage = new ProductMasterPage();
