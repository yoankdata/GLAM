// src/components/DevenirPrestataireForm.tsx
'use client';

import { FormEvent, useState } from 'react';

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

const SPECIALITES = [
  'Coiffure',
  'Ongles',
  'Makeup',
  'Lashes & Brows',
  'Soins Visage',
  'Massage',
  'Épilation',
];

// À remplacer par TON numéro admin
const ADMIN_WHATSAPP = '2250700000000';

export function DevenirPrestataireForm() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [commune, setCommune] = useState('');
  const [specialites, setSpecialites] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [bio, setBio] = useState('');
  const [notes, setNotes] = useState('');
  const [sending, setSending] = useState(false);

  const toggleSpecialite = (value: string) => {
    setSpecialites((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation minimale
    if (!name || !whatsapp || !commune || !priceMin || !bio) {
      alert('Merci de remplir au minimum : nom, WhatsApp, commune, prix minimum et présentation.');
      return;
    }

    setSending(true);

    const message = `
Nouvelle demande d'inscription GLAM.CI

Nom / Salon : ${name}
WhatsApp : ${whatsapp}
Instagram : ${instagram || '—'}
Commune : ${commune}
Spécialités : ${specialites.length > 0 ? specialites.join(', ') : 'Non précisées'}
Tarif minimum : ${priceMin} FCFA

Présentation :
${bio}

Remarques :
${notes || '—'}
    `.trim();

    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
      message
    )}`;

    // Ouverture de WhatsApp
    window.open(url, '_blank');
    setSending(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Identité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Nom / Nom du salon
          </label>
          <input
            type="text"
            placeholder="Ex : Lina Hair Lounge"
            className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            WhatsApp (principal)
          </label>
          <input
            type="tel"
            placeholder="+225 07 xx xx xx xx"
            className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8]"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Réseaux & commune */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Instagram (optionnel)
          </label>
          <input
            type="text"
            placeholder="@votrecompte"
            className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8]"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Commune principale
          </label>
          <select
            className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8]"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            required
          >
            <option value="" disabled>
              Sélectionnez votre commune
            </option>
            {COMMUNES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Spécialités */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Spécialités principales
        </label>
        <p className="text-xs text-gray-500 mb-1">
          Sélectionnez 1 à 3 catégories qui décrivent le mieux votre activité.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SPECIALITES.map((s) => {
            const checked = specialites.includes(s);
            return (
              <label
                key={s}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer ${
                  checked
                    ? 'border-[#D4A6A8] bg-[#FBEFF0] text-[#A9686E]'
                    : 'border-[#E8D0C8] bg-[#FAF9F7] text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  className="accent-[#D4A6A8]"
                  checked={checked}
                  onChange={() => toggleSpecialite(s)}
                />
                <span>{s}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Prix & description */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Tarif minimum (à partir de)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Ex : 10000"
              className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8]"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              required
            />
            <span className="text-xs text-gray-500">FCFA</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Indiquez un prix d&apos;appel pour vos prestations.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Présentation rapide
          </label>
          <textarea
            rows={4}
            placeholder="Décrivez votre style, votre expérience, ce qui vous différencie..."
            className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8] resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Remarques */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Remarques (optionnel)
        </label>
        <textarea
          rows={3}
          placeholder="Précisez vos zones de déplacement, vos disponibilités ou conditions particulières..."
          className="w-full rounded-lg border border-[#E8D0C8] bg-[#FAF9F7] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A6A8] resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Bouton */}
      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={sending}
          className="w-full md:w-auto inline-flex justify-center items-center rounded-full bg-[#D4A6A8] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#c49294] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? 'Ouverture de WhatsApp…' : 'Envoyer ma demande sur WhatsApp'}
        </button>
        <p className="text-[11px] text-gray-500">
          En cliquant, un message récapitulatif est préparé dans WhatsApp. Vous
          pouvez le relire et l&apos;envoyer à l&apos;équipe GLAM.CI.
        </p>
      </div>
    </form>
  );
}
