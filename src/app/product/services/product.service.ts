import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {


  constructor(private httpClient: HttpClient) {
  }

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://www.mocky.io/v2/5b752bc12e00006f00535f00');
  }

  getProduct(id: number | string): Observable<Product> {
    return this.httpClient.get<Product[]>('http://www.mocky.io/v2/5b752bc12e00006f00535f00').pipe(
      map(products => products[id])
    );
  }
}


