// src/components/LatestProvidersSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';
import { ProviderCard } from '@/components/UIComponents';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ProviderRow = Database['public']['Tables']['providers']['Row'];

export function LatestProvidersSection() {
  const [providers, setProviders] = useState<ProviderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);

      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Erreur Supabase (Dernières prestataires) :', error);
      }

      if (data) {
        // même logique de priorité que sur /prestataires
        const rank: Record<string, number> = {
          premium_annuel: 3,
          pro_annuel: 2,
          standard_trimestre: 1,
        };

        const sorted = [...data].sort((a, b) => {
          const pa = rank[a.plan ?? ''] || 0;
          const pb = rank[b.plan ?? ''] || 0;

          if (pa !== pb) return pb - pa;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        setProviders(sorted);
      }

      setLoading(false);
    }

    fetchLatest();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
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

        {loading ? (
          <div className="text-center py-10 text-[#D4A6A8] animate-pulse">
            Chargement des prestataires...
          </div>
        ) : providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">
              Aucun prestataire actif n&apos;est encore enregistré.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
