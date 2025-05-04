
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Thermometer, User, Check, X } from 'lucide-react';

interface CarCardProps {
  id: number;
  brand: string;
  model: string;
  year: number;
  imageUrl: string;
  price: number;
  rating: number;
  hasAC: boolean;
  hasDriver: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  brand,
  model,
  year,
  imageUrl,
  price,
  rating,
  hasAC,
  hasDriver,
}) => {
  return (
    <div className="car-card">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${brand} ${model}`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-semibold text-autowise-blue">
          {year}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {brand} {model}
          </h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`flex items-center text-xs px-2 py-1 rounded ${hasAC ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            <Thermometer size={14} className="mr-1" />
            {hasAC ? 'Climatisation' : 'Sans clim'}
          </span>
          <span className={`flex items-center text-xs px-2 py-1 rounded ${hasDriver ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
            <User size={14} className="mr-1" />
            {hasDriver ? 'Avec chauffeur' : 'Sans chauffeur'}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <p className="text-lg font-bold text-autowise-blue">
            {price} €<span className="text-xs text-gray-500 font-normal">/jour</span>
          </p>
          <Link 
            to={`/cars/${id}`} 
            className="bg-autowise-blue text-white px-3 py-1 rounded-md text-sm hover:bg-autowise-blue-dark transition-colors"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
