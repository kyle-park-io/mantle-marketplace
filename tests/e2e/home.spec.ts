import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders hero section', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Mantle Agent Marketplace' }),
    ).toBeVisible();
    await expect(page.getByText('Browse and install plugins')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Browse Marketplace' }),
    ).toBeVisible();
  });

  test('Browse Marketplace link goes to mantle/plugins', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Browse Marketplace' }).click();
    await expect(page).toHaveURL('/mantle/plugins');
  });
});
