
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectionProps {
  pickupLocation: string;
  returnLocation: string;
  setPickupLocation: (location: string) => void;
  setReturnLocation: (location: string) => void;
}

const LocationSelection: React.FC<LocationSelectionProps> = ({
  pickupLocation,
  returnLocation,
  setPickupLocation,
  setReturnLocation,
}) => {
  return (
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
  );
};

export default LocationSelection;
