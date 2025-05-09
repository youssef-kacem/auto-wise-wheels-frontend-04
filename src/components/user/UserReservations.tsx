
import React from 'react';
import { useReservations } from '@/hooks/useReservations';
import ReservationCard from './reservation/ReservationCard';
import EmptyReservationState from './reservation/EmptyReservationState';
import LoadingState from './reservation/LoadingState';

const UserReservations: React.FC = () => {
  const { reservations, loading, handleCancelReservation } = useReservations();

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
