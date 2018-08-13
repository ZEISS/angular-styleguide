import {Injectable} from '@angular/core';
import {Product} from '../../../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ProductServiceService {

  constructor(private httpClient: HttpClient) {
  }

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://www.mocky.io/v2/5b6d4e87330000211aa36ca7');
  }
}


