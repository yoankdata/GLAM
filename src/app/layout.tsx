import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar, Footer } from '@/components/UIComponents';

// Définition des polices pour Tailwind CSS
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'GLAM.CI | Annuaire Beauté Premium Abidjan',
  description: 'Trouvez les meilleures coiffeuses, maquilleuses et esthéticiennes à Abidjan.',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Utilise les variables de police dans la classe HTML
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#FAF9F7] text-[#0A0A0A] flex flex-col min-h-screen">
        <Navbar />
        {/* Le contenu des pages ira ici */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}