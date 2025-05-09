
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const EmptyReservationState: React.FC = () => {
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
};

export default EmptyReservationState;
