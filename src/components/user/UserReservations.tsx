
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Car, Calendar, MapPin, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cancelReservation } from '@/services/reservationService';
import { getPublicImageUrl } from '@/integrations/supabase/client';
import { Reservation, CarImage } from '@/types/supabase';
import Currency from '@/components/common/Currency';

interface CarWithImages {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images?: CarImage[];
}

interface ReservationWithCar extends Omit<Reservation, 'car'> {
  car?: CarWithImages;
}

const UserReservations: React.FC = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<ReservationWithCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Vérifier la session de l'utilisateur
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadReservations = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('reservations')
          .select(`
            *,
            car:car_id (
              id,
              brand,
              model,
              year,
              price,
              images:car_images(*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          // Convertir les données et gérer les images manquantes
          const typedReservations = data.map(res => {
            // Assurer que additional_options est du bon type
            const additional_options = typeof res.additional_options === 'string' 
              ? JSON.parse(res.additional_options) 
              : res.additional_options || {};
              
            // Gérer le cas où car.images pourrait être une erreur de requête
            let processedCar: CarWithImages | undefined;
            
            if (res.car) {
              // Vérifier si images est une erreur de requête ou un tableau
              const carImages = Array.isArray(res.car.images) ? res.car.images : [];
              
              // Créer un objet car correctement typé
              processedCar = {
                id: res.car.id,
                brand: res.car.brand,
                model: res.car.model,
                year: res.car.year,
                price: res.car.price,
                images: carImages
              };
            }
              
            return {
              ...res,
              additional_options,
              car: processedCar
            } as ReservationWithCar;
          });
          
          setReservations(typedReservations);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos réservations.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [user, toast]);

  // Fonction pour annuler une réservation
  const handleCancelReservation = async (id: string) => {
    try {
      await cancelReservation(id);
      // Mettre à jour l'état local
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation.",
        variant: "destructive",
      });
    }
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

  // Affichage de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-autowise-blue"></div>
      </div>
    );
  }

  // Aucune réservation
  if (reservations.length === 0) {
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
      
      {reservations.map((reservation) => {
        // Sécuriser l'accès aux images
        const carImage = reservation.car?.images?.find((img: any) => img.is_primary) || 
                         reservation.car?.images?.[0];
        const imageUrl = carImage ? getPublicImageUrl(carImage.url) : 'https://via.placeholder.com/300x200?text=Pas+d%27image';

        return (
          <div 
            key={reservation.id} 
            className="bg-white rounded-lg shadow-sm border p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/4 mb-4 md:mb-0">
                <img 
                  src={imageUrl} 
                  alt={`${reservation.car?.brand} ${reservation.car?.model}`} 
                  className="w-full h-40 md:h-32 object-cover rounded-md"
                />
              </div>
              
              {/* Détails */}
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
                  <div className="text-xl font-bold text-autowise-blue">
                    <Currency amount={reservation.total_price} />
                  </div>
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
        );
      })}
    </div>
  );
};

export default UserReservations;
