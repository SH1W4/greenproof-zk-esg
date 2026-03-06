import { test, expect } from '@playwright/test';

/**
 * GreenProof Landing Page E2E Tests
 * Hardened for slow/heavy environments (3D, Framer Motion, SSR hydration).
 */

test.describe('GreenProof Landing Page Sanity', () => {

  test('should load the landing page and show the hero title', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`BROWSER ERROR: ${msg.text()}`);
    });

    await page.goto('/');

    // Wait for the SSR/dynamic-import hydration overlay to disappear
    await expect(page.getByText('Syncing Reality...')).not.toBeVisible({ timeout: 45000 });

    // Verify brand presence
    const brand = page.getByText('GREENPROOF', { exact: false });
    await expect(brand.first()).toBeVisible({ timeout: 20000 });
  });


  test('should navigate to /login on "Access Protocol" click', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`BROWSER ERROR: ${msg.text()}`);
    });

    await page.goto('/');

    // Wait for the layout to be interactive (hydration + 3D assets)
    await expect(page.getByText('Syncing Reality...')).not.toBeVisible({ timeout: 45000 });

    // There are multiple /login links (nav + hero CTA). Use the NAV one which is always visible.
    // The nav bar has a fixed position link: class hidden md:flex
    const navLoginLink = page.locator('nav a[href="/login"]');
    await expect(navLoginLink).toBeVisible({ timeout: 20000 });

    await navLoginLink.click();

    // Generous timeout: SSR middleware + network round-trip
    await expect(page).toHaveURL(/\/login/, { timeout: 30000 });
  });

});
