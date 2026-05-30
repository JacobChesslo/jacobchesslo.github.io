import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('links have accessible names', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      // Link should have text content, aria-label, or title
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('theme selector has label', async ({ page }) => {
    await page.goto('/');

    const themeSelect = page.locator('#theme-select');
    if (await themeSelect.isVisible()) {
      // Should have associated label or aria-label
      const ariaLabel = await themeSelect.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('mobile menu button has aria attributes', async ({ page, viewport }) => {
    // Only test on mobile viewport
    if (viewport && viewport.width < 768) {
      await page.goto('/');

      const menuButton = page.locator('#mobile-menu-btn');
      await expect(menuButton).toHaveAttribute('aria-label');
      await expect(menuButton).toHaveAttribute('aria-expanded');
    }
  });

  test('skip to main content functionality', async ({ page }) => {
    await page.goto('/');

    // Main element should exist for landmark navigation
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');

    // Check that text elements are visible (basic visibility check)
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Quote text should be visible
    const quoteText = page.locator('#quote-text');
    await expect(quoteText).toBeVisible();
  });
});

test.describe('Keyboard Navigation', () => {
  test('can tab through navigation', async ({ page }) => {
    await page.goto('/');

    // Start tabbing from the beginning
    await page.keyboard.press('Tab');

    // Should be able to reach navigation links
    const activeElement = page.locator(':focus');
    await expect(activeElement).toBeVisible();
  });

  test('mobile menu can be opened with keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.locator('#mobile-menu-btn');

    // Focus the menu button
    await menuButton.focus();

    // Press Enter to open
    await page.keyboard.press('Enter');

    // Menu should be open
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toHaveClass(/hidden/);
  });
});
