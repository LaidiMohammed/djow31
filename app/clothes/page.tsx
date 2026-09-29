'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import BackgroundZoom from '@/components/BackgroundZoom';
import ProductCardOrganic from '@/components/ProductCardOrganic';
import { useStore } from '@/lib/store';

const CATS = ['Tous', 'Costumes', 'Casual', 'Accessoires'] as const;

export default function ClothesPage() {
  const { products, settings } = useStore();
  const [cat, setCat] = useState<(typeof CATS)[number]>('Tous');
  const [q, setQ] = useState('');

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'Tous' || p.category === cat) &&
          (q.trim() === '' || (p.name + p.description).toLowerCase().includes(q.toLowerCase()))
      ),
    [products, cat, q]
  );

  return (
    <PageTransition>
      <section className="relative flex min-h-[62svh] items-end overflow-hidden pb-14 pt-32">
        <BackgroundZoom src={settings.backgrounds.clothes} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Mode homme</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl">La collection <em className="text-gold">homme</em></h1>
          <p className="mt-3 max-w-xl text-cream/70">
            Costumes, casual et accessoires — stock réel en magasin, tailles jusqu&apos;à XXL.
          </p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm transition ${
                    cat === c ? 'bg-cream font-bold text-ink' : 'border border-white/20 bg-black/40 backdrop-blur'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="flex flex-1 items-center gap-2 rounded-full border border-white/20 bg-black/45 px-5 py-2.5 backdrop-blur md:max-w-sm">
              <Search size={17} className="text-cream/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher costume, chemise, jean…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-cream/40"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#0e0c09] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-8 text-sm text-cream/50">{list.length} article(s) — formes arche, pas de carrés</p>
          {list.length === 0 ? (
            <div className="rounded-3xl border border-white/10 p-14 text-center text-cream/60">
              Aucune pièce trouvée. Essaie un autre mot ou passe en boutique voir les nouveautés TikTok.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <ProductCardOrganic key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
