import {Injectable} from '@angular/core';
import {Product} from '../../../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class ProductServiceService {


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


