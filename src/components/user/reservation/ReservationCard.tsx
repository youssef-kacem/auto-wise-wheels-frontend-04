
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Calendar, MapPin, Check, X } from 'lucide-react';
import { Reservation } from '@/types/supabase';
import { getPublicImageUrl } from '@/integrations/supabase/client';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel: (id: string) => Promise<void>;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCancel }) => {
  // Function to get the color of the status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to translate the status
  const translateStatus = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const carImage = reservation.car?.images?.find((img) => img.is_primary) || 
                   reservation.car?.images?.[0];
  const imageUrl = carImage 
    ? getPublicImageUrl(carImage.url) 
    : 'https://via.placeholder.com/300x200?text=Pas+d%27image';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/4 mb-4 md:mb-0">
          <img 
            src={imageUrl} 
            alt={`${reservation.car?.brand} ${reservation.car?.model}`} 
            className="w-full h-40 md:h-32 object-cover rounded-md"
          />
        </div>
        
        {/* Details */}
        <div className="md:w-2/4 md:px-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold mb-2">{reservation.car?.brand} {reservation.car?.model}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status || '')}`}>
              {translateStatus(reservation.status || '')}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start">
              <Calendar size={16} className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-sm">
                Du {new Date(reservation.start_date).toLocaleDateString('fr-FR')} au {new Date(reservation.end_date).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div className="flex items-start">
              <MapPin size={16} className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
              <div className="text-sm">
                <div>Prise en charge: {reservation.pickup_location}</div>
                <div>Retour: {reservation.return_location}</div>
              </div>
            </div>
            {reservation.with_driver && (
              <div className="flex items-center">
                <Check size={16} className="mr-2 text-green-500 flex-shrink-0" />
                <span className="text-sm">Avec chauffeur</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="md:w-1/4 flex flex-col justify-between items-end mt-4 md:mt-0">
          <div className="text-right">
            <div className="text-xl font-bold text-autowise-blue">{reservation.total_price} €</div>
            <div className="text-xs text-gray-500">Prix total</div>
          </div>
          
          <div className="flex flex-col space-y-2 mt-4 w-full">
            <Link 
              to={`/cars/${reservation.car_id}`} 
              className="text-sm text-center text-autowise-blue hover:underline"
            >
              Voir la voiture
            </Link>
            
            {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
              <button 
                onClick={() => onCancel(reservation.id)}
                className="flex items-center justify-center text-sm px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                <X size={14} className="mr-1" />
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
