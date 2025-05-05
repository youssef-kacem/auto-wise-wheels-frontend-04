
import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface PaymentModuleProps {
  totalPrice: number;
  loading: boolean;
  onProcessPayment: (paymentData: any) => void;
}

const PaymentModule: React.FC<PaymentModuleProps> = ({ totalPrice, loading, onProcessPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | 'applePay'>('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (paymentMethod === 'creditCard') {
      if (!cardNumber.trim()) {
        newErrors.cardNumber = 'Numéro de carte requis';
      } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Numéro de carte invalide';
      }
      
      if (!cardName.trim()) {
        newErrors.cardName = 'Nom sur la carte requis';
      }
      
      if (!expiry.trim()) {
        newErrors.expiry = 'Date d\'expiration requise';
      } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry = 'Format invalide (MM/YY)';
      }
      
      if (!cvc.trim()) {
        newErrors.cvc = 'Code de sécurité requis';
      } else if (!/^\d{3,4}$/.test(cvc)) {
        newErrors.cvc = 'CVC invalide';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onProcessPayment({
        method: paymentMethod,
        cardNumber: cardNumber,
        cardName: cardName,
        expiry: expiry,
        cvc: cvc,
        saveCard: saveCard
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium">Méthodes de paiement</h3>
        <div className="flex items-center text-green-600 text-sm">
          <Lock size={14} className="mr-1" />
          Paiement sécurisé
        </div>
      </div>

      <RadioGroup 
        defaultValue="creditCard" 
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as any)}
        className="mb-6"
      >
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 border rounded-lg p-3 bg-white">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="flex-grow cursor-pointer">
              <div className="flex items-center justify-between">
                <span>Carte de crédit / débit</span>
                <div className="flex gap-1">
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-6" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" className="h-6" />
                </div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-3 bg-white">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex-grow cursor-pointer">
              <div className="flex items-center justify-between">
                <span>PayPal</span>
                <img src="https://cdn-icons-png.flaticon.com/128/196/196566.png" alt="PayPal" className="h-6" />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-3 bg-white">
            <RadioGroupItem value="applePay" id="applePay" />
            <Label htmlFor="applePay" className="flex-grow cursor-pointer">
              <div className="flex items-center justify-between">
                <span>Apple Pay</span>
                <img src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png" alt="Apple Pay" className="h-6" />
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>

      {paymentMethod === 'creditCard' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Numéro de carte</Label>
            <Input 
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cardName">Nom sur la carte</Label>
            <Input 
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className={errors.cardName ? "border-red-500" : ""}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.cardName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Date d'expiration</Label>
              <Input 
                id="expiry"
                value={expiry}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length === 2 && !val.includes('/') && expiry.length === 1) {
                    setExpiry(val + '/');
                  } else {
                    setExpiry(val);
                  }
                }}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiry ? "border-red-500" : ""}
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.expiry}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input 
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="123"
                maxLength={4}
                className={errors.cvc ? "border-red-500" : ""}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.cvc}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch 
              id="saveCard" 
              checked={saveCard} 
              onCheckedChange={setSaveCard}
            />
            <Label htmlFor="saveCard">Enregistrer cette carte pour les futures réservations</Label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center py-3 mt-6"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
            ) : (
              <>
                <CreditCard size={18} className="mr-2" />
                Payer {totalPrice} €
              </>
            )}
          </button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="text-center py-6">
          <img src="https://cdn-icons-png.flaticon.com/128/196/196566.png" alt="PayPal" className="h-10 mx-auto mb-4" />
          <p className="mb-4">Vous allez être redirigé vers PayPal pour finaliser votre paiement.</p>
          <button
            onClick={() => onProcessPayment({ method: 'paypal' })}
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Redirection...' : `Payer avec PayPal (${totalPrice} €)`}
          </button>
        </div>
      )}

      {paymentMethod === 'applePay' && (
        <div className="text-center py-6">
          <img src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png" alt="Apple Pay" className="h-10 mx-auto mb-4" />
          <p className="mb-4">Cliquez sur le bouton ci-dessous pour payer avec Apple Pay.</p>
          <button
            onClick={() => onProcessPayment({ method: 'applePay' })}
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded-lg flex items-center justify-center"
          >
            {loading ? (
              'Traitement...'
            ) : (
              <>
                <svg width="24px" height="24px" viewBox="0 0 24 24" className="mr-2">
                  <path fill="currentColor" d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h9.694 c0.271,0,0.489-0.219,0.489-0.489C18.209,5.23,17.991,5.011,17.72,5.011z"></path>
                  <path fill="currentColor" d="M8.026,8.987h3.242c0.271,0,0.49-0.219,0.49-0.489c0-0.271-0.219-0.49-0.49-0.49H8.026 c-0.271,0-0.49,0.219-0.49,0.49C7.536,8.769,7.755,8.987,8.026,8.987z"></path>
                  <path fill="currentColor" d="M12.507,11.764h-4.48c-0.271,0-0.49,0.22-0.49,0.49c0,0.271,0.219,0.489,0.49,0.489h4.48 c0.271,0,0.489-0.219,0.489-0.489C12.996,11.984,12.778,11.764,12.507,11.764z"></path>
                  <path fill="currentColor" d="M17.13,11.764H15.62c-0.271,0-0.49,0.22-0.49,0.49c0,0.271,0.219,0.489,0.49,0.489h1.51 c0.271,0,0.49-0.219,0.49-0.489C17.62,11.984,17.401,11.764,17.13,11.764z"></path>
                  <path fill="currentColor" d="M8.025,15.031h4.481c0.271,0,0.489-0.219,0.489-0.489c0-0.271-0.219-0.49-0.489-0.49h-4.481 c-0.271,0-0.49,0.219-0.49,0.49C7.535,14.812,7.754,15.031,8.025,15.031z"></path>
                  <path fill="currentColor" d="M17.086,14.052h-1.511c-0.271,0-0.49,0.219-0.49,0.49c0,0.271,0.219,0.489,0.49,0.489h1.511 c0.271,0,0.49-0.219,0.49-0.489C17.576,14.271,17.357,14.052,17.086,14.052z"></path>
                </svg>
                Payer avec Apple Pay
              </>
            )}
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Lock size={14} className="mr-1" /> 
          Paiement sécurisé avec SSL | Toutes vos données sont chiffrées
        </div>
      </div>
    </div>
  );
};

export default PaymentModule;
