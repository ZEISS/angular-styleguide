/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

export class Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
}

export class ProductInCart extends Product {
  count: number;
}
