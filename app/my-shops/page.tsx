'use client';

import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import BackgroundZoom from '@/components/BackgroundZoom';
import { useStore } from '@/lib/store';

export default function ShopsPage() {
  const { shops, settings } = useStore();
  return (
    <PageTransition>
      <section className="relative flex min-h-[62svh] items-end overflow-hidden pb-14 pt-32">
        <BackgroundZoom src={settings.backgrounds.shops} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Mes boutiques</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl">Viens <em className="text-gold">essayer</em> en vrai</h1>
          <p className="mt-3 max-w-xl text-cream/70">Essayage gratuit, conseils, retouches sur place. Appelle avant de passer pour vérifier la taille.</p>
        </div>
      </section>

      <section className="relative z-10 bg-[#0e0c09] py-14">
        <div className="mx-auto grid max-w-6xl gap-7 px-6 md:grid-cols-2">
          {shops.map((s, i) => (
            <article
              key={s.id}
              className={`overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur shadow-card ${
                i % 2 === 0 ? 'rounded-[40px_140px_40px_40px]' : 'rounded-[140px_40px_40px_40px]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} className="aspect-[16/9] w-full object-cover" />
              <div className="p-7">
                <h2 className="font-display text-3xl">{s.name}</h2>
                <p className="mt-3 flex items-start gap-2 text-sm text-cream/70"><MapPin size={16} className="mt-0.5 text-gold" />{s.address}</p>
                <p className="mt-2 flex items-start gap-2 text-sm text-cream/70"><Clock size={16} className="mt-0.5 text-gold" />{s.hours}</p>
                <p className="mt-2 flex items-start gap-2 text-sm text-cream/70"><Phone size={16} className="mt-0.5 text-gold" />{s.phone}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={s.mapUrl} target="_blank" className="flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-ink hover:bg-gold">
                    <Navigation size={15} /> Itinéraire
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10">
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
