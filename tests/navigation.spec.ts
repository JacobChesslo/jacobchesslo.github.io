import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jacob/i);
    await expect(page.locator('h1')).toContainText(/Welcome/i);
  });

  test('all navigation links are accessible', async ({ page }) => {
    await page.goto('/');

    // Check main nav links exist (desktop or mobile)
    const navLinks = ['Home', 'Work', 'About', 'Projects', 'Contact'];

    for (const linkText of navLinks) {
      const link = page.getByRole('link', { name: linkText }).first();
      await expect(link).toBeVisible();
    }
  });

  test('can navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL(/about/);
    await expect(page.locator('h1')).toContainText(/Jacob Chesslo/i);
  });

  test('can navigate to Work page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Work' }).first().click();
    await expect(page.locator('h1')).toContainText(/Work Experience/i);
  });

  test('can navigate to Projects page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/projects/);
    await expect(page.locator('h1')).toContainText(/Projects/i);
  });

  test('can navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('h1')).toContainText(/Contact/i);
  });

  test('can navigate to CV page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Curriculum Vitae' }).first().click();
    await expect(page).toHaveURL(/cv/);
    await expect(page.locator('h1')).toContainText(/Curriculum Vitae/i);
  });

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about');
    await page
      .getByRole('link', { name: /Jacob Chesslo/i })
      .first()
      .click();
    await expect(page).toHaveURL('/');
  });
});
