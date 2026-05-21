import { expect, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async verify_cart_items() {
    await expect(this.page.locator('.cart_item')).toHaveCount(2);
  }
  async verify_backpack_item() {
    await expect(this.page.locator('(//div[@data-test="inventory-item-name"])[1]')).toHaveText('Sauce Labs Backpack');
  }
  async verify_backpack_price() {
    await expect(this.page.locator('(//div[@data-test="inventory-item-price"])[1]')).toContainText('29.99');
  }
  async verify_bike_light_item() {
    await expect(this.page.locator('(//div[@data-test="inventory-item-name"])[2]')).toHaveText('Sauce Labs Bike Light');
  }
  async verify_bike_light_price() {
    await expect(this.page.locator('(//div[@data-test="inventory-item-price"])[2]')).toContainText('9.99');
  }

}
