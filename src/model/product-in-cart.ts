/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

/**
 * Class for the Shopping Cart functionality (Signal Store Example)
 */
export class ProductInCart {
  count: number;
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
}
