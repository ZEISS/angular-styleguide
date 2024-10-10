/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

/**
 * General type for product in the application.
 */
export class Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
}

/**
 * Extension of the general Product class, extended with count.
 */
export class ProductWithCount extends Product {
  count: number;
}
