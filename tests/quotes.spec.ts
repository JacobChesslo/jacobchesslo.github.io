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

  test('quote rotator is wired up', async ({ page }) => {
    await page.goto('/');

    // Verify the quote block has the data attributes the rotator script depends on
    const quoteBlock = page.locator('#quote-block');
    await expect(quoteBlock).toHaveAttribute('data-quotes');
    await expect(quoteBlock).toHaveAttribute('data-initial-index');

    // Quotes array should be non-empty JSON
    const quotesJson = await quoteBlock.getAttribute('data-quotes');
    const quotes = JSON.parse(quotesJson!);
    expect(quotes.length).toBeGreaterThan(0);
  });

  test('quote block has proper styling', async ({ page }) => {
    await page.goto('/');

    // Quote section should be visible with its CSS class
    const quoteSection = page.locator('.quote-section');
    await expect(quoteSection).toBeVisible();

    // Quote block should be inside the section
    const quoteBlock = page.locator('#quote-block');
    await expect(quoteBlock).toBeVisible();
  });
});
