'use client'; // Ce composant est client car il gère l'état et le filtrage

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ProviderCard } from '@/components/UIComponents';
import { Search } from 'lucide-react';
import type { Database } from '@/types/database.types';

// Type pour la prestataire
type ProviderRow = Database['public']['Tables']['providers']['Row'];

export default function ListingPage() {
  const [providers, setProviders] = useState<ProviderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', commune: '', search: '' });

  // Chargement des données au montage
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // On récupère TOUS les prestataires actifs
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false }); // Tri par défaut (plus récents en haut)
      
      if (error) {
        console.error("Erreur de chargement des données Supabase:", error);
      }
      
      if (data) {
        // Tri complexe côté client pour prioriser les plans
        const sorted = data.sort((a, b) => {
          const priority: any = { 'premium_annuel': 3, 'pro_annuel': 2, 'standard_trimestre': 1 };
          if (priority[a.plan] !== priority[b.plan]) {
             return priority[b.plan] - priority[a.plan]; // Premium > Pro > Standard
          }
          // Si les plans sont égaux, on trie par date de création (le plus récent en haut)
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setProviders(sorted);
      }
      setLoading(false);
    }
    fetchData();
  }, []); // Exécuté une seule fois au montage du composant

  // Fonction de filtrage local
  const filtered = providers.filter(p => {
    // 1. Filtrer par Catégorie (doit être inclus dans le tableau specialties)
    if (filters.category && !p.specialties.includes(filters.category)) return false;

    // 2. Filtrer par Commune
    if (filters.commune && p.commune !== filters.commune) return false;

    // 3. Filtrer par Recherche (Nom ou Bio)
    if (filters.search) {
      const term = filters.search.toLowerCase();
      return p.name.toLowerCase().includes(term) || p.bio.toLowerCase().includes(term);
    }
    return true;
  });

  const CATEGORIES = ["Coiffure", "Ongles", "Makeup", "Lashes & Brows", "Soins Visage", "Massage", "Épilation"];
  const COMMUNES = ["Cocody", "Marcory", "Plateau", "Treichville", "Yopougon", "Bingerville", "Koumassi", "Adjamé"];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="font-serif text-4xl font-bold text-[#0A0A0A] mb-8">Trouver votre professionnelle</h1>
      </div>

      {/* Barre de Recherche et Filtres (Sticky) */}
      <div className="bg-white border-b border-[#E8D0C8] sticky top-20 z-40 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4">
          
          {/* Champ de Recherche Libre */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher (ex: Tresses à Cocody)..." 
              className="w-full pl-10 pr-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4A6A8] focus:border-[#D4A6A8] transition-all"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          
          {/* Filtre Catégorie */}
          <select 
            className="px-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl focus:ring-1 focus:ring-[#D4A6A8] focus:border-[#D4A6A8] transition-all"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          {/* Filtre Commune */}
          <select 
            className="px-4 py-3 bg-[#FAF9F7] border border-[#E8D0C8] rounded-xl focus:ring-1 focus:ring-[#D4A6A8] focus:border-[#D4A6A8] transition-all"
            value={filters.commune}
            onChange={(e) => setFilters({...filters, commune: e.target.value})}
          >
            <option value="">Toute commune</option>
            {COMMUNES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {loading ? (
          <div className="text-center py-20 text-xl text-[#D4A6A8] animate-pulse">Chargement des prestataires...</div>
        ) : (
          <>
            <p className="mb-6 text-gray-500 font-medium">Affichage de {filtered.length} prestataire(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => <ProviderCard key={p.id} provider={p as any} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white p-8 rounded-xl border border-[#E8D0C8]">
                <h2 className="font-serif text-2xl mb-2">Aucun résultat trouvé</h2>
                <p>Veuillez essayer d'autres mots-clés ou modifier les filtres.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}