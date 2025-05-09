
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Filter, Search } from 'lucide-react';
import DateRangePicker from '@/components/booking/DateRangePicker';

// Données statiques pour la liste des voitures
const allCars = [
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
  {
    id: 5,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 75,
    rating: 4.4,
    hasAC: true,
    hasDriver: false,
  },
  {
    id: 6,
    brand: 'Renault',
    model: 'Clio',
    year: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 60,
    rating: 4.2,
    hasAC: false,
    hasDriver: false,
  },
  {
    id: 7,
    brand: 'Peugeot',
    model: '3008',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1583267746897-2cf4865e2ccc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 90,
    rating: 4.5,
    hasAC: true,
    hasDriver: false,
  },
  {
    id: 8,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    price: 85,
    rating: 4.6,
    hasAC: true,
    hasDriver: false,
  },
];

const brands = [...new Set(allCars.map(car => car.brand))];

const CarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [filteredCars, setFilteredCars] = useState(allCars);
  const [activeFilters, setActiveFilters] = useState({
    brand: [] as string[],
    hasAC: null as boolean | null,
    hasDriver: null as boolean | null,
    minYear: null as number | null,
    maxYear: null as number | null
  });
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Charger les paramètres de l'URL
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    if (locationParam) setLocation(locationParam);
    if (fromParam && toParam) {
      try {
        setDateRange({
          from: new Date(fromParam),
          to: new Date(toParam)
        });
      } catch (error) {
        console.error("Erreur lors de l'analyse des dates:", error);
      }
    }
  }, [searchParams]);

  // Appliquer les filtres
  const applyFilters = (filters: any) => {
    setActiveFilters(filters);
    
    let result = [...allCars];
    
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter(car => filters.brand.includes(car.brand));
    }
    
    if (filters.hasAC !== null) {
      result = result.filter(car => car.hasAC === filters.hasAC);
    }
    
    if (filters.hasDriver !== null) {
      result = result.filter(car => car.hasDriver === filters.hasDriver);
    }
    
    if (filters.minYear !== null) {
      result = result.filter(car => car.year >= filters.minYear);
    }
    
    if (filters.maxYear !== null) {
      result = result.filter(car => car.year <= filters.maxYear);
    }
    
    setFilteredCars(result);
  };

  // Recherche par localisation et dates
  const handleSearch = () => {
    // Dans une vraie application, cette recherche interrogerait une API
    // Pour l'instant, nous ignorons ces critères et utilisons seulement les autres filtres
    
    // Mettre à jour l'URL
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (dateRange.from) params.set('from', dateRange.from.toISOString());
    if (dateRange.to) params.set('to', dateRange.to.toISOString());
    setSearchParams(params);
  };

  const toggleFilterMenu = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container-autowise">
          <h1 className="text-3xl font-bold mb-6">Nos voitures disponibles</h1>
          
          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu de prise en charge
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Search size={18} />
                  </span>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Ville, Code postal"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dates de location
                </label>
                <DateRangePicker onChange={(range) => {
                  if (range) {
                    setDateRange(range);
                  }
                }} />
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={handleSearch}
                  className="w-full btn-primary"
                >
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filtres (version mobile) */}
            <div className="md:hidden mb-4">
              <button
                onClick={toggleFilterMenu}
                className="w-full py-3 px-4 bg-white border rounded-md shadow-sm flex justify-center items-center"
              >
                <Filter size={18} className="mr-2" />
                Filtrer les résultats
              </button>
              
              {filterMenuOpen && (
                <div className="mt-4 animate-fade-in">
                  <CarFilters onFilterChange={applyFilters} brands={brands} />
                </div>
              )}
            </div>
            
            {/* Filtres (version desktop) */}
            <div className="hidden md:block md:w-1/4">
              <CarFilters onFilterChange={applyFilters} brands={brands} />
            </div>
            
            {/* Résultats */}
            <div className="md:w-3/4">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} {...car} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <p className="text-lg text-gray-600 mb-4">Aucune voiture ne correspond à vos critères.</p>
                  <button
                    onClick={() => applyFilters({
                      brand: [],
                      hasAC: null,
                      hasDriver: null,
                      minYear: null,
                      maxYear: null
                    })}
                    className="btn-primary"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CarsPage;
