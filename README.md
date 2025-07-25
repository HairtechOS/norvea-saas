## 🎨 Design System Norvea

Toutes les règles graphiques, UI et UX sont centralisées dans [design-system-norvea.md](./design-system-norvea.md).
Merci de le consulter avant toute création ou modification d’interface. 

[![Visual Tests by Chromatic](https://www.chromatic.com/badge?appId=VOTRE_APP_ID)](https://www.chromatic.com/)

## 🖼️ Tests visuels automatisés

Ce projet utilise [Chromatic](https://www.chromatic.com/) pour valider automatiquement l’UI de tous les composants Storybook à chaque Pull Request.

- Les différences visuelles sont détectées automatiquement.
- La validation se fait en ligne avant chaque merge.
- Pour activer Chromatic, créez un compte sur chromatic.com, connectez le repo et ajoutez le token dans les secrets GitHub (`CHROMATIC_PROJECT_TOKEN`). 

## 📚 Conventions de nommage et structure

Toutes les conventions de nommage, structure de dossiers, modèles, routes et composants sont centralisées dans [CONVENTIONS.md](./CONVENTIONS.md).
Merci de le consulter et de le respecter avant toute création ou modification. 

## 🏛️ Gouvernance du projet

Toutes les règles de gouvernance (désaccords, breaking changes, onboarding, scalabilité, priorisation) sont centralisées dans [GOUVERNANCE.md](./GOUVERNANCE.md).
Merci de le consulter pour toute question de process ou d’arbitrage. 

## 🐳 Setup Docker & docker-compose

Pour lancer l'environnement complet en local :

```
docker-compose up --build
```

- Accès backend : http://localhost:4000
- Accès frontend : http://localhost:3000
- Accès PostgreSQL : localhost:5432 (user/pass : norvea)
- Accès Redis : localhost:6379

Pour arrêter :
```
docker-compose down
``` 

## 📊 Monitoring (Prometheus & Grafana)

- Accès Prometheus : http://localhost:9090
- Accès Grafana : http://localhost:3001 (admin/admin)
- Dashboard par défaut : ajouter Prometheus comme datasource, importer un dashboard Node.js/Express ou créer le tien.
- Les métriques du backend sont exposées sur /metrics (à instrumenter dans le code Node.js) 

## 🚩 Feature Flags (LaunchDarkly)

- Configurez votre compte LaunchDarkly (https://launchdarkly.com/)
- Ajoutez la clé SDK backend dans `backend/.env` (`LAUNCHDARKLY_SDK_KEY`)
- Ajoutez la clé client frontend dans `frontend/.env` (`NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID`)
- Exemple d'utilisation backend :
  ```ts
  import { isFeatureEnabled } from './utils/featureFlags';
  const enabled = await isFeatureEnabled('nouvelle-feature', { key: userId });
  ```
- Exemple d'utilisation frontend :
  ```ts
  import { useFeatureFlag } from '../utils/featureFlags';
  const enabled = useFeatureFlag('nouvelle-feature', { key: userId });
  ``` 