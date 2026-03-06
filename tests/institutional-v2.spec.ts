import { test, expect } from '@playwright/test';

test.describe('Institutional Portal V2 - Initial State Validation', () => {
  test('should render the V2 Dashboard with empty/initial state', async ({ page }) => {
    // Navigate to the Institutional Portal
    await page.goto('/v2/dashboard');

    // Wait for the loading state to finish (simulated in the component)
    await page.waitForSelector('h2:has-text("Portfolio Overview")');

    // Check for the "Zeroed" KPI metrics
    const esgScore = page.locator('div:has-text("Total ESG Score") >> text=0');
    await expect(esgScore).toBeVisible();

    const carbonFootprint = page.locator('div:has-text("Carbon Footprint") >> text=0');
    await expect(carbonFootprint).toBeVisible();

    // Verify empty state visualization
    await expect(page.locator('text=No data points detected')).toBeVisible();
    await expect(page.locator('text=No historical activities found')).toBeVisible();
  });

  test('should have a working sidebar navigation', async ({ page }) => {
    await page.goto('/v2/dashboard');
    
    // Check if the sidebar is present
    const sidebar = page.locator('nav');
    await expect(sidebar).toBeVisible();

    // Verify navigation links
    const assetLink = page.locator('a:has-text("Assets")');
    await expect(assetLink).toBeVisible();
    await expect(assetLink).toHaveAttribute('href', '/v2/assets');

    const mintLink = page.locator('a:has-text("Mint RWA")');
    await expect(mintLink).toBeVisible();
    await expect(mintLink).toHaveAttribute('href', '/v2/mint');
  });

  test('should render the Mint RWA interface', async ({ page }) => {
    await page.goto('/v2/mint');
    
    await expect(page.locator('h1:has-text("Mint RWA Token")')).toBeVisible();
    await expect(page.locator('label:has-text("Verification ID")')).toBeVisible();
    await expect(page.locator('button:has-text("MINT RWA TOKEN")')).toBeVisible();
    
    // Verify the Token Preview section
    await expect(page.locator('h3:has-text("RWA Token Preview")')).toBeVisible();
    await expect(page.locator('span:has-text("Institutional Asset")')).toBeVisible();
  });
});
