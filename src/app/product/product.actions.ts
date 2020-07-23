import { createAction, props } from '@ngrx/store';
import { Product } from '@models/product';

export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductDetails = createAction(
  '[Product] Load Product Details',
  props<{ productId: number }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Product] Load ProductDetails Success',
  props<{ product: Product }>()
);
