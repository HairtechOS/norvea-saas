# 🎨 Design System Norvea (v1.1)

## 🟣 Philosophie & Image de Marque
Norvea vise une image premium, légère, élégante et bienveillante. L’interface doit inspirer confiance, modernité et simplicité, tout en restant chaleureuse et accessible. Les messages sont toujours positifs et rassurants (ex : « Bravo, RDV ajouté ! »).

---

## 🟡 Palette de Couleurs
:root {
  --color-bg-main: #FAF7F2;        /* Blanc cassé principal */
  --color-bg-accent: #F5EBDD;      /* Beige clair secondaire */
  --color-bg-separator: #ECE8E1;   /* Gris clair doux pour séparations */
  --color-primary: #82A8DD;        /* Bleu doux pour actions principales */
  --color-primary-hover: #6797D1;  /* Bleu doux plus intense (hover) */
  --color-accent: #E4D4BC;         /* Beige accent hover/secondaire */
  --color-alert: #F5C48D;          /* Orange doux pour alertes/informations */
  --color-success: #A6D6B4;        /* Vert succès doux */
  --color-error: #F5A9A9;          /* Rouge erreur doux */
  --color-warning: #FFF3CD;        /* Jaune alerte doux */
  --color-text-main: #222225;      /* Texte principal anthracite */
  --color-text-secondary: #86868C; /* Texte secondaire gris doux */
}

---

## 🔤 Typographies
- Police principale : Inter (Google Fonts)
- Alternatives : Roboto, Nunito
- Tailles standards :
  - H1 : 2rem (32px)
  - H2 : 1.5rem (24px)
  - H3 : 1.2rem (19px)
  - Texte courant : 1rem (16px)
  - Texte secondaire : 0.875rem (14px)

---

## 🖼️ Icônes
- Bibliothèques : Phosphor Icons ou Lucide Icons
- Style : lignes simples, arrondies, colorées discrètes (jamais flashy)
- Utilisation : toujours accompagnées de texte (navbar ouverte) ou tooltips (navbar fermée)
- Tailles : 24px (navbar/menus), 20px (listes/tables)

---

## 🏗️ Layout & Structure
- Fond global : blanc cassé ou beige clair
- Navbar verticale : fond blanc cassé, icônes Phosphor/Lucide, état actif bleu doux, repliable (icônes seules)
- Header : fond transparent ou blanc cassé, ombre subtile, éléments espacés
- Cartes/sections : arrondis doux (8px), ombre subtile, marges généreuses (min 16px)
- Responsive : navbar repliée sur mobile/tablette, header compact, composants adaptés au tactile

---

## 🧩 UI Kit (Composants de base)
- **Boutons** :
  - Primaire : fond bleu doux, texte blanc, arrondis 8px, shadow subtil
  - Hover : bleu plus intense
  - Disabled : gris doux
  - Secondaire : fond beige clair, texte anthracite, bordure fine, hover beige soutenu
- **Inputs** : fond blanc, bordure gris clair, coins arrondis, placeholder gris doux
- **Cartes** : arrondis 8px, ombre subtile, marges internes généreuses
- **Tableaux/Lists** : header sticky, actions rapides, pagination claire, sélection multiple
- **Badges** : statuts, notifications, catégories, couleurs accent
- **Menus** : navbar verticale, header, dropdowns, menus contextuels
- **Notifications/Toasts** : badge coloré, aperçu en hover, types succès/erreur/warning/info
- **Modals/Popovers** : fenêtre centrée, validation explicite avant action critique
- **Barre de recherche** : suggestions instantanées, accès clavier

---

## 🎬 Comportements & Micro-interactions
- Transitions douces (0.2–0.3s) sur hover, clic, open/close
- Hover/Active : changement doux de couleur, légère élévation/ombre pour le focus
- Feedback utilisateur immédiat : toasts, badges, animations subtiles après chaque action
- Skeletons/loaders élégants pour les états de chargement (jamais d'écran vide)

---

## 🛡️ Responsive & Accessibilité
- Responsive obligatoire (mobile/tablette/desktop)
- Navbar repliée sur petit écran (burger menu)
- Header compact sur mobile
- Composants dimensionnés pour le tactile
- Contraste AA minimum sur textes et boutons importants
- Taille de texte ajustable
- Navigation clavier complète, focus visible

---

## 🧠 Ergonomie & Guidelines
- Jamais plus de 2–3 niveaux de menu
- Champ obligatoire signalé (* rouge doux)
- Erreur explicite et positive (“Merci de renseigner l’email”)
- CTA toujours visible à l’écran (pas besoin de scroller)
- Zone de clic confortable (min. 40x40px)
- Tooltips pour chaque icône isolée

---

## 🔔 Notifications
- Cloche en haut à droite, badge notifs non lues, aperçu en hover, centre de notifications complet

---

## 🗣️ Tonalité & Image
- Image premium, légère, élégante, jamais “lourd”
- Tonalité bienveillante, moderne, rassurante
- Exemples de messages : “Bravo, RDV ajouté !”

---

## 🌑 Mode sombre (à anticiper)
- Prévoir des variables et contrastes adaptés pour un futur mode sombre

---

## 📚 Documentation & Process
- Toutes les couleurs, tailles, polices documentées ici et dans Figma/Storybook
- Composants réutilisables : boutons, inputs, cards, notifications, menus
- Toute modification graphique validée doit être immédiatement intégrée ici
- Avant tout lancement de design ou code, relire et respecter ces règles
- Tout doute = demander confirmation avant d’agir