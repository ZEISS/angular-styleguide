import { Injectable } from '@angular/core';
import {Product} from '../../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }
}

export const PRODUCTS: Product[] = [
  { id: 1, title: 'Calippo', image: 'assets/product-images/Calippo.png'},
  { id: 2, title: 'Cornetto', image: 'assets/product-images/Cornetto.png'},
  { id: 3, title: 'Kinder Ice Cream', image: 'assets/product-images/Kinder.png'},
  { id: 4, title: 'Klassiker', image: 'assets/product-images/Klassiker.png'},
  { id: 5, title: 'Cremissimo', image: 'assets/product-images/Cremissimo.png'},
  { id: 6, title: 'Solero', image: 'assets/product-images/Solero.png'}
];
