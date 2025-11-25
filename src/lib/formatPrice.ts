// src/lib/formatPrice.ts

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-CI', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace('XOF', 'FCFA');
};
