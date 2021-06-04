import { Page } from "playwright";

export class ProductDetailPage {

    constructor(private page: Page) {
    }

    async getTitle(): Promise<string> {
        const title = await this.page.textContent('app-product-detail .product-details h2');
        if (title === null) {
            throw 'Could not find detail page title tag';
        }
        return title;
    }

}