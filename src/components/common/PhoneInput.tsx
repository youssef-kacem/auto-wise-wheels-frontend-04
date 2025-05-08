
import React, { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Numéro de téléphone",
  className = "",
  required = false,
  disabled = false
}) => {
  // Nettoyage des caractères non numériques
  const cleanPhoneNumber = (input: string) => {
    return input.replace(/\D/g, '').substring(0, 8);
  };

  // Formatage du numéro de téléphone (format tunisien: XX XXX XXX)
  const formatPhoneNumber = (input: string) => {
    const cleaned = cleanPhoneNumber(input);
    
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return `${cleaned.substring(0, 2)} ${cleaned.substring(2)}`;
    } else {
      return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-autowise-blue ${className}`}
      required={required}
      disabled={disabled}
      pattern="[0-9]{2} [0-9]{3} [0-9]{3}"
      maxLength={10} // 8 chiffres + 2 espaces
    />
  );
};

export default PhoneInput;
