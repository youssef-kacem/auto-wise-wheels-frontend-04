
import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Car, Calendar, MapPin, Check, X } from 'lucide-react';

// Type pour les réservations
interface Reservation {
  id: number;
  carId: number;
  carBrand: string;
  carModel: string;
  carImage: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  returnLocation: string;
  withDriver: boolean;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const mockReservations: Reservation[] = [
  {
    id: 1,
    carId: 1,
    carBrand: 'Audi',
    carModel: 'A5',
    carImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    pickupLocation: 'Paris, 75008',
    returnLocation: 'Paris, 75008',
    withDriver: false,
    price: 480,
    status: 'confirmed',
  },
  {
    id: 2,
    carId: 3,
    carBrand: 'Mercedes',
    carModel: 'Classe E',
    carImage: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startDate: '2025-07-20',
    endDate: '2025-07-25',
    pickupLocation: 'Lyon, 69002',
    returnLocation: 'Lyon, 69002',
    withDriver: true,
    price: 950,
    status: 'pending',
  },
  {
    id: 3,
    carId: 5,
    carBrand: 'BMW',
    carModel: 'X5',
    carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startDate: '2025-05-05',
    endDate: '2025-05-08',
    pickupLocation: 'Marseille, 13008',
    returnLocation: 'Nice, 06000',
    withDriver: false,
    price: 620,
    status: 'completed',
  }
];

const UserReservations: React.FC = () => {
  const { toast } = useToast();
  
  // Fonction pour annuler une réservation
  const handleCancelReservation = (id: number) => {
    // Normalement, appel à l'API pour annuler la réservation
    toast({
      title: "Réservation annulée",
      description: "Votre réservation a été annulée avec succès.",
    });
  };

  // Fonction pour obtenir la couleur du statut
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

  // Fonction pour traduire le statut
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

  // Aucune réservation
  if (mockReservations.length === 0) {
    return (
      <div className="text-center py-10">
        <Car size={48} className="mx-auto text-gray-300 mb-3" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune réservation</h3>
        <p className="text-gray-500 mb-6">Vous n'avez pas encore effectué de réservation</p>
        <Link to="/cars" className="btn-primary inline-block">
          Explorer nos voitures
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
      
      {mockReservations.map((reservation) => (
        <div 
          key={reservation.id} 
          className="bg-white rounded-lg shadow-sm border p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/4 mb-4 md:mb-0">
              <img 
                src={reservation.carImage} 
                alt={`${reservation.carBrand} ${reservation.carModel}`} 
                className="w-full h-40 md:h-32 object-cover rounded-md"
              />
            </div>
            
            {/* Détails */}
            <div className="md:w-2/4 md:px-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold mb-2">{reservation.carBrand} {reservation.carModel}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                  {translateStatus(reservation.status)}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <Calendar size={16} className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">
                    Du {new Date(reservation.startDate).toLocaleDateString('fr-FR')} au {new Date(reservation.endDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                  <div className="text-sm">
                    <div>Prise en charge: {reservation.pickupLocation}</div>
                    <div>Retour: {reservation.returnLocation}</div>
                  </div>
                </div>
                {reservation.withDriver && (
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
                <div className="text-xl font-bold text-autowise-blue">{reservation.price} €</div>
                <div className="text-xs text-gray-500">Prix total</div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-4 w-full">
                <Link 
                  to={`/cars/${reservation.carId}`} 
                  className="text-sm text-center text-autowise-blue hover:underline"
                >
                  Voir la voiture
                </Link>
                
                {reservation.status === 'pending' && (
                  <button 
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="flex items-center justify-center text-sm px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <X size={14} className="mr-1" />
                    Annuler
                  </button>
                )}
                
                {reservation.status === 'confirmed' && (
                  <button 
                    onClick={() => handleCancelReservation(reservation.id)}
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
      ))}
    </div>
  );
};

export default UserReservations;
