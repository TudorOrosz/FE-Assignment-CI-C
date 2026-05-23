import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const assertDetailFieldsVisible = async (page: Page) => {
  await expect(page.locator('p.detail-label', { hasText: 'Rating:' })).toBeVisible();
  await expect(page.locator('p.detail-label', { hasText: 'Status:' })).toBeVisible();
  await expect(page.locator('p.detail-label', { hasText: 'Premiered:' })).toBeVisible();
};

test('dashboard: open Science-Fiction show, verify details, then back to dashboard', async ({ page }) => {
  await page.goto('/');

  const sciFiRow = page.locator('section.genre-row', {
    has: page.getByRole('heading', { name: /Science-Fiction/i, level: 2 }),
  });

  await expect(sciFiRow).toBeVisible();
  await sciFiRow.locator('.show-card').nth(3).click();

  await expect(page).toHaveURL(/\/show\/\d+/);
  await assertDetailFieldsVisible(page);

  await page.getByText('TV Maze', { exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('search: searching game shows at least two cards and second result opens details', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search TV shows...');
  await searchInput.fill('game');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/search\?q=game/i);

  const cards = page.locator('.show-card');
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(2);

  await cards.nth(1).click();
  await expect(page).toHaveURL(/\/show\/\d+/);
  await assertDetailFieldsVisible(page);
});

test('search: gibberish query shows no results message', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search TV shows...');
  await searchInput.fill('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/search\?q=zzzzzzzzzzzzzzzzzzzzzzzzzzzzz/);
  await expect(page.getByText('No results found for your query.')).toBeVisible();
});