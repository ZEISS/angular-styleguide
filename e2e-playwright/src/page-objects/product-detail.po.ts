import { Page } from '@playwright/test';

export class ProductDetailPage {
  constructor(private page: Page) {}

  getTitle(): Promise<string | null> {
    return this.page.textContent('app-product-detail .product-details h2');
  }
}
