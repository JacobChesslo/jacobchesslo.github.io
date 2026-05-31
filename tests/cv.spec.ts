import { test, expect } from '@playwright/test';

test.describe('CV Page', () => {
  test('CV page loads correctly', async ({ page }) => {
    await page.goto('/cv');

    await expect(page).toHaveTitle(/CV/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('CV content is rendered from markdown', async ({ page }) => {
    await page.goto('/cv');

    const cvBody = page.locator('.cv-md-body');
    await expect(cvBody).toContainText(/Jacob S Chesslo/i);
    await expect(cvBody).toContainText(/Professional and Research Interests/i);
    await expect(cvBody).toContainText(/Education/i);
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

    const cvBody = page.locator('.cv-md-body');
    await expect(cvBody).toBeVisible();

    const h2Elements = page.locator('.cv-md-body h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);
  });
});

test.describe('CV Page Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('CV is readable on mobile', async ({ page }) => {
    await page.goto('/cv');

    await expect(page.locator('h1')).toBeVisible();

    const cvBody = page.locator('.cv-md-body');
    await expect(cvBody).toBeVisible();

    const downloadButton = page.getByRole('link', { name: /Download PDF/i });
    await expect(downloadButton).toBeVisible();
  });
});
