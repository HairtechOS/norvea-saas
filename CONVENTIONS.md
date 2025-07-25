# 📚 CONVENTIONS Norvea SaaS

## 🟦 Backend

### 📁 Dossiers obligatoires
- backend/
- backend/src/
- backend/src/routes/
- backend/src/controllers/
- backend/src/middlewares/
- backend/prisma/
- backend/src/services/
- backend/src/utils/
- backend/tests/

### 📑 Modèles Prisma obligatoires

**User :**
```prisma
model User {
  id         String   @id @default(uuid())
  email      String   @unique
  passwordHash String
  role       UserRole
  tenantId   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum UserRole {
  ADMIN
  MANAGER
  EMPLOYEE
}
```

**Tenant :**
```prisma
model Tenant {
  id        String   @id @default(uuid())
  name      String
  language  String
  currency  String
  timezone  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

// Ajouter ici les futurs modèles (Product, Appointment, Subscription, Stock, Invoice, Notification, etc.) au fil des sprints.

### 🚏 Routes REST obligatoires

**Authentification :**
- POST   /api/auth/login
- POST   /api/auth/logout
- POST   /api/auth/refresh-token

**Internationalisation :**
- GET    /api/i18n/config/:tenantId
- POST   /api/i18n/config

// Ajouter ici les routes CRM, produits, planning, RH, stock, facturation, notifications, etc. au fil des sprints.

### 🧑‍💻 Règles de nommage backend
- Variables/fonctions : camelCase explicite (anglais uniquement)
- Classes/modèles : PascalCase explicite (anglais uniquement)
- Fichiers : snake_case explicite
- Interdiction absolue des noms génériques (data, obj, temp, etc.)

### 🔐 Sécurité & gestion d’erreurs
- Middleware JWT obligatoire pour chaque route sécurisée
- Chiffrement bcrypt obligatoire pour les mots de passe
- WAF Cloudflare et Rate Limiting obligatoires pour toute API REST
- Gestion d’erreurs standardisée (format JSON, messages explicites, logs Sentry)
- Validation stricte des entrées utilisateur (express-validator ou équivalent)
- RGPD : anonymisation/suppression automatique des données sensibles

### 🧪 Tests & CI/CD
- Tests unitaires backend (Jest) obligatoires pour chaque module
- Tests d’intégration automatisés (Supertest)
- Pipeline CI/CD GitHub Actions obligatoire (lint, test, audit sécurité, build, déploiement)
- Audit sécurité régulier (npm audit, Snyk, Dependabot)
- Monitoring/observabilité : Sentry, Prometheus, Grafana, ELK
- Backups PostgreSQL quotidiens automatisés
- Feature flags (LaunchDarkly/Unleash) pour tout déploiement progressif

### 📝 Documentation backend
- Swagger/OpenAPI pour toute API REST
- Docusaurus pour la documentation technique globale
- README à jour pour chaque module

### 🏷️ Structure des commits
- type(scope): description claire (ex : feat(auth): add JWT login route)

---

## 🟩 Frontend

### 📁 Dossiers obligatoires
- frontend/
- frontend/src/components/
- frontend/src/pages/
- frontend/src/hooks/
- frontend/src/context/
- frontend/src/utils/
- frontend/src/styles/
- frontend/tests/

### 🧩 Composants React obligatoires (Sprint 1)
- ButtonNorvea
- LoginForm
- LanguageCurrencySelector
// Ajouter ici les composants par sprint (ex : ClientCard, ProductList, AppointmentCalendar, NotificationBell, etc.)

### 🎨 Règles de nommage frontend
- Composants React : PascalCase explicite (anglais uniquement)
- Props/variables : camelCase explicite (anglais uniquement)
- Interdiction absolue des noms génériques (data, temp, obj, etc.)

### ♿️ Accessibilité & UI
- Respect strict du design system (voir design-system-norvea.md)
- Contraste AA minimum, navigation clavier, focus visible
- Responsive obligatoire (mobile/tablette/desktop)
- Storybook obligatoire pour chaque composant UI
- Tests visuels automatisés (Chromatic)

### 🧪 Tests & CI/CD
- Tests unitaires frontend (Jest, React Testing Library)
- Tests E2E automatisés (Playwright/Cypress)
- Pipeline CI/CD GitHub Actions obligatoire (lint, test, audit sécurité, build, déploiement)
- Audit Lighthouse régulier (SEO, accessibilité, performance)

### 📝 Documentation frontend
- Storybook pour tous les composants UI
- README à jour pour chaque module

### 🏷️ Structure des commits
- type(scope): description claire (ex : feat(login): add LoginForm component)

---

## 🛣️ Règles générales strictes
- Langue du code obligatoire : anglais uniquement (variables, fonctions, commentaires)
- Nommage précis, explicite, interdiction absolue des noms génériques
- Gestion des erreurs backend/frontend standardisée obligatoire
- Middleware JWT obligatoire pour chaque route backend sécurisée
- Chiffrement bcrypt obligatoire (passwords)
- Sécurité API avancée obligatoire explicite (WAF Cloudflare, Rate Limiting)
- Tests unitaires automatisés backend (Jest) et frontend (Playwright/Cypress) obligatoires
- Structure commits explicite : type(scope): description précise
- Tout nouveau code obligatoirement commenté explicitement (fonction complexe, composant réutilisable)
- Toute modification ou ajout validée exclusivement via Pull Request
- Toute nouvelle entité immédiatement ajoutée ici avant merge
- Respect strict impératif de ce fichier par tous les contributeurs (humains ou IA)
- Mise à jour continue de ce fichier à chaque évolution du projet (nouveau modèle, route, composant, règle, etc.) 