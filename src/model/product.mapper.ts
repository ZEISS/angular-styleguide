/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Product, ProductWithCount } from '@models/product';
import { ProductInCart } from '@models/product-in-cart';

/**
 * Maps the general Product class to the ProductInCart class (Shopping Cart, SignalStore example)
 * @param product Product
 * @param count counter of the corresponding product
 */
export const productToProductInCart = (product: Product, count: number): ProductInCart => {
  return {
    count: count,
    id: product.id,
    description: product.description,
    image: product.image,
    price: product.price,
    title: product.title,
  };
};

/**
 * Maps the ProductInCart class (Shopping Cart, SignalStore example) to the ProductWithCount Class
 * @param product Product
 * @param count counter of the corresponding product
 */
export const productInCartToToProductWithCount = (product: ProductInCart): ProductWithCount => {
  return {
    count: product.count,
    id: product.id,
    description: product.description,
    image: product.image,
    price: product.price,
    title: product.title,
  };
};
