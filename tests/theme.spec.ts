import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('default theme is applied', async ({ page }) => {
    await page.goto('/');
    // Theme select should show 'Auto' by default
    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      await expect(themeSelect).toHaveValue('system');
    }
  });

  test('can switch to light theme', async ({ page }) => {
    await page.goto('/');

    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      await themeSelect.selectOption('light');
      await expect(page.locator('body')).toHaveClass(/theme-light/);
    }
  });

  test('can switch to dark theme', async ({ page }) => {
    await page.goto('/');

    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      await themeSelect.selectOption('dark');
      await expect(page.locator('body')).toHaveClass(/theme-dark/);
    }
  });

  test('theme persists across page navigation', async ({ page }) => {
    await page.goto('/');

    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      // Set light theme
      await themeSelect.selectOption('light');
      await expect(page.locator('body')).toHaveClass(/theme-light/);

      // Navigate to another page
      await page.getByRole('link', { name: 'About' }).first().click();
      await expect(page).toHaveURL(/about/);

      // Theme should still be light
      await expect(page.locator('body')).toHaveClass(/theme-light/);
    }
  });

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/');

    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      // Set dark theme
      await themeSelect.selectOption('dark');
      await expect(page.locator('body')).toHaveClass(/theme-dark/);

      // Reload page
      await page.reload();

      // Theme should still be dark
      await expect(page.locator('body')).toHaveClass(/theme-dark/);
      await expect(themeSelect).toHaveValue('dark');
    }
  });
});
