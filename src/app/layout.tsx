// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar, Footer } from '@/components/UIComponents';

// Fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'GLAM.CI | Trouvez votre Experte Beauté à Abidjan',
  description:
    "Plateforme de référence pour les maquilleurs, coiffeurs et esthéticiennes vérifiés en Côte d'Ivoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-light-bg text-dark-text antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
