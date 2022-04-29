/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private readonly productUrl = 'http://www.mocky.io/v2/5b752bc12e00006f00535f00';

  constructor(private httpClient: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  getProduct(id: number | string): Observable<Product> {
    return this.httpClient
      .get<Product[]>(this.productUrl)
      .pipe(map((products) => products.find((product) => product.id === id)));
  }
}
