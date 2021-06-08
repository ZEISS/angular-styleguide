export class ProductDetailPage {

    getTitle(): Promise<string | null> {
        return page.textContent('app-product-detail .product-details h2');
    }

}