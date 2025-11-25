// src/components/HeroSearchBar.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function HeroSearchBar() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const query = term.trim();

    // On envoie vers /prestataires avec un paramètre search
    if (query.length > 0) {
      router.push(`/prestataires?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/prestataires');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex items-center bg-white border border-[#E8D0C8] rounded-full p-2 shadow-lg"
    >
      <Search className="text-[#D4A6A8] ml-4" size={20} />
      <input
        type="text"
        placeholder="Rechercher par service ou commune..."
        className="flex-grow p-3 focus:outline-none rounded-full placeholder-gray-500"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#D4A6A8] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#c49294] transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
}
