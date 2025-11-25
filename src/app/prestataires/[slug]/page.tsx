// src/app/prestataires/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronLeft, Instagram, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import type { Database } from '@/types/database.types';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/formatPrice';

type ProviderRow = Database['public']['Tables']['providers']['Row'];

type PageProps = {
  params: { slug: string };
};

export const metadata: Metadata = {
  title: 'Prestataire | GLAM.CI',
};

async function getProviderBySlug(slug: string): Promise<ProviderRow | null> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Erreur Supabase getProviderBySlug:', error);
    return null;
  }

  return data;
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const provider = await getProviderBySlug(params.slug);

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Prestataire introuvable</p>
          <Link
            href="/prestataires"
            className="inline-flex items-center text-sm text-[#D4A6A8] hover:text-[#c49294]"
          >
            <ChevronLeft size={16} className="mr-1" />
            Retour à la liste des prestataires
          </Link>
        </div>
      </div>
    );
  }

  const services = provider.services_details || [];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            href="/prestataires"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[#D4A6A8]"
          >
            <ChevronLeft size={16} className="mr-1" />
            Retour aux prestataires
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr] gap-10 items-start">
          {/* Image principale */}
          <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden">
            <Image
              unoptimized
              src={provider.main_photo_url || '/images/providers/placeholder.jpg'}
              alt={provider.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Infos prestataire */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">
              {provider.name}
            </h1>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <MapPin size={16} className="mr-1 text-[#D4A6A8]" />
              {provider.commune}
            </div>

            <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
              {provider.bio}
            </p>

            {/* Spécialités */}
            {provider.specialties && provider.specialties.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-2">
                  Spécialités
                </h2>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-[#FAF9F7] border border-[#E8D0C8] px-3 py-1 text-xs text-gray-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bloc tarif / CTA */}
            <div className="rounded-3xl border border-[#E8D0C8] bg-white px-6 py-5 mb-6">
              <div className="text-xs text-gray-500 mb-1">
                Tarifs indicatifs à partir de
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#D4A6A8] font-serif mb-1">
                {formatPrice(provider.price_min)}
              </div>
              <p className="text-xs text-gray-500">
                Les tarifs exacts peuvent varier selon la prestation choisie.
              </p>
            </div>

            {/* Boutons contact */}
            <div className="flex flex-wrap gap-3 mb-4">
              {provider.whatsapp && (
                <a
                  href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1EB85A] transition-colors"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Contacter sur WhatsApp
                </a>
              )}

              {provider.instagram && (
                <a
                  href={`https://instagram.com/${provider.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#E8D0C8] bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#FAF9F7] transition-colors"
                >
                  <Instagram size={16} className="mr-2 text-[#D4A6A8]" />
                  Voir le profil Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Services proposés */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-[#0A0A0A] mb-4">
            Services proposés
          </h2>
          <div className="rounded-3xl border border-[#E8D0C8] bg-white px-6 py-5">
            {services.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Les services détaillés seront bientôt ajoutés pour ce
                prestataire.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
