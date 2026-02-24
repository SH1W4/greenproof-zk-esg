import { test, expect } from '@playwright/test';

test.describe('GreenProof Landing Page Sanity', () => {
  test('should load the landing page and show the hero title', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER LOG: [${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

    await page.goto('/');
    
    // 1. Wait for hydration (SSR: false fallback to disappear)
    await expect(page.getByText('Syncing Reality...')).not.toBeVisible({ timeout: 30000 });
    
    // DEBUG: Print actual text content found on the page
    const textContent = await page.textContent('body');
    console.log('DEBUG BODY TEXT CONTENT:', textContent?.replace(/\s+/g, ' ').trim().substring(0, 500));

    // 2. Verify high-level brand presence
    const brand = page.getByText('GREENPROOF', { exact: false });
    await expect(brand.first()).toBeVisible({ timeout: 15000 });
  });

  test('should have a functional "Access Protocol" button', async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER LOG: [${msg.type()}] ${msg.text()}`));
    await page.goto('/');
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // 1. Wait for hydration overlay to be COMPLETELY REMOVED from DOM
    // We target the z-[1000] container we added for the overlay
    await expect(page.getByText('Syncing Reality...')).not.toBeVisible({ timeout: 30000 });
    
    // 2. Target the link to /login specifically
    // Using a more lenient approach: find any link containing "Protocol" or pointing to "/login"
    const loginLink = page.locator('a[href="/login"]').first();
    await expect(loginLink).toBeVisible({ timeout: 15000 });
    
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
