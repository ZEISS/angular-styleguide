/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private httpClient = inject(HttpClient);

  // for mocking, we're using a local json file.
  // in a real-world app this would be a REST resource on a server
  private readonly productUrl = './assets/products.json';

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product[]>(this.productUrl).pipe(
      map((products) => {
        const product = products.find((product) => product.id === id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      }),
    );
  }
}
