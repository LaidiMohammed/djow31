'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowDown, Instagram, MapPin, Play, Sparkles, Star } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import BackgroundZoom from '@/components/BackgroundZoom';
import ProductCardOrganic, { TikTokIcon } from '@/components/ProductCardOrganic';
import { useStore } from '@/lib/store';
import { HERO_VIDEO_LOCAL } from '@/lib/data';

export default function HomePage() {
  const { products, settings, shops } = useStore();
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: videoRef, offset: ['start start', 'end start'] });
  const vScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const vOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const best = products.slice(0, 6);

  return (
    <PageTransition>
      {/* ANNONCE */}
      {/* HERO VIDEO — background plein écran.
          Source 1 (prioritaire) : public/hero.mp4 → mets ta vraie vidéo TikTok ici, nommée hero.mp4.
          Source 2 (secours) : settings.heroVideo (modifiable dans /admin > Design).
          Poster : settings.heroPoster (image homme affichée pendant chargement). */}
      <section ref={videoRef} className="relative flex min-h-[108svh] items-end overflow-hidden bg-ink">
        <motion.div style={{ scale: vScale, opacity: vOpacity }} className="absolute inset-0">
          {/* Image de secours TOUJOURS visible derrière la vidéo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.heroPoster}
            alt="DJOW31 mode homme"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={settings.heroPoster}
          >
            <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
            <source src={settings.heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 video-vignette" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-36 pt-32 sm:px-6 md:pb-24 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              {settings.announcement}
            </div>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
              {settings.heroTitle.split(' ').slice(0, 3).join(' ')}{' '}
              <em className="text-gold">{settings.heroTitle.split(' ').slice(3).join(' ')}</em>
            </h1>
            <p className="mt-5 max-w-xl text-base text-cream/75 md:text-lg">{settings.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/clothes"
                className="rounded-full bg-cream px-8 py-4 text-sm font-bold text-ink transition hover:bg-gold"
              >
                Voir la collection
              </Link>
              <a
                href={settings.tiktok}
                target="_blank"
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold backdrop-blur hover:bg-white/20"
              >
                <TikTokIcon size={16} /> Live TikTok
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-cream/60">
              <span className="flex items-center gap-1.5"><Star size={15} className="text-gold" /> 4.9 avis clients</span>
              <span className="flex items-center gap-1.5"><MapPin size={15} /> {shops.length} boutiques</span>
              <span className="hidden sm:flex items-center gap-1.5"><Play size={15} /> Essayage gratuit</span>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#collection"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-cream/60 md:flex"
        >
          <span className="text-[11px] uppercase tracking-widest">Défiler</span>
          <ArrowDown size={18} />
        </motion.a>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 overflow-hidden border-y border-gold/25 bg-gold py-3 text-ink">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-semibold uppercase tracking-[0.2em] text-sm">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-8">
              {['Nouveautés chaque semaine', 'Essayage en boutique', 'Live TikTok 7j/7', 'Paiement à la livraison', 'Alger • Oran'].map(
                (t) => (
                  <span key={t} className="flex items-center gap-8">
                    {t} <Sparkles size={15} />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COLLECTION — background image zoom-out */}
      <section id="collection" className="relative overflow-hidden py-20 md:py-28">
        <BackgroundZoom src={settings.backgrounds.home} />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Sélection du moment</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Pièces les plus demandées</h2>
            </div>
            <Link href="/clothes" className="rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm backdrop-blur hover:bg-cream hover:text-ink transition">
              Tout voir →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {best.map((p, i) => (
              <ProductCardOrganic key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TIKTOK / INSTA CTA */}
      <section className="relative z-10 bg-[#0e0c09] py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <a href={settings.tiktok} target="_blank" className="group relative overflow-hidden rounded-[32px] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop" alt="tiktok" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
            <div className="absolute bottom-0 p-7">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><TikTokIcon size={14} /> TikTok officiel</p>
              <p className="mt-1 font-display text-3xl">Vois les costumes portés en live</p>
            </div>
          </a>
          <a href={settings.instagram} target="_blank" className="group relative overflow-hidden rounded-[32px] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=900&auto=format&fit=crop" alt="insta" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
            <div className="absolute bottom-0 p-7">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><Instagram size={14} /> Instagram</p>
              <p className="mt-1 font-display text-3xl">Looks homme & coulisses boutique</p>
            </div>
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
