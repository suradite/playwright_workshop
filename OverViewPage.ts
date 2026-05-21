import { expect, type Page } from '@playwright/test';

export class OverViewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getItemTotal() {
    const itemTotalText = await this.page.locator('.summary_subtotal_label').textContent();    
    return itemTotalText;
  }
  async getTax() {
    const taxText = await this.page.locator('.summary_tax_label').textContent();
    return taxText;
  }
  async getTotal() {
    const totalText = await this.page.locator('.summary_total_label').textContent();
    return totalText;
  }
  async getItemCurrentPrice(price1: string, price2: string) {
    const currentPrice = ((parseFloat(price1.replace('$', '')) || 0) + (parseFloat(price2.replace('$', '')) || 0));
    return currentPrice;
  }
  async getCurrentTax(currentPrice: number) {
    const currentTax = parseFloat((currentPrice * 0.08).toFixed(2)); // Assuming 8% tax
    return currentTax;
  }
  async getCurrentTotal(currentPrice: number, currentTax: number) {
    const currentTotal = parseFloat((currentPrice + currentTax).toFixed(2));
    return currentTotal;
  }
  async replaceItemTotalSymbol(itemTotalText: string | null) {
    const itemTotalValue = parseFloat(itemTotalText?.replace('Item total: $', '') || '0');
    return itemTotalValue;
  }
  async replaceTaxSymbol(taxText: string | null) {
    const taxValue = parseFloat(taxText?.replace('Tax: $', '') || '0');
    return taxValue;
  }
  async replaceTotalSymbol(totalText: string | null) {
    const totalValue = parseFloat(totalText?.replace('Total: $', '') || '0');
    return totalValue;
  }
  async verifyOverviewDetails(itemTotalValue: number | null, taxValue: number | null, totalValue: number | null, currentItemPrice: number, currentTax: number, currentTotal: number) {
    expect(itemTotalValue).toBeCloseTo(currentItemPrice, 2);
    expect(taxValue).toBeCloseTo(currentTax, 2);
    expect(totalValue).toBeCloseTo(currentTotal, 2);
  }

}
