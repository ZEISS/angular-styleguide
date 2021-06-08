export class ProductDetailPage {

    async getTitle(): Promise<string | null> {
        const title = await page.textContent('app-product-detail .product-details h2');
        return title;
    }

}