export class ProductDetailPage {

    async getTitle(): Promise<string> {
        // TODO remove debug
        const $html = await $('html');
        const html = await $html.getHTML();

        const $h1: WebdriverIO.Element = await $('app-root .product-details h2');
        return $h1.getText();
    }

}