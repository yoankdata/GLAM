import { Suspense } from 'react';

export default function PrestatairesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Chargement…</div>}>
      {children}
    </Suspense>
  );
}
