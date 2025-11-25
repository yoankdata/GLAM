// src/app/devenir-prestataire/page.tsx
import type { Metadata } from 'next';
import { DevenirPrestataireForm } from '@/components/DevenirPrestataireForm';

export const metadata: Metadata = {
  title: 'Devenir prestataire | GLAM.CI',
  description:
    "Inscrivez votre activité beauté sur GLAM.CI et soyez visible auprès des clientes d'Abidjan.",
};

export default function DevenirPrestatairePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#D4A6A8] mb-3">
            Devenir prestataire
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-4">
            Rejoignez l&apos;annuaire beauté premium d&apos;Abidjan.
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Inscrivez votre activité de maquillage, coiffure, onglerie ou
            esthétique. GLAM.CI vous aide à être trouvée par les bonnes
            clientes, au bon moment.
          </p>
        </div>

        {/* Layout 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-start">
          {/* FORMULAIRE (client) */}
          <div className="bg-white rounded-2xl border border-[#E8D0C8] shadow-sm p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-[#0A0A0A] mb-2">
              Dossier d&apos;inscription
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Remplissez ce formulaire avec des informations précises. Nous
              reviendrons vers vous pour valider votre profil avant
              publication.
            </p>

            <DevenirPrestataireForm />
          </div>

          {/* COLONNE DROITE : AVANTAGES & PLANS */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8D0C8] p-6">
              <h3 className="font-serif text-xl font-semibold text-[#0A0A0A] mb-3">
                Pourquoi GLAM.CI ?
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li>• Visibilité ciblée auprès des clientes d&apos;Abidjan.</li>
                <li>• Fiche professionnelle claire et élégante.</li>
                <li>• Mise en avant des profils sérieux et réguliers.</li>
                <li>• Contact direct par WhatsApp sans intermédiaire.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8D0C8] p-6">
              <h3 className="font-serif text-xl font-semibold text-[#0A0A0A] mb-4">
                Nos formules
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="border border-[#E8D0C8] rounded-xl p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Standard Trimestre</span>
                    <span className="text-xs text-gray-500">
                      plan : standard_trimestre
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Présence dans l&apos;annuaire + fiche simple.
                  </p>
                </div>
                <div className="border border-[#E8D0C8] rounded-xl p-3 bg-[#FAF9F7]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Pro Annuel</span>
                    <span className="text-xs text-gray-500">
                      plan : pro_annuel
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Badge &quot;Vérifié&quot; + meilleure position dans les
                    résultats + visuels optimisés.
                  </p>
                </div>
                <div className="border border-[#E8D0C8] rounded-xl p-3 bg-[#D1A85A]/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Premium Annuel</span>
                    <span className="text-xs text-gray-500">
                      plan : premium_annuel
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Mise en avant prioritaire + badge &quot;Premium&quot; +
                    sélection dans les recommandations GLAM.CI.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8D0C8] p-6">
              <h3 className="font-serif text-lg font-semibold text-[#0A0A0A] mb-2">
                Contacter l&apos;équipe
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Vous préférez échanger directement ? Envoyez vos informations
                par WhatsApp, nous créerons votre fiche avec vous.
              </p>
              <a
                href="https://wa.me/2250700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1EB85A] transition-colors"
              >
                Écrire sur WhatsApp
              </a>
              <p className="mt-2 text-[11px] text-gray-500">
                Numéro indicatif, à remplacer par ton vrai numéro admin
                GLAM.CI.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
