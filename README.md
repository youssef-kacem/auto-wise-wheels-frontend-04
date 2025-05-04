
# AutoWise - Plateforme de location de voitures

![AutoWise Logo](/public/lovable-uploads/9524452a-d5e6-4363-8bfa-1b7f6dd5d92b.png)

Bienvenue sur le dépôt du frontend d'**AutoWise**, une application web complète de location de voitures développée avec React et Tailwind CSS.

## Fonctionnalités

- **Page d'accueil** présentant l'agence et ses services
- **Liste des voitures disponibles** avec filtres (marque, climatisation, chauffeur, âge, dates)
- **Page détaillée** pour chaque voiture avec photos, description et options
- **Interface d'authentification** (inscription, connexion, réinitialisation de mot de passe)
- **Espace utilisateur** pour la gestion des réservations et des informations personnelles
- **Interface de réservation** pour choisir les dates, options et confirmer la réservation
- **Design responsive** adapté à tous les appareils

## Technologies utilisées

- React
- Tailwind CSS
- TypeScript
- React Router DOM
- Lucide React (icônes)
- Date-fns (gestion des dates)

## Structure du projet

```
src/
├── components/            # Composants réutilisables
│   ├── auth/              # Composants liés à l'authentification
│   ├── booking/           # Composants liés à la réservation
│   ├── cars/              # Composants liés aux voitures
│   ├── home/              # Composants de la page d'accueil
│   ├── layout/            # Composants de mise en page
│   ├── ui/                # Composants d'interface utilisateur
│   └── user/              # Composants liés à l'espace utilisateur
├── hooks/                 # Hooks personnalisés
├── lib/                   # Fonctions utilitaires
└── pages/                 # Pages principales de l'application
```

## Installation et lancement

Pour installer et lancer le projet en local, suivez ces étapes :

```bash
# Cloner le dépôt
git clone <URL_DU_DEPOT>
cd autowise-frontend

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

L'application sera accessible à l'adresse http://localhost:8080

## Connexion à une API backend

Ce frontend est conçu pour se connecter à une API Strapi. Pour configurer l'URL de l'API, veuillez modifier le fichier de configuration approprié.

## Déploiement

Pour créer une version de production optimisée :

```bash
npm run build
```

Les fichiers statiques seront générés dans le dossier `dist/`.

## Captures d'écran

*Des captures d'écran peuvent être ajoutées ici.*

## Auteur

AutoWise Team - [contact@autowise.fr](mailto:contact@autowise.fr)

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
