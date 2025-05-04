
import React from 'react';
import { Calendar, MapPin, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingOption {
  id: string;
  name: string;
  price: number;
}

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
}

interface BookingSummaryProps {
  car: Car | undefined;
  dateRange: { from: Date | undefined; to: Date | undefined };
  pickupLocation: string;
  returnLocation: string;
  withDriver: boolean;
  additionalOptions: string[];
  availableOptions: BookingOption[];
  numberOfDays: number;
  totalPrice: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  car,
  dateRange,
  pickupLocation,
  returnLocation,
  withDriver,
  additionalOptions,
  availableOptions,
  numberOfDays,
  totalPrice,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-5 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
      
      {car && (
        <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
          <img 
            src={car.imageUrl} 
            alt={`${car.brand} ${car.model}`} 
            className="w-20 h-20 object-cover rounded-md mr-4" 
          />
          <div>
            <h3 className="font-medium text-gray-800">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-500">{car.year}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-start">
          <Calendar size={18} className="mr-2 text-gray-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-800">Dates</p>
            {dateRange.from && dateRange.to ? (
              <p className="text-sm text-gray-600">
                {format(dateRange.from, "dd/MM/yyyy", { locale: fr })} - {format(dateRange.to, "dd/MM/yyyy", { locale: fr })}
                <span className="block">
                  ({numberOfDays} jour{numberOfDays > 1 ? 's' : ''})
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Non sélectionnées</p>
            )}
          </div>
        </div>
        
        {pickupLocation && (
          <div className="flex items-start">
            <MapPin size={18} className="mr-2 text-gray-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">Prise en charge</p>
              <p className="text-sm text-gray-600">{pickupLocation}</p>
            </div>
          </div>
        )}
        
        {returnLocation && (
          <div className="flex items-start">
            <MapPin size={18} className="mr-2 text-gray-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">Retour</p>
              <p className="text-sm text-gray-600">{returnLocation}</p>
            </div>
          </div>
        )}
        
        {withDriver && (
          <div className="flex items-start">
            <Check size={18} className="mr-2 text-green-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">Avec chauffeur</p>
            </div>
          </div>
        )}
        
        {additionalOptions.length > 0 && (
          <div className="flex items-start">
            <Check size={18} className="mr-2 text-green-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800">Options additionnelles</p>
              <ul className="text-sm text-gray-600">
                {additionalOptions.map(optionId => {
                  const option = availableOptions.find(opt => opt.id === optionId);
                  return option && (
                    <li key={option.id}>{option.name}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Prix de base</span>
          <span>{car ? `${car.price} € × ${numberOfDays} jours` : '-'}</span>
        </div>
        
        {withDriver && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Chauffeur</span>
            <span>80 € × {numberOfDays} jours</span>
          </div>
        )}
        
        {additionalOptions.length > 0 && additionalOptions.map(optionId => {
          const option = availableOptions.find(opt => opt.id === optionId);
          return option && (
            <div key={option.id} className="flex justify-between mb-2">
              <span className="text-gray-600">{option.name}</span>
              <span>{option.price} € × {numberOfDays} jours</span>
            </div>
          );
        })}
        
        <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>{totalPrice} €</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        * Le paiement sera effectué lors de la prise en charge du véhicule.
      </div>
    </div>
  );
};

export default BookingSummary;
