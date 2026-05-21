import { test, expect } from '@playwright/test';

test('1.1 Verify the total price once buy one coffee', async ({ page }) => {
  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[data-sb="Cafe-Latte"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  expect(totalPrice).toBe('Total: $16.00');

});

test('1.2 Verify the total price once buy three coffee', async ({ page }) => {
  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[aria-label="Mocha"]').click();
  await page.locator('[aria-label="Flat White"]').click();
  await page.locator('[aria-label="Cappuccino"]').click();

  await page.locator('[aria-label="Cart page"]').click();
  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  expect(totalPrice).toBe('Total: $45.00');

});

test('1.3 Verify the total price once buy the same kind of coffee 2 unit', async ({ page }) => {
  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[aria-label="Americano"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator('//div[2]/div/button[1]').click();

  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  expect(totalPrice).toBe('Total: $14.00');

});

test('2.1 Verify the total price from first page', async ({ page }) => {

  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[aria-label="Americano"]').click();
  const amaricanoPrice = await page.locator('//h4[text()="Americano "]/small').textContent();
  await page.locator('[aria-label="Cart page"]').click();

  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  expect(totalPrice).toBe(`Total: ${amaricanoPrice}`);
});


test('2.2Verify the total price once buy three coffee', async ({ page }) => {
  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[aria-label="Mocha"]').click();
  const mochaPrice: string = await page.locator('//h4[text()="Mocha "]/small').textContent() || '$0.00';
  await page.locator('[aria-label="Flat White"]').click();
  const flatWhitePrice: string = await page.locator('//h4[text()="Flat White "]/small').textContent() || '$0.00';
  await page.locator('[aria-label="Cappuccino"]').click();
  const cappuccinoPrice: string = await page.locator('//h4[text()="Cappuccino "]/small').textContent() || '$0.00';

  await page.locator('[aria-label="Cart page"]').click();
  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  const currentTotalPrice = `Total: $${(parseFloat(mochaPrice.replace('$', '')) + parseFloat(flatWhitePrice.replace('$', '')) + parseFloat(cappuccinoPrice.replace('$', ''))).toFixed(2)}`;
  expect(totalPrice).toBe(currentTotalPrice);
});




test('2.3Verify the total price once buy the same kind of coffee 2 unit', async ({ page }) => {
  await page.goto('https://seleniumbase.io/coffee/');
  await page.locator('[aria-label="Americano"]').click();
  const amaricanoPrice: string = await page.locator('//h4[text()="Americano "]/small').textContent() || '$0.00';
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator('//div[2]/div/button[1]').click();

  const totalPrice = await page.locator('[aria-label="Proceed to checkout"]').textContent();
  const currentTotalPrice = `Total: $${(parseFloat(amaricanoPrice.replace('$', '')) * 2).toFixed(2)}`;
  expect(totalPrice).toBe(currentTotalPrice);

});



test('Verify the total price once buy three coffee', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
