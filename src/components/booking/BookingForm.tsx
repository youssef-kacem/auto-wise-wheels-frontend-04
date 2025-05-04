
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import DateSelection from './DateSelection';
import LocationSelection from './LocationSelection';
import BookingOptions from './BookingOptions';
import BookingSummary from './BookingSummary';
import { calculateDays, calculateTotalPrice } from '@/utils/bookingCalculations';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
}

interface BookingFormProps {
  car?: Car;
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

  const numberOfDays = calculateDays(dateRange);
  const totalPrice = calculateTotalPrice(
    car?.price,
    numberOfDays,
    withDriver,
    additionalOptions,
    availableOptions
  );

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
          <DateSelection onChange={setDateRange} />
          
          {/* Lieux de prise en charge et de retour */}
          <LocationSelection 
            pickupLocation={pickupLocation}
            returnLocation={returnLocation}
            setPickupLocation={setPickupLocation}
            setReturnLocation={setReturnLocation}
          />
          
          {/* Options */}
          <BookingOptions 
            withDriver={withDriver}
            setWithDriver={setWithDriver}
            additionalOptions={additionalOptions}
            handleOptionChange={handleOptionChange}
            availableOptions={availableOptions}
          />
          
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
        <BookingSummary
          car={car}
          dateRange={dateRange}
          pickupLocation={pickupLocation}
          returnLocation={returnLocation}
          withDriver={withDriver}
          additionalOptions={additionalOptions}
          availableOptions={availableOptions}
          numberOfDays={numberOfDays}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default BookingForm;
