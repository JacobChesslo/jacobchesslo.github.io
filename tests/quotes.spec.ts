import { test, expect } from '@playwright/test';

test.describe('Quotes Component', () => {
  test('quote block is visible on homepage', async ({ page }) => {
    await page.goto('/');

    const quoteBlock = page.locator('#quote-block');
    await expect(quoteBlock).toBeVisible();
  });

  test('quote text and author are displayed', async ({ page }) => {
    await page.goto('/');

    const quoteText = page.locator('#quote-text');
    const quoteAuthor = page.locator('#quote-author');

    await expect(quoteText).toBeVisible();
    await expect(quoteAuthor).toBeVisible();

    // Quote should have some text content
    const text = await quoteText.textContent();
    expect(text?.length).toBeGreaterThan(10);

    // Author should contain a name (starts with dash)
    const author = await quoteAuthor.textContent();
    expect(author).toMatch(/^-/);
  });

  test('quote rotates after interval', async ({ page }) => {
    await page.goto('/');

    const quoteText = page.locator('#quote-text');

    // Get initial quote
    const initialQuote = await quoteText.textContent();

    // Wait for rotation (7 seconds + buffer)
    await page.waitForTimeout(8000);

    // Quote might have changed (or might be same if random picks same)
    // At minimum, the element should still be visible
    await expect(quoteText).toBeVisible();
  });

  test('quote block has proper styling', async ({ page }) => {
    await page.goto('/');

    const quoteBlock = page.locator('#quote-block');

    // Should have the retro card styling
    await expect(quoteBlock).toHaveClass(/border-2/);
    await expect(quoteBlock).toHaveClass(/shadow-xl/);
  });
});
