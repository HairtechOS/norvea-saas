# 🚀 Onboarding Norvea SaaS

Bienvenue sur Norvea, la plateforme SaaS ultime pour la gestion intelligente des salons de coiffure, barber et beauté !

## 📚 Liens essentiels
- [README.md](./README.md)
- [CONVENTIONS.md](./CONVENTIONS.md)
- [design-system-norvea.md](./design-system-norvea.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [GOUVERNANCE.md](./GOUVERNANCE.md)

## ⚙️ Environnement technique
- Prérequis : Node.js, Docker, npm, Prisma CLI, Flutter (pour mobile), Ruby (pour CocoaPods), etc.
- Cloner le repo, copier `.env.example` en `.env` et compléter les variables.
- Lancer `docker-compose up` pour démarrer les services (PostgreSQL, Redis, etc.).
- Installer les dépendances : `npm install` dans chaque dossier (`backend`, `frontend`).
- Lancer les scripts d’init si besoin (`npm run setup` ou équivalent).

## 🛠️ Contribution
- Fork le repo, crée une branche dédiée (`feat/ma-tache`)
- Développe en respectant [CONVENTIONS.md](./CONVENTIONS.md) et [design-system-norvea.md](./design-system-norvea.md)
- Ajoute tests, doc, stories, commits explicites
- Ouvre une Pull Request avec la checklist PR
- Les tests CI/CD doivent passer avant merge

## 🏁 Workflow idéal pour une première tâche
1. Lire tous les fichiers de référence ci-dessus
2. Installer l’environnement local
3. Prendre une tâche du sprint en cours (voir Notion ou README)
4. Développer, tester, documenter
5. Ouvrir une PR, faire relire, corriger si besoin
6. Merge après validation

## 💬 Support
- Slack/Discord/email : [à compléter]
- En cas de doute, demander confirmation avant d’agir 