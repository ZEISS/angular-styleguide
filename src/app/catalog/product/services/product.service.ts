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
  // for mocking, we're using a local json file.
  // in a real-world app this would be a REST ressource on a server
  private readonly productUrl = '/assets/products.json';

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
