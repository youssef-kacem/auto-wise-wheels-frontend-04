
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import DateSelection from './DateSelection';
import LocationSelection from './LocationSelection';
import BookingOptions from './BookingOptions';
import BookingSummary from './BookingSummary';
import PaymentModule from './PaymentModule';
import { calculateDays, calculateTotalPrice } from '@/utils/bookingCalculations';
import { CreditCard, Check } from 'lucide-react';

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
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'confirmation'>('details');
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

  // Fonction pour vérifier si le formulaire est valide
  const isFormValid = () => {
    return dateRange.from && dateRange.to && pickupLocation;
  };

  // Passer à l'écran de paiement
  const handleContinueToPayment = () => {
    if (!isFormValid()) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    setPaymentStep('payment');
  };

  // Soumettre le paiement
  const handleProcessPayment = (paymentData: any) => {
    setLoading(true);
    
    // Simulation de traitement de paiement
    setTimeout(() => {
      setPaymentStep('confirmation');
      setLoading(false);
      toast({
        title: "Paiement accepté",
        description: "Votre réservation a été confirmée avec succès.",
      });
    }, 1500);
  };

  // Revenir à l'étape détails
  const handleBackToDetails = () => {
    setPaymentStep('details');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {paymentStep === 'details' && (
          <form className="space-y-6">
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
              type="button"
              onClick={handleContinueToPayment}
              disabled={!isFormValid()}
              className="w-full btn-primary flex justify-center items-center py-3 mt-6"
            >
              <CreditCard size={18} className="mr-2" />
              Continuer vers le paiement
            </button>
          </form>
        )}

        {paymentStep === 'payment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Paiement</h2>
              <button 
                onClick={handleBackToDetails}
                className="text-sm text-autowise-blue hover:underline"
              >
                Revenir aux détails
              </button>
            </div>
            
            <PaymentModule 
              totalPrice={totalPrice}
              onProcessPayment={handleProcessPayment}
              loading={loading}
            />
          </div>
        )}

        {paymentStep === 'confirmation' && (
          <div className="bg-white border rounded-lg p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Réservation confirmée!</h2>
            <p className="text-gray-600">
              Merci pour votre réservation. Un email de confirmation a été envoyé à votre adresse.
            </p>
            <div className="p-4 bg-gray-50 rounded-lg border mt-6 text-left">
              <h3 className="font-medium mb-2">Détails de la réservation</h3>
              <p><span className="font-medium">Référence:</span> #REF-{Math.floor(Math.random() * 1000000)}</p>
              <p><span className="font-medium">Véhicule:</span> {car?.brand} {car?.model}</p>
              <p><span className="font-medium">Dates:</span> {dateRange.from && dateRange.to ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}` : 'N/A'}</p>
              <p><span className="font-medium">Lieu de prise en charge:</span> {pickupLocation}</p>
            </div>
          </div>
        )}
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
