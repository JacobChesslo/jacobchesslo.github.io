import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.locator('#nav-toggle');
    await expect(menuButton).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/');

    const menuButton = page.locator('#nav-toggle');
    const mobileMenu = page.locator('#nav-mobile');

    // Menu should be closed initially (no 'open' class)
    await expect(mobileMenu).not.toHaveClass(/open/);

    // Click to open
    await menuButton.click();
    await expect(mobileMenu).toHaveClass(/open/);

    // Click to close
    await menuButton.click();
    await expect(mobileMenu).not.toHaveClass(/open/);
  });

  test('can navigate using mobile menu', async ({ page }) => {
    await page.goto('/');

    // Open mobile menu
    await page.locator('#nav-toggle').click();

    // Click About link in mobile menu (anchor to /#about)
    await page.locator('#nav-mobile').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL(/#about/);
  });

  test('mobile menu contains nav links', async ({ page }) => {
    await page.goto('/');

    await page.locator('#nav-toggle').click();

    const mobileMenu = page.locator('#nav-mobile');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Experience' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('page content is readable on mobile', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    const quoteBlock = page.locator('#quote-block');
    await expect(quoteBlock).toBeVisible();
  });
});

test.describe('Tablet Navigation', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test('navigation is visible at tablet size', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#site-nav');
    await expect(nav).toBeVisible();
  });
});
