'use client';

import { useState } from 'react';
import { Download, Lock, Plus, RotateCcw, Trash2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useStore } from '@/lib/store';
import { formatDZD, type Product, type Shop } from '@/lib/data';

const PIN = '1234';

export default function AdminPage() {
  const store = useStore();
  const { products, shops, settings } = store;
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [tab, setTab] = useState<'produits' | 'boutiques' | 'design'>('produits');

  const [editing, setEditing] = useState<Product>({
    id: '', name: '', price: 5000, category: 'Casual', sizes: ['L'], image: '', description: '',
  });
  const [shopEditing, setShopEditing] = useState<Shop>({
    id: '', name: '', address: '', hours: '', phone: '', image: '', mapUrl: 'https://maps.google.com/',
  });

  if (!unlocked) {
    return (
      <PageTransition>
        <section className="flex min-h-screen items-center justify-center bg-[#0e0c09] px-6 pt-20">
          <div className="w-full max-w-sm rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur">
            <Lock className="mx-auto text-gold" />
            <h1 className="mt-3 font-display text-3xl">Admin caché</h1>
            <p className="mt-1 text-sm text-cream/50">Zone réservée — PIN : 1234 (modifiable plus tard)</p>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              placeholder="PIN"
              className="mt-5 w-full rounded-full border border-white/15 bg-black/50 px-5 py-3 text-center text-lg tracking-[0.5em] outline-none"
            />
            <button
              onClick={() => (pin === PIN ? setUnlocked(true) : alert('PIN incorrect'))}
              className="mt-4 w-full rounded-full bg-gold py-3 font-bold text-ink"
            >
              Déverrouiller
            </button>
          </div>
        </section>
      </PageTransition>
    );
  }

  const saveProduct = () => {
    if (!editing.name || !editing.image) return alert('Nom + image requis');
    if (editing.id) store.updateProduct(editing);
    else store.addProduct({ ...editing, id: `p${Date.now()}` });
    setEditing({ id: '', name: '', price: 5000, category: 'Casual', sizes: ['L'], image: '', description: '' });
  };

  const saveShop = () => {
    if (!shopEditing.name) return alert('Nom requis');
    if (shopEditing.id) store.setShops(shops.map((s) => (s.id === shopEditing.id ? shopEditing : s)));
    else store.setShops([{ ...shopEditing, id: `s${Date.now()}` }, ...shops]);
    setShopEditing({ id: '', name: '', address: '', hours: '', phone: '', image: '', mapUrl: 'https://maps.google.com/' });
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ products, shops, settings }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'djow31-export.json';
    a.click();
  };

  return (
    <PageTransition>
      <section className="min-h-screen bg-[#0e0c09] px-4 pb-32 pt-28 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-3xl md:text-4xl">Panneau Admin <span className="text-gold">— tout contrôler</span></h1>
            <div className="flex gap-2">
              <button onClick={exportJSON} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Download size={15} /> Export</button>
              <button onClick={() => { if (confirm('Tout réinitialiser ?')) store.resetAll(); }} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><RotateCcw size={15} /> Reset</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(['produits', 'boutiques', 'design'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-full px-6 py-2.5 text-sm capitalize ${tab === t ? 'bg-cream font-bold text-ink' : 'border border-white/15'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'produits' && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold">{editing.id ? 'Modifier' : '+ Nouveau'} produit</h3>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Nom" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} type="number" placeholder="Prix DA" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                    <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as Product['category'] })} className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none">
                      <option>Costumes</option><option>Casual</option><option>Accessoires</option>
                    </select>
                  </div>
                  <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="URL image (ou /products/xxx.jpg)" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={editing.sizes.join(',')} onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} placeholder="Tailles: S,M,L" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={editing.badge ?? ''} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="Badge (Nouveau, -20%…)" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={3} className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <button onClick={saveProduct} className="flex items-center justify-center gap-2 rounded-full bg-gold py-3 font-bold text-ink"><Plus size={16} /> Enregistrer</button>
                </div>
                <p className="mt-3 text-xs text-cream/40">Astuce : mets tes vraies photos dans /public/products/ puis URL /products/nom.jpg</p>
              </div>
              <div className="flex flex-col gap-3">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-16 w-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-cream/50">{p.category} • {formatDZD(p.price)}</p>
                    </div>
                    <button onClick={() => setEditing(p)} className="rounded-full border border-white/15 px-4 py-1.5 text-xs">Éditer</button>
                    <button onClick={() => store.removeProduct(p.id)} className="rounded-full bg-red-500/15 p-2 text-red-300"><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'boutiques' && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold">Boutique</h3>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <input value={shopEditing.name} onChange={(e) => setShopEditing({ ...shopEditing, name: e.target.value })} placeholder="Nom boutique" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={shopEditing.address} onChange={(e) => setShopEditing({ ...shopEditing, address: e.target.value })} placeholder="Adresse" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={shopEditing.hours} onChange={(e) => setShopEditing({ ...shopEditing, hours: e.target.value })} placeholder="Horaires" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={shopEditing.phone} onChange={(e) => setShopEditing({ ...shopEditing, phone: e.target.value })} placeholder="Téléphone" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <input value={shopEditing.image} onChange={(e) => setShopEditing({ ...shopEditing, image: e.target.value })} placeholder="URL image" className="rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 outline-none" />
                  <button onClick={saveShop} className="rounded-full bg-gold py-3 font-bold text-ink">Enregistrer boutique</button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {shops.map((s) => (
                  <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex-1"><p className="font-semibold">{s.name}</p><p className="text-xs text-cream/50">{s.address}</p></div>
                    <button onClick={() => setShopEditing(s)} className="rounded-full border border-white/15 px-4 py-1.5 text-xs">Éditer</button>
                    <button onClick={() => store.setShops(shops.filter((x) => x.id !== s.id))} className="rounded-full bg-red-500/15 p-2 text-red-300"><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'design' && (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold">Marque & Hero (vidéo accueil)</h3>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <label className="text-xs text-cream/50">Nom boutique<input value={settings.brandName} onChange={(e) => store.setSettings({ ...settings, brandName: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">Titre hero<input value={settings.heroTitle} onChange={(e) => store.setSettings({ ...settings, heroTitle: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">Sous-titre hero<textarea value={settings.heroSubtitle} onChange={(e) => store.setSettings({ ...settings, heroSubtitle: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">Vidéo hero URL (ou /hero.mp4 si fichier local dans public/)<input value={settings.heroVideo} onChange={(e) => store.setSettings({ ...settings, heroVideo: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">Bandeau annonce<input value={settings.announcement} onChange={(e) => store.setSettings({ ...settings, announcement: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold">Liens & Backgrounds pages</h3>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <label className="text-xs text-cream/50">TikTok<input value={settings.tiktok} onChange={(e) => store.setSettings({ ...settings, tiktok: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">Instagram<input value={settings.instagram} onChange={(e) => store.setSettings({ ...settings, instagram: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  <label className="text-xs text-cream/50">WhatsApp (ex 2135XXXXXXXX)<input value={settings.whatsapp} onChange={(e) => store.setSettings({ ...settings, whatsapp: e.target.value })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  {Object.entries(settings.backgrounds).map(([k, v]) => (
                    <label key={k} className="text-xs text-cream/50">BG {k}<input value={v} onChange={(e) => store.setSettings({ ...settings, backgrounds: { ...settings.backgrounds, [k]: e.target.value } })} className="mt-1 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-2.5 text-sm outline-none" /></label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
