// src/app/page.tsx
import { supabase } from '@/lib/supabase';
import { ProviderCard } from '@/components/UIComponents';
import type { Database } from '@/types/database.types';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

type Provider = Database['public']['Tables']['providers']['Row'];

// Récupérer les 3 derniers prestataires
async function getLatestProviders(): Promise<Provider[]> {
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error(
        'Erreur lors de la récupération des derniers prestataires:',
        error
      );
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Erreur inattendue dans getLatestProviders:', e);
    return [];
  }
}

export default async function Home() {
  const latestProviders = await getLatestProviders();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#FAF9F7] py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-[#0A0A0A] mb-6 leading-tight">
              Trouvez votre{' '}
              <span className="text-[#D4A6A8]">experte beauté</span> à Abidjan.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Maquilleurs, coiffeurs, esthéticiennes... Découvrez les meilleurs
              professionnels vérifiés.
            </p>

            <div className="max-w-xl mx-auto flex items-center bg-white border border-[#E8D0C8] rounded-full p-2 shadow-lg">
              <Search className="text-[#D4A6A8] ml-4" size={20} />
              <input
                type="text"
                placeholder="Rechercher par service ou commune..."
                className="flex-grow p-3 focus:outline-none rounded-full placeholder-gray-500"
              />
              <button className="bg-[#D4A6A8] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#c49294] transition-colors">
                Rechercher
              </button>
            </div>
          </div>
        </section>

        {/* Dernières prestataires */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-[#0A0A0A]">
                Dernières Prestataires Ajoutées
              </h2>
              <Link
                href="/prestataires"
                className="text-[#D4A6A8] font-medium flex items-center hover:text-[#c49294]"
              >
                Voir tout <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {latestProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="text-gray-500">
                  Aucun prestataire n&apos;est encore enregistré. Les données
                  Supabase sont peut-être vides.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA pro */}
        <section className="bg-[#D4A6A8] py-16">
          <div className="max-w-5xl mx-auto px-4 text-center text-white">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Vous êtes une professionnelle ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez la communauté GLAM.CI pour développer votre activité.
            </p>
            <Link
              href="/devenir-prestataire"
              className="inline-block bg-white text-[#D4A6A8] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              S&apos;inscrire Maintenant
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
