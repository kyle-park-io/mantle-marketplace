import { test, expect } from '@playwright/test';

test.describe('Platform tabs', () => {
  test('shows mantle, bybit, byreal tabs', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await expect(
      page.getByRole('link', { name: 'mantle', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'bybit', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'byreal', exact: true }),
    ).toBeVisible();
  });

  test('clicking bybit tab navigates to bybit/plugins', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await page.getByRole('link', { name: 'bybit' }).click();
    await expect(page).toHaveURL('/bybit/plugins');
  });
});

test.describe('Category tabs', () => {
  test('shows plugins, skills, mcp tabs', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await expect(
      page.getByRole('link', { name: 'plugins', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'skills', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'mcp', exact: true }),
    ).toBeVisible();
  });

  test('clicking skills tab navigates to mantle/skills', async ({ page }) => {
    await page.goto('/mantle/plugins');
    await page.getByRole('link', { name: 'skills' }).click();
    await expect(page).toHaveURL('/mantle/skills');
  });
});

test.describe('Platform redirect', () => {
  test('/mantle redirects to /mantle/plugins', async ({ page }) => {
    await page.goto('/mantle');
    await expect(page).toHaveURL('/mantle/plugins');
  });
});
