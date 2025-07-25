# 🏛️ GOUVERNANCE Norvea SaaS

## 1. Désaccord sur une convention ou règle
- Toute modification passe par Pull Request sur `CONVENTIONS.md` ou le design system.
- Le CTO tranche en dernier recours, après consultation de l’équipe.
- La décision est documentée dans la PR ou dans un changelog.

## 2. Gestion des breaking changes (structure/design system)
- Toute breaking change (structure, API, design system) :
  - PR taguée “breaking-change”
  - Changelog et instructions de migration/rollback
  - Validation CTO obligatoire
  - Annonce préalable sur Slack/Notion

## 3. Onboarding nouveau contributeur (humain/IA)
- Lecture et validation de `ONBOARDING.md` (checklist)
- Première tâche test + accompagnement référent
- Accès Slack/Notion, validation après première PR mergée

## 4. Scalabilité base de données dès le MVP
- Multi-tenant (champ tenantId partout, isolation stricte)
- Migrations Prisma, seed volumineux, backup auto
- Réplication/sharding anticipés, documentation technique

## 5. Priorisation bugs vs features
- Criticité évaluée :
  - Bloquant (prod, sécurité, data loss) : priorité absolue, sprint adapté
  - Important : ticket, planifié dans le sprint en cours ou suivant
  - Mineur : ticket, planifié selon la roadmap
- PO/CTO arbitre, décision documentée dans le suivi de sprint (Notion ou README du sprint) 