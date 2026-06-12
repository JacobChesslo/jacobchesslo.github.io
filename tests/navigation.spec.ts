import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jacob/i);
    await expect(page.locator('h1').first()).toContainText(/Jacob/i);
  });

  test('all navigation links are in the DOM', async ({ page }) => {
    await page.goto('/');

    // Use href selectors since nav links may be visually hidden on mobile viewports
    for (const href of ['/#about', '/#experience', '/#contact']) {
      await expect(page.locator(`a[href="${href}"]`).first()).toBeAttached();
    }
  });

  test('homepage has all major sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#experience')).toBeAttached();
    await expect(page.locator('#contact')).toBeAttached();
  });

  test('can navigate to CV page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'CV' }).first().click();
    await expect(page).toHaveURL(/cv/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/cv');
    await page.locator('.nav-logo').click();
    await expect(page).toHaveURL('/');
  });
});
