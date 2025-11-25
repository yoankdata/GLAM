// src/app/prestataires/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProviderCard } from '@/components/UIComponents';
import type { Database } from '@/types/database.types';

type ProviderRow = Database['public']['Tables']['providers']['Row'];

export default function ListingPage() {
  const searchParams = useSearchParams();

  const [providers, setProviders] = useState<ProviderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    commune: '',
    search: '',
  });

  // Initialise la recherche avec ?search= depuis l'URL (venant de la Home)
  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    setFilters((prev) => ({ ...prev, search: initialSearch }));
  }, [searchParams]);

  // Charge tous les prestataires actifs au montage
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur Supabase:', error);
      }

      if (data) {
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

    fetchData();
  }, []);

  // Filtres locaux
  const filtered = providers.filter((p) => {
    if (filters.category && !p.specialties.includes(filters.category)) return false;
    if (filters.commune && p.commune !== filters.commune) return false;

    if (filters.search) {
      const term = filters.search.toLowerCase();
      const inName = p.name.toLowerCase().includes(term);
      const inBio = (p.bio || '').toLowerCase().includes(term);
      return inName || inBio;
    }

    return true;
  });

  const CATEGORIES = [
    'Coiffure',
    'Ongles',
    'Makeup',
    'Lashes & Brows',
    'Soins Visage',
    'Massage',
    'Épilation',
  ];

  const COMMUNES = [
    'Cocody',
    'Marcory',
    'Plateau',
    'Treichville',
    'Yopougon',
    'Bingerville',
    'Koumassi',
    'Adjamé',
  ];

  return (
    <div className="min-h-screen pb-20 bg-[#FAF9F7]">
      {/* Titre */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="font-serif text-4xl font-bold text-[#0A0A0A] mb-8">
          Trouver votre professionnelle
        </h1>
      </div>

      {/* Barre de recherche + filtres (sticky) */}
      <div className="bg-white border-b border-[#E8D0C8] sticky top-20 z-40 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
          {/* Recherche texte */}
          <div className="relative flex-grow w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher (ex: Tresses à Cocody)..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl 
                         focus:outline-none focus:ring-1 focus:ring-[#D4A6A8] transition-all"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Filtre Catégorie */}
          <select
            className="px-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl focus:ring-1 
                       focus:ring-[#D4A6A8] transition-all w-full md:w-auto"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">Toutes catégories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Filtre Commune */}
          <select
            className="px-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl focus:ring-1 
                       focus:ring-[#D4A6A8] transition-all w-full md:w-auto"
            value={filters.commune}
            onChange={(e) => setFilters({ ...filters, commune: e.target.value })}
          >
            <option value="">Toutes communes</option>
            {COMMUNES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listing */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {loading ? (
          <div className="text-center py-20 text-xl text-[#D4A6A8] animate-pulse">
            Chargement des prestataires...
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-500 font-medium">
              Affichage de {filtered.length} prestataire(s)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white p-8 rounded-xl border border-[#E8D0C8] mt-8">
                <h2 className="font-serif text-2xl mb-2">Aucun résultat trouvé</h2>
                <p>Essayez d&apos;autres mots-clés ou ajustez les filtres.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
