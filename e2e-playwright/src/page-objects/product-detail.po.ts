import { Page } from "playwright";

export class ProductDetailPage {

    async getTitle(): Promise<string> {
        const title = await page.textContent('app-product-detail .product-details h2');
        if (title === null) {
            throw 'Could not find detail page title tag';
        }
        return title;
    }

}