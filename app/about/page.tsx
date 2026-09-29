'use client';

import { motion } from 'framer-motion';
import { Award, Clock, Heart, MapPin, Navigation, Phone, Scissors } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import BackgroundZoom from '@/components/BackgroundZoom';
import { useStore } from '@/lib/store';

export default function AboutPage() {
  const { settings, shops } = useStore();
  return (
    <PageTransition>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden pb-20 pt-32">
        <BackgroundZoom src={settings.backgrounds.about} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">À propos de nous</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              La référence <em className="text-gold">mode homme</em> née sur TikTok
            </h1>
            <p className="mt-5 max-w-2xl text-cream/70">
              {settings.brandName} — {settings.slogan}. Tout a commencé avec les lives de Anis :
              costumes essayés en direct, conseils taille homme, arrivages dévoilés avant tout le monde.
              Aujourd&apos;hui nos boutiques habillent chaque jour des hommes qui veulent
              une coupe nette, des tissus solides et un prix juste.
            </p>
          </motion.div>
          <div className="mt-10 grid grid-cols-3 gap-2 md:max-w-2xl md:gap-3">
            {[
              ['+5K', 'clients fidèles'],
              ['+300', 'lives TikTok'],
              ['2', 'boutiques'],
            ].map(([n, l]) => (
              <div key={l} className="rounded-3xl border border-white/12 bg-black/45 p-3 text-center backdrop-blur-xl md:p-5">
                <p className="font-display text-2xl text-gold sm:text-3xl md:text-4xl">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-cream/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-cream py-16 text-ink md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {[
            { icon: Scissors, t: 'Coupe homme nette', d: 'Costumes ajustés, retouches sur place. On vérifie épaules, longueur, taille réelle.' },
            { icon: Heart, t: 'Conseil honnête', d: 'En live comme en magasin, on dit ce qui va vraiment. Échanges facilités sous 48h.' },
            { icon: Award, t: 'Prix juste', d: 'Arrivages hebdo homme, paiement à la livraison partout en Algérie.' },
          ].map((c) => (
            <div key={c.t} className="rounded-[32px] border border-ink/10 bg-white p-8 shadow-card">
              <c.icon className="text-gold" size={28} />
              <h3 className="mt-4 font-display text-2xl">{c.t}</h3>
              <p className="mt-2 text-sm text-ink/60">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop" alt="costume" className="aspect-[4/3] w-full rounded-[36px] object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=900&auto=format&fit=crop" alt="boutique homme" className="aspect-[4/3] w-full rounded-[36px_140px_36px_140px] object-cover" />
        </div>
      </section>

      {/* LOCALISATION BOUTIQUES — carte Google Maps intégrée */}
      <section className="relative z-10 bg-[#0e0c09] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Nous trouver</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">Nos boutiques <em className="text-gold">sur la carte</em></h2>
          <p className="mt-3 max-w-xl text-cream/60">Passe essayer en vrai — costume, retouches et conseils sur place.</p>
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {shops.map((s) => (
              <article key={s.id} className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur">
                <div className="relative">
                  <iframe
                    title={`Carte ${s.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address)}&z=15&output=embed`}
                    className="aspect-[16/10] w-full border-0 grayscale invert-[0.92] contrast-[0.9]"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
                    {s.name}
                  </span>
                </div>
                <div className="p-6">
                  <p className="flex items-start gap-2 text-sm text-cream/75"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />{s.address}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-cream/75"><Clock size={16} className="mt-0.5 shrink-0 text-gold" />{s.hours}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-cream/75"><Phone size={16} className="mt-0.5 shrink-0 text-gold" />{s.phone}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={s.mapUrl} target="_blank" className="flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-ink hover:bg-gold">
                      <Navigation size={15} /> Itinéraire
                    </a>
                    <a href={settings.tiktok} target="_blank" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10">
                      Voir sur TikTok
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
