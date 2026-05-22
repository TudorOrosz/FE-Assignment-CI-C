import { test, expect } from '@playwright/test';

test('searching for vampires shows at least two cards', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search TV shows...');
  await searchInput.fill('vampire');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/search\?q=vampire/);

  const cards = page.locator('.show-card');
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(2);
});