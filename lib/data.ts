export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: 'Costumes' | 'Casual' | 'Accessoires';
  sizes: string[];
  image: string;
  badge?: string;
  description: string;
};

export type Shop = {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  mapUrl: string;
};

export const TIKTOK_URL = 'https://www.tiktok.com/@aniissahraoui';
export const INSTAGRAM_URL = 'https://www.instagram.com/';
export const WHATSAPP_NUMBER = '213000000000';

// VIDEO HOME — ordre de lecture dans app/page.tsx :
// 1) /hero.mp4 (fichier LOCAL à mettre dans public/hero.mp4 — ta vraie vidéo TikTok téléchargée)
// 2) HERO_VIDEO_REMOTE (secours distant, modifiable dans Admin > Design)
export const HERO_VIDEO_LOCAL = '/hero.mp4';
export const HERO_VIDEO_REMOTE =
  'https://assets.mixkit.co/videos/151/151-720.mp4';
export const HERO_POSTER =
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop';

export const PAGE_BACKGROUNDS: Record<string, string> = {
  home: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
  about:
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
  clothes:
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1600&auto=format&fit=crop',
  shops:
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1600&auto=format&fit=crop',
};

// Marché 100% HOMME — remplace les images par tes vraies photos TikTok via /admin
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'h1',
    name: 'Costume Slim Noir',
    price: 18900,
    oldPrice: 21900,
    category: 'Costumes',
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    badge: 'Best-seller',
    description: 'Costume slim deux pièces, veste cintrée + pantalon, tissu premium. Essayage en boutique.',
  },
  {
    id: 'h2',
    name: 'Costume Bleu Nuit',
    price: 19900,
    category: 'Costumes',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    badge: 'Nouveau',
    description: 'Costume bleu nuit, coupe moderne, parfait mariages et soirées.',
  },
  {
    id: 'h3',
    name: 'Chemise Lin Blanche',
    price: 4200,
    category: 'Casual',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    description: 'Chemise lin respirante, coupe regular, col boutonné.',
  },
  {
    id: 'h4',
    name: 'Veste Cuir Homme',
    price: 16500,
    oldPrice: 18900,
    category: 'Casual',
    sizes: ['L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    badge: '-13%',
    description: 'Veste cuir véritable, coupe motard, doublure chaude.',
  },
  {
    id: 'h5',
    name: 'T-Shirt Premium Pack',
    price: 2800,
    category: 'Casual',
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    description: 'T-shirt coton lourd, col rond, plusieurs coloris en boutique.',
  },
  {
    id: 'h6',
    name: 'Jean Slim Stretch',
    price: 5600,
    category: 'Casual',
    sizes: ['30', '32', '34', '36'],
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    description: 'Jean slim stretch, bleu brut, confort toute la journée.',
  },
  {
    id: 'h7',
    name: 'Montre Acier Homme',
    price: 7800,
    category: 'Accessoires',
    sizes: ['Unique'],
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    badge: 'Nouveau',
    description: 'Montre acier, mouvement quartz, étanche, boîte offerte.',
  },
  {
    id: 'h8',
    name: 'Sac Bandoulière Cuir',
    price: 8900,
    category: 'Accessoires',
    sizes: ['Unique'],
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    description: 'Sac cuir véritable, bandoulière réglable, parfait quotidien.',
  },
];

export const DEFAULT_SHOPS: Shop[] = [
  {
    id: 's1',
    name: 'DJOW31 — Centre Alger',
    address: 'Rue Didouche Mourad, Alger Centre',
    hours: 'Sam – Jeu : 10h00 → 20h00',
    phone: '+213 000 00 00 00',
    image:
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Alger+Didouche+Mourad',
  },
  {
    id: 's2',
    name: 'DJOW31 — Oran',
    address: 'Boulevard Emir Abdelkader, Oran',
    hours: 'Tous les jours : 10h00 → 21h00',
    phone: '+213 000 00 00 00',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    mapUrl: 'https://maps.google.com/?q=Oran+Emir+Abdelkader',
  },
];

export const formatDZD = (n: number) =>
  new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(n) + ' DA';
