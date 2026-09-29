'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_PRODUCTS,
  DEFAULT_SHOPS,
  HERO_POSTER,
  HERO_VIDEO_REMOTE,
  INSTAGRAM_URL,
  PAGE_BACKGROUNDS,
  TIKTOK_URL,
  type Product,
  type Shop,
} from './data';

export type Settings = {
  brandName: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroVideo: string;
  heroPoster: string;
  backgrounds: Record<string, string>;
  tiktok: string;
  instagram: string;
  whatsapp: string;
  announcement: string;
};

type Store = {
  products: Product[];
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  shops: Shop[];
  setShops: (s: Shop[]) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  resetAll: () => void;
};

const DEFAULT_SETTINGS: Settings = {
  brandName: 'DJOW31',
  slogan: 'by Anis Sahraoui — Mode Homme',
  heroTitle: 'Le style homme qui impose le respect',
  heroSubtitle:
    'Costumes, casual et accessoires homme — essayage en boutique, nouveautés dévoilées en live TikTok chaque semaine.',
  heroVideo: HERO_VIDEO_REMOTE,
  heroPoster: HERO_POSTER,
  backgrounds: PAGE_BACKGROUNDS,
  tiktok: TIKTOK_URL,
  instagram: INSTAGRAM_URL,
  whatsapp: '213000000000',
  announcement: 'Nouvelle collection HOMME en boutique — essayage gratuit — paiement à la livraison wilaya',
};

const StoreCtx = createContext<Store | null>(null);
const LS_KEY = 'djow31-store-v3';

function loadLS(): Partial<{ products: Product[]; shops: Shop[]; settings: Settings }> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [shops, setShopsState] = useState<Shop[]>(DEFAULT_SHOPS);
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadLS();
    if (saved.products?.length) setProductsState(saved.products);
    if (saved.shops?.length) setShopsState(saved.shops);
    if (saved.settings) setSettingsState({ ...DEFAULT_SETTINGS, ...saved.settings });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(LS_KEY, JSON.stringify({ products, shops, settings }));
  }, [products, shops, settings, hydrated]);

  const value = useMemo<Store>(
    () => ({
      products,
      setProducts: setProductsState,
      addProduct: (p) => setProductsState((prev) => [p, ...prev]),
      updateProduct: (p) => setProductsState((prev) => prev.map((x) => (x.id === p.id ? p : x))),
      removeProduct: (id) => setProductsState((prev) => prev.filter((x) => x.id !== id)),
      shops,
      setShops: setShopsState,
      settings,
      setSettings: setSettingsState,
      resetAll: () => {
        setProductsState(DEFAULT_PRODUCTS);
        setShopsState(DEFAULT_SHOPS);
        setSettingsState(DEFAULT_SETTINGS);
      },
    }),
    [products, shops, settings]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
