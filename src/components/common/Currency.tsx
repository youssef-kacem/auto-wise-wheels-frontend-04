
import React from 'react';

interface CurrencyProps {
  amount: number;
  showSymbol?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({ amount, showSymbol = false }) => {
  const formattedAmount = new Intl.NumberFormat('fr-TN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'TND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return <>{formattedAmount}</>;
};

export default Currency;
