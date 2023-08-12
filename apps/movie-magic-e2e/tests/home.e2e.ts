import { test, expect } from '@playwright/test';

test('has the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Movie Magic/);
});

test('has the correct heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toHaveText(
    'Top 10 Movies Of All Time'
  );
});

test('has the correct number of movies', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('[data-testid="movie-table"] > tbody > tr')
  ).toHaveCount(10);
});
