# DJOW31 — Boutique Mode Homme 🇩🇿

Boutique by Anis Sahraoui — Next.js + Tailwind. TikTok [@aniissahraoui](https://www.tiktok.com/@aniissahraoui).

## Lancer en local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Pages

| Route | Page |
|---|---|
| `/` | Accueil — vidéo plein écran + best-sellers |
| `/about` | À propos + boutiques sur carte Google Maps |
| `/clothes` | Collection homme (Costumes / Casual / Accessoires) |
| `/my-shops` | Mes boutiques |
| `/admin` | Panneau caché (PIN `1234`) — produits, boutiques, hero, liens |

## Mettre ta vraie vidéo / photos

- Vidéo accueil → remplace `public/hero.mp4`
- Photos produits → `public/products/` puis colle `/products/xxx.jpg` dans `/admin`
- Tout est modifiable sans code dans `/admin` (sauvegardé en local, Export JSON prêt Supabase)

## Déploiement

Déployé sur Vercel : https://djow31.vercel.app
