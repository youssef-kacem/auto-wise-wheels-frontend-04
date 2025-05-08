
import React from 'react';

interface CurrencyProps {
  amount: number | string;
  showSymbol?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({ amount, showSymbol = true }) => {
  // Convertir en nombre si nécessaire
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Formater avec le séparateur de milliers et 3 décimales maximum
  const formattedAmount = new Intl.NumberFormat('fr-TN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(numericAmount);
  
  return (
    <span className="whitespace-nowrap">
      {formattedAmount}{showSymbol && ' TND'}
    </span>
  );
};

export default Currency;
