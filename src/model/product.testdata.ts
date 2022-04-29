/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Product } from '@models/product';

export class ProductTestData {
  static get validProductList(): Product[] {
    return [
      {
        id: 1,
        title: 'test',
        image: 'none',
        price: '1.99€',
        description: 'empty',
      },
    ];
  }

  static get validProduct(): Product {
    return this.validProductList[0];
  }
}
