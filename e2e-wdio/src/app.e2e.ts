/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { productMasterPage } from './page-objects/product-master.po';
import { productDetailPage } from './page-objects/product-detail.po';

describe('Product master page', () => {
  it('should display title', async () => {
    await productMasterPage.navigateTo();
    await expectAsync(productMasterPage.title).toHaveText('GET YOUR ICE CREAM');
  });

  it('should navigate to correct detail page when product was clicked', async () => {
    await productMasterPage.navigateTo();
    const productName = 'Mint';
    const productImage = await productMasterPage.getProductImageByName(productName);

    await productImage.click();

    await expectAsync(productDetailPage.title).toHaveText(productName);
  });
});
