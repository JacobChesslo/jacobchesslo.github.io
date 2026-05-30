import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.locator('#mobile-menu-btn');
    await expect(menuButton).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');

    // Menu should be hidden initially
    await expect(mobileMenu).toHaveClass(/hidden/);

    // Click to open
    await menuButton.click();
    await expect(mobileMenu).not.toHaveClass(/hidden/);

    // Click to close
    await menuButton.click();
    await expect(mobileMenu).toHaveClass(/hidden/);
  });

  test('can navigate using mobile menu', async ({ page }) => {
    await page.goto('/');

    // Open mobile menu
    await page.locator('#mobile-menu-btn').click();

    // Click About link in mobile menu
    await page.locator('#mobile-menu').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL(/about/);
  });

  test('mobile theme selector works', async ({ page }) => {
    await page.goto('/');

    // Open mobile menu
    await page.locator('#mobile-menu-btn').click();

    // Find mobile theme selector
    const themeSelect = page.locator('#theme-select-mobile');
    await expect(themeSelect).toBeVisible();

    // Change to light theme
    await themeSelect.selectOption('light');

    // Check body has light theme class
    await expect(page.locator('body')).toHaveClass(/theme-light/);
  });

  test('page content is readable on mobile', async ({ page }) => {
    await page.goto('/');

    // Check that main heading is visible and not cut off
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check quote block is visible
    const quoteBlock = page.locator('#quote-block');
    await expect(quoteBlock).toBeVisible();
  });
});

test.describe('Tablet Navigation', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test('navigation adapts to tablet size', async ({ page }) => {
    await page.goto('/');

    // At 768px (md breakpoint), should show desktop nav
    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).toBeVisible();
  });
});
