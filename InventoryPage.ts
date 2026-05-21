import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async buyBackpack() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
  }

  async buyBikeLight() {
    await this.page.locator('#add-to-cart-sauce-labs-bike-light').click();
  }

  async collectBackpackPrice(): Promise<string> {
    return await this.page.locator('(//div[@data-test="inventory-item-price"])[1]').textContent() || '$0.00';
  }

  async collectBikeLightPrice(): Promise<string> {
    return await this.page.locator('(//div[@data-test="inventory-item-price"])[2]').textContent() || '$0.00';
  }

  async verifyCartCount() {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText("2");
  }

  async verifyRemoveButtons() {
    await expect(this.page.locator('#remove-sauce-labs-backpack')).toHaveText("Remove");
    await expect(this.page.locator('#remove-sauce-labs-bike-light')).toHaveText("Remove");
  }
}
