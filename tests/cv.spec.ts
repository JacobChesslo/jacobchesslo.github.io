import { test, expect } from '@playwright/test';

test.describe('CV Page', () => {
  test('CV page loads correctly', async ({ page }) => {
    await page.goto('/cv');

    await expect(page.locator('h1')).toContainText(/Curriculum Vitae/i);
  });

  test('CV content is rendered from markdown', async ({ page }) => {
    await page.goto('/cv');

    // Check for key sections from the CV markdown
    await expect(page.locator('article')).toContainText(/Jacob S Chesslo/i);
    await expect(page.locator('article')).toContainText(/Professional and Research Interests/i);
    await expect(page.locator('article')).toContainText(/Education/i);
    await expect(page.locator('article')).toContainText(/Experience and Employment/i);
  });

  test('download PDF button is visible', async ({ page }) => {
    await page.goto('/cv');

    const downloadButton = page.getByRole('link', { name: /Download PDF/i });
    await expect(downloadButton).toBeVisible();
  });

  test('download PDF link has correct href', async ({ page }) => {
    await page.goto('/cv');

    const downloadButton = page.getByRole('link', { name: /Download PDF/i });
    await expect(downloadButton).toHaveAttribute('href', '/JacobChessloCV.pdf');
    await expect(downloadButton).toHaveAttribute('download', 'JacobChessloCV.pdf');
  });

  test('CV sections have proper styling', async ({ page }) => {
    await page.goto('/cv');

    // Check that the article container exists
    const article = page.locator('article#cv-content');
    await expect(article).toBeVisible();

    // Check for proper heading hierarchy
    const h2Elements = page.locator('article h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);
  });
});

test.describe('CV Page Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('CV is readable on mobile', async ({ page }) => {
    await page.goto('/cv');

    // Main heading should be visible
    await expect(page.locator('h1')).toBeVisible();

    // Article content should be visible
    const article = page.locator('article#cv-content');
    await expect(article).toBeVisible();

    // Download button should be visible and tappable
    const downloadButton = page.getByRole('link', { name: /Download PDF/i });
    await expect(downloadButton).toBeVisible();
  });
});
