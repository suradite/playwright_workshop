import { expect, type Page } from '@playwright/test';

export class PrecheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCheckout() {
    await this.page.locator('#checkout').click();
  }
  async fillText() {
    await this.page.locator('#first-name').fill('John');
    await this.page.locator('#last-name').fill('Doe');
    await this.page.locator('#postal-code').fill('12345');
  }
  async clickContinue() {
    await this.page.locator('#continue').click();
  }
}
