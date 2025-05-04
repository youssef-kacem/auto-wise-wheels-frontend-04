
import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../cars/CarCard';

// Données statiques pour les voitures en vedette
const featuredCars = [
  {
    id: 1,
    brand: 'BMW',
    model: 'Série 5',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 120,
    rating: 4.8,
    hasAC: true,
    hasDriver: false,
  },
  {
    id: 2,
    brand: 'Mercedes',
    model: 'Classe C',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 110,
    rating: 4.7,
    hasAC: true,
    hasDriver: true,
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 95,
    rating: 4.6,
    hasAC: true,
    hasDriver: false,
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 130,
    rating: 4.9,
    hasAC: true,
    hasDriver: false,
  },
];

const FeaturedCars = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-autowise">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos voitures en vedette</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de voitures de qualité, disponibles à la location. 
            Confort, sécurité et élégance sont au rendez-vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/cars" 
            className="btn-primary inline-flex items-center"
          >
            Voir toutes nos voitures
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
