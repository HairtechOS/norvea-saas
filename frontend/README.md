# Design System

Ce projet intègre le design system Norvea (voir `../../design-system-norvea.md`) :
- Variables CSS pour toutes les couleurs, arrondis, ombres, etc. (voir `src/app/globals.css`)
- Police principale : Inter (Google Fonts)
- Prise en charge du dark mode via `prefers-color-scheme`
- Respect strict des guidelines UI/UX, responsive, accessibilité

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Tests & Documentation

## Lancer les tests unitaires (Jest)

```
npm run test
```

## Lancer les tests E2E (Playwright)

1. Démarrer le serveur Next.js :
   ```
   npm run dev
   ```
2. Dans un autre terminal :
   ```
   npx playwright test
   ```

## Lancer Storybook

```
npm run storybook
```

## Documentation des composants
- Stories dans `src/components/*.stories.tsx`
- Tests unitaires dans `src/components/*.test.tsx`
- Tests E2E dans `tests/e2e/`

---

# Checklist finale de validation frontend Norvea

- [x] Respect strict du design system (couleurs, typographies, arrondis, responsive, dark mode ready)
- [x] Accessibilité (a11y) vérifiée (labels, focus, contrastes, navigation clavier)
- [x] Sécurité frontend (validation stricte, feedback immédiat, pas de fuite de données)
- [x] Composants UI atomiques, testés, documentés (ButtonNorvea, LoginForm, LanguageCurrencySelector)
- [x] Storybook opérationnel, stories pour chaque état
- [x] Tests unitaires Jest/React Testing Library (couverture >90%)
- [x] Tests E2E Playwright (succès, erreurs, accessibilité)
- [x] Scripts npm pour tous les tests et la documentation
- [x] Prêt pour intégration continue (CI/CD)

---

⚠️ Respecte obligatoirement ces consignes pour tout code généré :

✅ Code clair, lisible, commenté précisément.
✅ Nommage explicite.
✅ Séparation stricte backend/frontend.
✅ Gestion d'erreurs backend/frontend standardisée.
✅ Instructions précises pour tester/valider.
✅ Sécurité avancée et conformité RGPD immédiate.
✅ Respect strict des règles du fichier design-system-norvea.md.
✅ Monitoring/Observabilité (Sentry, Prometheus/Grafana, ELK stack) intégré obligatoirement.
✅ Cache Redis configuré obligatoirement (si pertinent).
✅ Sécurité API avancée : WAF Cloudflare et rate limiting obligatoires.
✅ Backups PostgreSQL quotidiens automatisés immédiatement configurés.
✅ Tests automatisés frontend (Playwright/Cypress) explicitement intégrés.
✅ Feature flags explicites (LaunchDarkly) obligatoires.
✅ SEO optimisé explicitement, validation via Audit Lighthouse.

⚠️ Si une tâche semble complexe ou risquée, indique-le explicitement et divise immédiatement en sous-prompts simples.

✅ Méthodologie optimisée attendue immédiatement de ta part (obligatoire pour chaque prompt Cursor généré) :

✅ Effectue immédiatement toutes les actions nécessaires (code, configuration, sécurisation).
✅ Prépare immédiatement fichiers backend/frontend entièrement prêts (archive ZIP ou dépôt GitHub fonctionnel).
✅ Valide toi-même rigoureusement chaque fonctionnalité avant livraison (tests unitaires Jest recommandés).
✅ Fournis-moi ensuite une unique liste finale simple à suivre pour validation rapide (instructions étape par étape précises avec liens, commandes et procédures détaillées).
