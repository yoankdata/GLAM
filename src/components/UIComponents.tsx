'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, MapPin, ShieldCheck, Gem, MessageCircle } from 'lucide-react';
import type { Database } from '@/types/database.types';

// Type pour la carte prestataire (simplifié pour le composant)
type Provider = Database['public']['Tables']['providers']['Row'];

// --- HELPER PRICE ---
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price).replace('XOF', 'FCFA');
};

// --- PROVIDER CARD ---
export const ProviderCard = ({ provider }: { provider: Provider }) => {
  const getBadgeInfo = (plan: string) => {
    if (plan === 'premium_annuel') return { label: 'Premium', color: 'bg-[#D1A85A] text-white', icon: <Gem size={12} className="mr-1" /> };
    if (plan === 'pro_annuel') return { label: 'Vérifié', color: 'bg-[#D4A6A8] text-white', icon: <ShieldCheck size={12} className="mr-1" /> };
    return null;
  };
  const badge = getBadgeInfo(provider.plan);

  // Fallback photo: Si l'image Supabase ne charge pas
  const imageOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; 
    e.currentTarget.src = "https://placehold.co/600x400/D4A6A8/ffffff?text=Image+Non+Disponible";
  };

  return (
    <Link href={`/prestataires/${provider.slug}`} className="group block h-full">
      <div className="bg-white rounded-[14px] overflow-hidden border border-[#E8D0C8] shadow-sm hover:shadow-md transition-all h-full flex flex-col">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image 
            src={provider.main_photo_url || "https://placehold.co/600x400/D4A6A8/ffffff?text=GLAM.CI"} 
            alt={provider.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={imageOnError}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {badge && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center ${badge.color}`}>
              {badge.icon} {badge.label}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl text-[#0A0A0A] font-bold">{provider.name}</h3>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin size={14} className="mr-1 text-[#D4A6A8]" />
            {provider.commune}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Affiche seulement 2 spécialités */}
            {provider.specialties?.slice(0, 2).map((s, i) => (
              <span key={i} className="text-xs bg-[#FAF9F7] text-gray-600 px-2 py-1 rounded-md border border-[#E8D0C8]">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">À partir de</span>
            <span className="font-bold text-[#D4A6A8]">{formatPrice(provider.price_min)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- NAVBAR ---
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path ? 'text-[#D4A6A8]' : 'text-gray-600 hover:text-[#D4A6A8]';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8D0C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tighter text-[#0A0A0A]">
            GLAM<span className="text-[#D4A6A8]">.CI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-sm font-medium ${isActive('/')}`}>Accueil</Link>
            <Link href="/prestataires" className={`text-sm font-medium ${isActive('/prestataires')}`}>Prestataires</Link>
            <Link href="/devenir-prestataire" className="bg-[#D4A6A8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c49294] transition-colors">
              Devenir Prestataire
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#E8D0C8] px-4 py-4 space-y-4">
          <Link href="/" className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link href="/prestataires" className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Prestataires</Link>
          <Link href="/devenir-prestataire" className="block text-[#D4A6A8] font-bold" onClick={() => setIsOpen(false)}>Devenir Prestataire</Link>
        </div>
      )}
    </nav>
  );
};

// --- FOOTER ---
export const Footer = () => (
  <footer className="bg-[#FAF9F7] border-t border-[#E8D0C8] pt-16 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="font-serif text-2xl font-bold text-[#0A0A0A] mb-4">GLAM<span className="text-[#D4A6A8]">.CI</span></div>
          <p className="text-gray-600 max-w-xs mx-auto md:mx-0">L'annuaire beauté premium d'Abidjan.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Liens</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/prestataires">Trouver une pro</Link></li>
            <li><Link href="/devenir-prestataire">S'inscrire</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Légal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {/* TODO: Créer cette page (Mentions Légales) */}
            <li><Link href="/mentions-legales">Mentions Légales</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-[#E8D0C8] text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} GLAM.CI - Abidjan.
      </div>
    </div>
  </footer>
);