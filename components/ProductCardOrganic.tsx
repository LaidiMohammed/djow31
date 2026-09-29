'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { formatDZD, type Product } from '@/lib/data';
import { useStore } from '@/lib/store';

export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function ProductCardOrganic({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { settings } = useStore();
  const waText = encodeURIComponent(`Salam ${settings.brandName}, je veux "${product.name}" (${formatDZD(product.price)})`);
  const waUrl = `https://wa.me/${settings.whatsapp}?text=${waText}`;
  const tall = index % 3 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07 }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-card ${
          tall ? 'rounded-leaf' : 'arch-img'
        }`}
      >
        <div className={`relative overflow-hidden ${tall ? 'aspect-[3/4.1]' : 'aspect-[3/4.4]'} ${tall ? 'rounded-leaf' : 'arch-img'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {product.badge && (
            <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              {product.badge}
            </span>
          )}
        </div>

        <div className="relative -mt-10 px-5 pb-5 pt-0 text-center">
          <div className="mx-auto max-w-[92%] rounded-3xl border border-white/10 bg-[#1c1712]/90 px-4 py-4 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{product.category}</p>
            <h3 className="mt-1 font-display text-lg leading-snug">{product.name}</h3>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-lg font-bold">{formatDZD(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-cream/40 line-through">{formatDZD(product.oldPrice)}</span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {product.sizes.map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-cream/70">
                  {s}
                </span>
              ))}
            </div>
            <a
              href={waUrl}
              target="_blank"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-cream py-2.5 text-sm font-semibold text-ink transition hover:bg-gold"
            >
              <MessageCircle size={16} /> Commander
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
