export class ProductDetailPage {

    async getTitle(): Promise<string> {
        const $h1: WebdriverIO.Element = await $('app-root .product-details h2');
        return $h1.getText();
    }

}