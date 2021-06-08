export class ProductDetailPage {

    get title(): Promise<WebdriverIO.Element> {
        return $('app-product-detail .product-details h2');
    }

}

export const productDetailPage = new ProductDetailPage();