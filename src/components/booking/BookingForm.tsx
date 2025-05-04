
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Car, Calendar, MapPin, CreditCard, Check, Clock, Info } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

interface BookingFormProps {
  car?: {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    imageUrl: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ car }) => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [withDriver, setWithDriver] = useState(false);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const { toast } = useToast();

  // Calcul du nombre de jours et du prix total
  const calculateDays = () => {
    if (dateRange.from && dateRange.to) {
      const diffTime = dateRange.to.getTime() - dateRange.from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const numberOfDays = calculateDays();
  
  // Options additionnelles disponibles
  const availableOptions = [
    { id: 'gps', name: 'GPS', price: 5 },
    { id: 'childSeat', name: 'Siège enfant', price: 8 },
    { id: 'insurance', name: 'Assurance premium', price: 12 },
    { id: 'wifi', name: 'Hotspot WiFi', price: 6 },
  ];

  // Gestion des options additionnelles
  const handleOptionChange = (optionId: string) => {
    setAdditionalOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      }
      return [...prev, optionId];
    });
  };

  // Calcul du prix total
  const calculateTotalPrice = () => {
    if (!car) return 0;
    let total = car.price * numberOfDays;
    
    // Coût du chauffeur
    if (withDriver) {
      total += 80 * numberOfDays; // 80€ par jour pour le chauffeur
    }
    
    // Coût des options additionnelles
    additionalOptions.forEach(optionId => {
      const option = availableOptions.find(opt => opt.id === optionId);
      if (option) {
        total += option.price * numberOfDays;
      }
    });
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Dates manquantes",
        description: "Veuillez sélectionner les dates de location.",
        variant: "destructive",
      });
      return;
    }
    
    if (!pickupLocation) {
      toast({
        title: "Lieu de prise en charge manquant",
        description: "Veuillez indiquer le lieu de prise en charge.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simuler la soumission du formulaire
    setTimeout(() => {
      toast({
        title: "Réservation confirmée",
        description: "Votre demande de réservation a été envoyée. Vous recevrez une confirmation par email.",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Détails de la réservation</h2>
          
          {/* Sélecteur de dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dates de location
            </label>
            <DateRangePicker onChange={setDateRange} />
          </div>
          
          {/* Lieux de prise en charge et de retour */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Lieu de prise en charge
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  id="pickupLocation"
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Adresse de prise en charge"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="returnLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Lieu de retour
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  id="returnLocation"
                  type="text"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Même que la prise en charge"
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  id="sameLocation"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-autowise-blue focus:ring-autowise-blue"
                  onChange={() => returnLocation ? setReturnLocation('') : setPickupLocation(returnLocation)}
                />
                <label htmlFor="sameLocation" className="ml-2 block text-sm text-gray-600">
                  Même lieu pour le retour
                </label>
              </div>
            </div>
          </div>
          
          {/* Options */}
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
          </div>
          
          {/* Infos sur la réservation */}
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-md flex items-start">
            <Info size={20} className="text-amber-500 mr-2 mt-0.5" />
            <p className="text-sm text-amber-700">
              Une pièce d'identité valide et un permis de conduire seront demandés lors de la prise en charge du véhicule.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading || !dateRange.from || !dateRange.to || !pickupLocation}
            className="w-full btn-primary flex justify-center items-center py-3 mt-6"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Réservation en cours...
              </span>
            ) : (
              "Confirmer la réservation"
            )}
          </button>
        </form>
      </div>
      
      {/* Récapitulatif */}
      <div>
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
      </div>
    </div>
  );
};

export default BookingForm;
