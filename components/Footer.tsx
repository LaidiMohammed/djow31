'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { TikTokIcon } from './ProductCardOrganic';
import { useStore } from '@/lib/store';

export default function Footer() {
  const { settings } = useStore();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0e0c09]/95 pb-28 pt-12 md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="logo" className="h-12 w-12 rounded-full bg-cream" />
            <div>
              <p className="font-display text-2xl">{settings.brandName}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{settings.slogan}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-cream/60">
            Boutique homme algérienne — costumes et casual choisis avec exigence, essayage en magasin, nouveautés en live TikTok chaque semaine.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={settings.tiktok} target="_blank" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-ink transition">
              <TikTokIcon />
            </a>
            <a href={settings.instagram} target="_blank" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-ink transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/50">Pages</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-gold">Accueil</Link>
            <Link href="/about" className="hover:text-gold">À propos</Link>
            <Link href="/clothes" className="hover:text-gold">Vêtements</Link>
            <Link href="/my-shops" className="hover:text-gold">Mes boutiques</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/50">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/70">
            <a href={settings.tiktok} target="_blank" className="hover:text-gold">TikTok officiel</a>
            <a href={settings.instagram} target="_blank" className="hover:text-gold">Instagram</a>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="hover:text-gold">WhatsApp commande</a>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-cream/30">© 2026 {settings.brandName} — Fait avec passion à Alger</p>
    </footer>
  );
}
