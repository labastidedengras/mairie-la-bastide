# Site officiel de La Bastide d’Engras

Site de la mairie, réalisé avec Next.js. Il rassemble les informations et services de la commune : actualités, vie municipale, associations, démarches pratiques, contact et pré-demandes de réservation du foyer communal. Les actualités, associations et comptes-rendus sont gérés dans Sanity ; les formulaires envoient leurs demandes par e-mail via Resend.

## Lancer en local

Prérequis : Node.js 20.9 ou plus récent et npm.

1. Installer les dépendances : `npm ci`
2. Créer `.env.local` à la racine avec les variables ci-dessous.
3. Démarrer le site : `npm run dev`
4. Ouvrir <http://localhost:3000>

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
# Facultatif : la valeur par défaut est 2026-06-08
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-08
# Facultatif : utilisé pour les métadonnées et le sitemap
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
SANITY_REVALIDATE_SECRET=
```

| Variable                                                      | Usage                                                                                                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Identifiants du projet et du dataset Sanity ; nécessaires au site et au Studio.                                 |
| `NEXT_PUBLIC_SANITY_API_VERSION`                              | Version de l’API Sanity ; facultative (valeur par défaut : `2026-06-08`).                                       |
| `NEXT_PUBLIC_SITE_URL`                                        | URL canonique du site ; facultative (par défaut : `https://www.mairie-labastidedengras.fr`).                    |
| `RESEND_API_KEY`                                              | Clé API Resend, nécessaire à l’envoi des formulaires de contact et de réservation.                              |
| `SANITY_REVALIDATE_SECRET`                                    | Secret partagé avec le webhook Sanity qui appelle `POST /api/revalidate`, avec l’en-tête `x-revalidate-secret`. |

Ne pas commiter `.env.local` ni les secrets. Après modification d’une variable dans Netlify, relancer un déploiement.

## Déploiement sur Netlify

Le dépôt ne contient pas de `netlify.toml` : les paramètres de déploiement se gèrent dans Netlify. Lier le dépôt Git au site Netlify, choisir la branche de production souhaitée et laisser Netlify détecter Next.js. La commande de build est `npm run build` ; Netlify gère l’adaptateur Next.js et la sortie, sans répertoire de publication statique à configurer manuellement. Les déploiements suivent les pushes selon les branches configurées dans Netlify.

Renseigner dans **Site configuration → Environment variables** les variables listées plus haut, en particulier les identifiants Sanity et `RESEND_API_KEY`. Pour actualiser le contenu à sa publication, configurer dans Sanity un webhook `POST` vers `https://<domaine-du-site>/api/revalidate` et transmettre le même `SANITY_REVALIDATE_SECRET` dans l’en-tête `x-revalidate-secret`.

## Gérer le contenu (Sanity)

Ouvrir `https://<domaine-du-site>/studio` et se connecter avec un compte autorisé sur le projet Sanity. Le Studio est intégré au site ; les schémas de contenu se trouvent dans `sanity/schemaTypes/` et sa navigation dans `sanity/structure.ts`. Les documents principaux sont les actualités, les associations et les comptes-rendus municipaux.

Pour travailler sur le Studio localement, démarrer le site (`npm run dev`) puis ouvrir <http://localhost:3000/studio>. Les identifiants Sanity du fichier `.env.local` doivent être ceux du projet et du dataset à utiliser.

## Commandes utiles

- `npm run lint` : vérifier le code avec ESLint.
- `npm run build` : construire le site pour la production.
- `npm run start` : servir localement le build après `npm run build`.
