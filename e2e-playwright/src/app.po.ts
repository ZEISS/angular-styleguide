import { Page } from 'playwright';

export class AppPage {

  constructor(private page: Page) {
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('http://localhost:4200/'); // TODO: base url?
  }

  async getTitle(): Promise<string> {
    const title = await this.page.textContent('app-root h1');
    if (title === null) {
      throw 'Could not find title tag';
    }
    return title;
  }
}