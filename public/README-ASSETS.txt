VIDEO HOME — OU ELLE EST ?
===========================
Fichier actuel : public/hero.mp4 (3.9 Mo, "homme qui enfile une veste" — vidéo
libre Mixkit en attendant ta vraie vidéo TikTok).
Elle tourne déjà en plein écran sur l'accueil. Pour mettre TA vidéo :
1) Télécharge une de tes vidéos TikTok @aniissahraoui (10-20s, verticale).
2) Renomme-la hero.mp4 et remplace public/hero.mp4.
3) Relance : npm run dev.

Ordre de lecture du site (voir app/page.tsx) :
  source 1 = /hero.mp4 (ton fichier local — prioritaire)
  source 2 = Admin > Design > "Vidéo hero URL" (secours distant)
  poster   = image homme affichée pendant le chargement.

PRODUITS RÉELS ?
TikTok bloque l'extraction auto. En attendant :
- Fais des captures / enregistre tes vidéos TikTok en photos
- Mets-les dans public/products/ (ex: costume-noir.jpg)
- Va sur /admin (PIN 1234) > Produits > colle l'URL /products/costume-noir.jpg
