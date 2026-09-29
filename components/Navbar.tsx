'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Shirt, Store } from 'lucide-react';
import { useStore } from '@/lib/store';

const LINKS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/about', label: 'Nous', icon: Sparkles },
  { href: '/clothes', label: 'Vêtements', icon: Shirt },
  { href: '/my-shops', label: 'Boutiques', icon: Store },
];

export default function Navbar() {
  const pathname = usePathname();
  const { settings } = useStore();

  return (
    <>
      {/* TOP — desktop */}
      <header className="fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-5 py-3 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="logo" className="h-10 w-10 rounded-full border border-gold/40 bg-cream p-0.5" />
            <span className="leading-tight">
              <span className="block font-display text-xl tracking-wide">{settings.brandName}</span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gold">
                {settings.slogan.split('—')[0]}
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all ${
                    active
                      ? 'bg-cream text-ink font-semibold'
                      : 'text-cream/70 hover:text-cream hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/clothes"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:brightness-110"
          >
            Shop now
          </Link>
        </div>
      </header>

      {/* TOP MINI — mobile logo */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="logo" className="h-9 w-9 rounded-full border border-gold/50 bg-cream" />
          <span className="font-display text-lg">{settings.brandName}</span>
        </Link>
        <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">
          Alger • Oran
        </span>
      </div>

      {/* BOTTOM DOCK — mobile parfait */}
      <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-2 md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-[28px] border border-white/10 bg-[#171310]/90 p-2 shadow-soft backdrop-blur-xl">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex flex-col items-center gap-1 rounded-2xl py-2.5 text-[11px] transition-all ${
                  active ? 'bg-cream text-ink font-semibold' : 'text-cream/60'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
