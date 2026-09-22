# Archiva – Workshop Prosit 1/7 (HTML + CSS)

Projet réalisé en **HTML et CSS natifs uniquement** (aucune librairie CSS, aucun JavaScript).

## Lancer le projet
Ouvrir le dossier dans VS Code, puis cliquer sur **Go Live** (ou ouvrir `index.html` dans le navigateur).

## Structure
```
workshop1/
├── index.html          Accueil (hero + meilleurs CERs)
├── cers.html           Tous les CERs (recherche + filtre)
├── favoris.html        Mes CERs favoris
├── mes-cers.html       Gestion de CER (Tous mes CERs)
├── ajouter-cer.html    Formulaire d'ajout d'un CER
├── connexion.html      Connexion (sans en-tête, fond dégradé)
├── inscription.html    Création de compte (sans en-tête, fond dégradé)
├── styles/styles.css   Feuille de style unique
└── assets/images/      Logo, images des cartes, illustrations (SVG)
```

## Bonnes pratiques appliquées
- **DRY** : variables CSS (`:root`) pour couleurs / rayons / espacements ; chaque composant
  (`.btn`, `.search`, `.form`, `.cer-card`, `.cer-grid`, `.header`, `.footer`) est défini une seule
  fois et réutilisé sur toutes les pages.
- **BEM** : `bloc__element--modifieur` (ex. `cer-card__title`, `nav__link--active`, `btn--primary`).
- **Troncature de la description** faite en CSS (`line-clamp`), le HTML garde le texte complet.
- **Responsive** : media queries à 900px (menu burger, grille 2 colonnes) et 600px (1 colonne).
- **Menu mobile et bouton favori sans JS** : case à cocher masquée + sélecteur `:checked`.

## Remplacer les images
Les images sont des illustrations SVG de remplacement. Pour utiliser les visuels de la maquette
Figma, exportez-les dans `assets/images/` et modifiez l'attribut `src` correspondant
(ex. `logo.svg` → `logo.png`).
🔗 Site en ligne : https://archiva-xxxx.vercel.app
📦 Dépôt : https://github.com/mauriceabadoma-commits/Archiva
