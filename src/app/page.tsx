// src/app/page.tsx

import Link from 'next/link';
import { HeroSearchBar } from '@/components/HeroSearchBar';
import { LatestProvidersSection } from '@/components/LatestProvidersSection';

export default function Home() {
  return (
    <>
      {/* SECTION HERO */}
      <section className="bg-[#FAF9F7] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-[#0A0A0A] mb-6 leading-tight">
            Trouvez votre <span className="text-[#D4A6A8]">experte beauté</span> à Abidjan.
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Maquilleurs, coiffeurs, esthéticiennes... Découvrez les meilleurs professionnels
            vérifiés.
          </p>

          {/* Barre de recherche connectée à /prestataires */}
          <HeroSearchBar />
        </div>
      </section>

      {/* DERNIÈRES PRESTATAIRES (données Supabase côté client) */}
      <LatestProvidersSection />

      {/* SECTION CTA PROS */}
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
    </>
  );
}
