import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';
import { PrecheckoutPage } from './PrecheckoutPage';
import { OverViewPage } from './OverViewPage';

const username = 'standard_user';
const password = 'secret_sauce';
let hp_backpackPrice: string = '$0.00';
let hp_bikeLightPrice: string = '$0.00';

test.describe('@swagtest Swag Labs e2e flow', () => {
  test('Verify e2e payment flow', async ({ page }) => {
      await test.step('Login to Swag Labs', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
      });
      await test.step('Add items to cart and verify cart count', async () => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.buyBackpack();
        await inventoryPage.buyBikeLight();
        hp_backpackPrice = await inventoryPage.collectBackpackPrice();
        hp_bikeLightPrice = await inventoryPage.collectBikeLightPrice();
        await inventoryPage.verifyCartCount();
        await inventoryPage.verifyRemoveButtons();
      });
      await test.step('Verify cart items and prices', async () => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.verify_cart_items();
        await cartPage.verify_backpack_item();
        await cartPage.verify_backpack_price();
        await cartPage.verify_bike_light_item();
        await cartPage.verify_bike_light_price();
      });
      await test.step('Verify cart item details on checkout page', async () => {
        const precheckoutPage = new PrecheckoutPage(page);
        await precheckoutPage.clickCheckout();
        await precheckoutPage.fillText();
        await precheckoutPage.clickContinue();
      });
      await test.step('Verify checkout overview details', async () => {
        const overViewPage = new OverViewPage(page);
        const itemTotalText = await overViewPage.getItemTotal();
        const taxText = await overViewPage.getTax();
        const totalText = await overViewPage.getTotal();
        const currentItemPrice = await overViewPage.getItemCurrentPrice(hp_backpackPrice, hp_bikeLightPrice);
        const currentTax = await overViewPage.getCurrentTax(currentItemPrice);
        const currentTotal = await overViewPage.getCurrentTotal(currentItemPrice, currentTax);
        const itemTotalValue = await overViewPage.replaceItemTotalSymbol(itemTotalText);
        const taxValue = await overViewPage.replaceTaxSymbol(taxText);
        const totalValue = await overViewPage.replaceTotalSymbol(totalText);
        await overViewPage.verifyOverviewDetails(itemTotalValue, taxValue, totalValue, currentItemPrice, currentTax, currentTotal);
      });
  });   
});
