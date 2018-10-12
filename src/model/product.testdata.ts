import { Product } from '@models/product';

export class ProductTestData {
  static get validProductList(): Product[] {
    return [{
      id: 1,
      title: 'test',
      image: 'none',
      price: '1.99€',
      description: 'empty',
    }];
  }
}
