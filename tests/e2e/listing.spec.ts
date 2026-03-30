import { test, expect } from '@playwright/test';

test.describe('Category listing page', () => {
  test('shows item cards on mantle/plugins', async ({ page }) => {
    await page.goto('/mantle/plugins');
    const cards = page.locator('a[href*="/mantle/plugins/"]');
    await expect(cards.first()).toBeVisible();
  });

  test('shows OFFICIAL badge on official items', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await expect(page.getByText('✓ OFFICIAL').first()).toBeVisible();
  });

  test('shows search input', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
  });

  test('shows no items message on empty category', async ({ page }) => {
    await page.goto('/bybit/plugins');
    await expect(page.getByText('No items found.')).toBeVisible();
  });
});

test.describe('Item detail page', () => {
  test('shows item name and install command', async ({ page }) => {
    await page.goto('/mantle/plugins');
    const firstCard = page.locator('a[href*="/mantle/plugins/"]').first();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.getByText('claude install').first()).toBeVisible();
  });

  test('copy button is visible on detail page', async ({ page }) => {
    await page.goto('/mantle/plugins');
    const firstCard = page.locator('a[href*="/mantle/plugins/"]').first();
    const href = await firstCard.getAttribute('href');
    await page.goto(href!);
    await expect(page.getByRole('button', { name: 'Copy' })).toBeVisible();
  });

  test('shows not found page on unknown slug', async ({ page }) => {
    await page.goto('/mantle/plugins/nonexistent-slug');
    await expect(page.getByText('404')).toBeVisible();
  });
});
