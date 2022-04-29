/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

export class ProductDetailPage {
  get title(): Promise<WebdriverIO.Element> {
    return $('app-product-detail .product-details h2');
  }
}

export const productDetailPage = new ProductDetailPage();
