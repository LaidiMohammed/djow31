import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DJOW31 — Boutique by Anis Sahraoui',
  description: 'DJOW31 by Anis — mode homme : costumes, casual et accessoires. Nouveautés TikTok, essayage en boutique.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
