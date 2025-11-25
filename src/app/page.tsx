import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProviderCard } from '@/components/UIComponents';

// Cette page est un Server Component
export const revalidate = 60; // Régénérer la page toutes les 60 secondes (ISR)

// Définition des catégories pour la page d'accueil
const categories = ["Coiffure", "Ongles", "Makeup", "Lashes", "Soins Visage", "Massage", "Épilation", "Body Care"];

export default async function Home() {
  // Récupérer les prestataires PREMIUM actifs pour la Home
  const { data: featuredProviders } = await supabase
    .from('providers')
    .select('*')
    .eq('is_active', true)
    .eq('plan', 'premium_annuel')
    .limit(3);

  // Pour la démo, on utilise une image fixe pour le Hero
  const heroImageUrl = "https://images.unsplash.com/photo-1549487560-6ef18408cf80?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#FAF9F7]">
        {/* Decorative background image - visible on desktop */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full rounded-bl-[100px] overflow-hidden">
            <Image 
                src={heroImageUrl} 
                alt="Styliste beauté africaine"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 1024px) 0, 50vw"
                priority
            />
             <div className="absolute inset-0 bg-[#E8D0C8]/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left">
            <div className="lg:w-1/2">
                <span className="text-[#D4A6A8] tracking-widest font-bold text-sm uppercase mb-4 block">Abidjan Beauty Directory</span>
                <h1 className="font-serif text-5xl md:text-7xl text-[#0A0A0A] mb-8 leading-tight">
                    La beauté d’Abidjan,<br/>réunie ici.
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                    Coiffeuses, ongleuses, makeup artists... Trouvez la professionnelle qu’il vous faut.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <Link href="/prestataires" className="bg-[#D4A6A8] text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:bg-[#c49294] transition-all flex items-center justify-center gap-2">
                        Trouver une prestataire <Search size={18} />
                    </Link>
                    <Link href="/devenir-prestataire" className="bg-white border border-[#D4A6A8] text-[#D4A6A8] px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all">
                        Je suis prestataire
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-center mb-12">Catégories Populaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link 
                href={`/prestataires?category=${encodeURIComponent(cat)}`} // Encoder l'URL pour les requêtes
                key={cat} 
                className="p-6 rounded-2xl bg-[#FAF9F7] hover:bg-[#E8D0C8] border border-[#E8D0C8]/50 transition-colors text-center font-serif font-medium shadow-sm hover:shadow-md"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      {featuredProviders && featuredProviders.length > 0 && (
        <section className="py-24 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-center mb-12">Nos coups de cœur (Premium)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Utilise le composant ProviderCard */}
              {featuredProviders.map((p: any) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
            <div className="text-center mt-12">
               <Link href="/prestataires" className="inline-flex items-center text-[#D4A6A8] font-bold underline hover:no-underline">
                  Voir tous les prestataires <ArrowRight size={16} className="ml-1"/>
               </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}