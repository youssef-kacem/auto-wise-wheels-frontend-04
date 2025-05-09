
import React from 'react';
import { useReservations } from '@/hooks/useReservations';
import ReservationCard from './reservation/ReservationCard';
import EmptyReservationState from './reservation/EmptyReservationState';
import LoadingState from './reservation/LoadingState';
import { useAuth } from '@/contexts/AuthContext';
import { cancelReservation } from '@/services/reservationService';
import { useToast } from '@/hooks/use-toast';

const UserReservations: React.FC = () => {
  const { user } = useAuth();
  const { reservations, loading, error } = useReservations(user?.id);
  const { toast } = useToast();

  const handleCancelReservation = async (id: string) => {
    try {
      await cancelReservation(id);
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès",
      });
      // Reload reservations (this will happen automatically if useReservations is set up with react-query)
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show empty state when no reservations
  if (reservations.length === 0) {
    return <EmptyReservationState />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
      
      {reservations.map((reservation) => (
        <ReservationCard 
          key={reservation.id}
          reservation={reservation}
          onCancel={handleCancelReservation}
        />
      ))}
    </div>
  );
};

export default UserReservations;
