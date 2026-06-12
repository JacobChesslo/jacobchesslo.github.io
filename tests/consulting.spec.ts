import { test, expect } from '@playwright/test';

test.describe('Consulting funnel', () => {
  test('hub lists both practices and links to them', async ({ page }) => {
    await page.goto('/consulting');
    await expect(page.locator('h1').first()).toContainText(/work together/i);
    await expect(page.locator('a[href="/consulting/science"]').first()).toBeAttached();
    await expect(page.locator('a[href="/consulting/lifestyle"]').first()).toBeAttached();
  });

  test('science page loads with pitch, proof, and a working contact path', async ({ page }) => {
    await page.goto('/consulting/science');
    await expect(page.locator('.page-title')).toContainText(/Research code/i);
    // Reveal-gated, so assert presence rather than visibility
    await expect(page.locator('.proof-band')).toBeAttached();
    await expect(page.locator('a[href^="mailto:jacobchesslo@gmail.com"]').first()).toBeAttached();
    await expect(page.locator('.cta-copy')).toBeAttached();
  });

  test('lifestyle page loads with pitch and a working contact path', async ({ page }) => {
    await page.goto('/consulting/lifestyle');
    await expect(page.locator('.page-title')).toContainText(/your world/i);
    await expect(page.locator('a[href^="mailto:jacobchesslo@gmail.com"]').first()).toBeAttached();
    await expect(page.locator('.cta-copy')).toBeAttached();
  });

  test('homepage funnels visitors toward consulting', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-availability[href="/consulting"]')).toBeAttached();
    await expect(page.locator('#consulting-cta a[href="/consulting/science"]')).toBeAttached();
    await expect(page.locator('#consulting-cta a[href="/consulting/lifestyle"]')).toBeAttached();
  });

  test('both pages answer objections via an interactive FAQ', async ({ page }) => {
    for (const path of ['/consulting/science', '/consulting/lifestyle']) {
      await page.goto(path);
      // Neutralize smooth-scroll: the FAQ is far below the long scene, and auto-scrolling
      // to click it with smooth behavior can race element stability (esp. WebKit).
      await page.addStyleTag({ content: '*{scroll-behavior:auto!important}' });
      const items = page.locator('.faq-item');
      await expect(items).toHaveCount(4);
      // Native <details>: closed by default, opens on click and reveals its answer
      const first = items.first();
      await expect(first).not.toHaveAttribute('open', /.*/);
      const summary = first.locator('.faq-q');
      await summary.scrollIntoViewIfNeeded();
      await summary.click();
      await expect(first).toHaveAttribute('open', /.*/);
      await expect(first.locator('.faq-a')).toBeVisible();
    }
  });

  test('both pages emit FAQ structured data for rich results', async ({ page }) => {
    for (const path of ['/consulting/science', '/consulting/lifestyle']) {
      await page.goto(path);
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      const faqPage = ld.map((t) => JSON.parse(t)).find((o) => o['@type'] === 'FAQPage');
      expect(faqPage, `FAQPage schema missing on ${path}`).toBeTruthy();
      expect(faqPage.mainEntity).toHaveLength(4);
    }
  });

  test('each consulting page exposes its own OG share image', async ({ page }) => {
    const cases: [string, string][] = [
      ['/consulting', 'consulting.png'],
      ['/consulting/science', 'consulting-science.png'],
      ['/consulting/lifestyle', 'consulting-lifestyle.png'],
    ];
    for (const [path, img] of cases) {
      await page.goto(path);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        new RegExp(img.replace('.', '\\.'))
      );
    }
  });

  test('skip cue jumps past the intro animation to the proof band', async ({ page }) => {
    await page.goto('/consulting/science');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(100);
    await page.evaluate(() => (document.querySelector('.scroll-cue') as HTMLElement).click());
    await page.waitForTimeout(1000); // custom eased scroll settles on the proof band
    const { y, target } = await page.evaluate(() => ({
      y: window.scrollY,
      target: document.getElementById('science-proof')!.offsetTop - 84,
    }));
    expect(Math.abs(y - target)).toBeLessThan(12);
  });

  test('floating CTA shows through the body but steps aside at the final CTA', async ({ page }) => {
    await page.goto('/consulting/science');
    await page.addStyleTag({ content: '*{scroll-behavior:auto!important}' });
    await page.locator('#science-details').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(page.locator('.sticky-cta')).toHaveClass(/visible/);
    await page.locator('.cta-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('.sticky-cta')).not.toHaveClass(/visible/);
  });
});

test.describe('404 page', () => {
  test('unknown routes show the branded 404 with a way back', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.locator('.nf-title')).toContainText(/lost in space/i);
    await expect(page.locator('.nf-actions a[href="/"]')).toBeVisible();
    await expect(page.locator('.nf-actions a[href="/consulting"]')).toBeVisible();
  });
});
