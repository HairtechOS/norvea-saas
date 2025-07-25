import { test, expect } from '@playwright/test';

test.describe('LoginForm Norvea', () => {
  test('affiche une erreur si email invalide', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('foo');
    await page.getByLabel('Mot de passe').fill('password123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/email valide/i)).toBeVisible();
  });

  test('affiche une erreur si mot de passe trop court', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('test@norvea.com');
    await page.getByLabel('Mot de passe').fill('123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/8 caractères minimum/i)).toBeVisible();
  });

  test('affiche une erreur backend si mauvais identifiants', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('wrong@norvea.com');
    await page.getByLabel('Mot de passe').fill('wrongpass');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/mot de passe incorrect/i)).toBeVisible();
  });

  test('connexion réussie', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('test@norvea.com');
    await page.getByLabel('Mot de passe').fill('password123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/connexion réussie/i)).toBeVisible();
  });

  test('accessibilité du formulaire', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Mot de passe')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });
}); 