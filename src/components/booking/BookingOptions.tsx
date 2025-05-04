
import React from 'react';
import { Info } from 'lucide-react';

interface BookingOption {
  id: string;
  name: string;
  price: number;
}

interface BookingOptionsProps {
  withDriver: boolean;
  setWithDriver: (value: boolean) => void;
  additionalOptions: string[];
  handleOptionChange: (optionId: string) => void;
  availableOptions: BookingOption[];
}

const BookingOptions: React.FC<BookingOptionsProps> = ({
  withDriver,
  setWithDriver,
  additionalOptions,
  handleOptionChange,
  availableOptions,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Options</h3>
      
      {/* Option chauffeur */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
        <div className="flex items-center">
          <input
            id="withDriver"
            type="checkbox"
            checked={withDriver}
            onChange={() => setWithDriver(!withDriver)}
            className="h-4 w-4 rounded border-gray-300 text-autowise-blue focus:ring-autowise-blue"
          />
          <div className="ml-3">
            <label htmlFor="withDriver" className="block font-medium text-gray-700">
              Avec chauffeur
            </label>
            <p className="text-sm text-gray-500">Chauffeur professionnel inclus</p>
          </div>
        </div>
        <span className="text-sm font-medium">
          +80 € / jour
        </span>
      </div>
      
      {/* Options additionnelles */}
      <div className="space-y-2">
        {availableOptions.map(option => (
          <div key={option.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <input
                id={option.id}
                type="checkbox"
                checked={additionalOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                className="h-4 w-4 rounded border-gray-300 text-autowise-blue focus:ring-autowise-blue"
              />
              <label htmlFor={option.id} className="ml-3 block font-medium text-gray-700">
                {option.name}
              </label>
            </div>
            <span className="text-sm font-medium">
              +{option.price} € / jour
            </span>
          </div>
        ))}
      </div>
      
      {/* Info note */}
      <div className="p-4 border border-amber-200 bg-amber-50 rounded-md flex items-start mt-6">
        <Info size={20} className="text-amber-500 mr-2 mt-0.5" />
        <p className="text-sm text-amber-700">
          Une pièce d'identité valide et un permis de conduire seront demandés lors de la prise en charge du véhicule.
        </p>
      </div>
    </div>
  );
};

export default BookingOptions;
