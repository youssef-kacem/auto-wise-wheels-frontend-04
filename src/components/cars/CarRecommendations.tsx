
import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, Star } from 'lucide-react';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  rating?: number;
  category?: string;
}

interface CarRecommendationsProps {
  currentCarId?: number;
  title?: string;
  subtitle?: string;
}

const CarRecommendations: React.FC<CarRecommendationsProps> = ({ 
  currentCarId,
  title = "Vous pourriez aussi aimer",
  subtitle = "Basé sur vos préférences et votre historique"
}) => {
  // Données fictives pour les recommandations
  const recommendedCars: Car[] = [
    {
      id: 5,
      brand: 'BMW',
      model: 'Série 3',
      year: 2024,
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      category: 'Berline'
    },
    {
      id: 6,
      brand: 'Mercedes',
      model: 'Classe E',
      year: 2023,
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      category: 'Berline'
    },
    {
      id: 7,
      brand: 'Audi',
      model: 'Q5',
      year: 2024,
      price: 130,
      imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      category: 'SUV'
    },
    {
      id: 8,
      brand: 'Tesla',
      model: 'Model Y',
      year: 2024,
      price: 140,
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      category: 'SUV Électrique'
    }
  ];
  
  // Filtrer pour ne pas montrer la voiture actuelle
  const filteredCars = currentCarId 
    ? recommendedCars.filter(car => car.id !== currentCarId) 
    : recommendedCars;
    
  // Limiter à 3 voitures maximum
  const displayCars = filteredCars.slice(0, 3);

  return (
    <div className="my-8">
      <div className="flex items-center mb-2">
        <ThumbsUp size={20} className="mr-2 text-autowise-blue" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayCars.map(car => (
          <Link to={`/cars/${car.id}`} key={car.id} className="group">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={car.imageUrl} 
                  alt={`${car.brand} ${car.model}`} 
                  className="h-48 w-full object-cover" 
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                  <Star size={14} className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{car.rating}</span>
                </div>
                {car.category && (
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs rounded-full px-2 py-1">
                    {car.category}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-autowise-blue transition-colors">
                  {car.brand} {car.model}
                </h3>
                <div className="text-sm text-gray-600 mt-1">{car.year}</div>
                <div className="flex justify-between items-center mt-3">
                  <div className="font-bold text-autowise-blue">{car.price} € <span className="text-sm font-normal text-gray-600">/ jour</span></div>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">Disponible</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarRecommendations;
