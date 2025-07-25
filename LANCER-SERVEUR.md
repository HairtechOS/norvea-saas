2. Synchronise ton code avec Codespaces via Git
Après chaque modification importante en local :

  git add .
  git commit -m "feat: mon avancement local"
  git push

Dans Codespaces (terminal intégré) :

  git pull

Ou utilise l’interface Git de Codespaces pour “Pull” les changements.
3. Lance les serveurs dans Codespaces
Ouvre un terminal dans Codespaces.
Place-toi à la racine du projet.
Lance :

  docker compose up --build
