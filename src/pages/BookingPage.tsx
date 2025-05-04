
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BookingForm from '@/components/booking/BookingForm';
import { useToast } from '@/hooks/use-toast';

// Données statiques pour les voitures
const carsData = [
  {
    id: 1,
    brand: 'BMW',
    model: 'Série 5',
    year: 2024,
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    brand: 'Mercedes',
    model: 'Classe C',
    year: 2023,
    price: 110,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 95,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 130,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
];

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simuler une requête API
    setLoading(true);
    setTimeout(() => {
      const foundCar = carsData.find(c => c.id === parseInt(id || '0'));
      
      if (foundCar) {
        setCar(foundCar);
      } else {
        toast({
          title: "Erreur",
          description: "La voiture demandée n'a pas été trouvée.",
          variant: "destructive",
        });
        navigate('/cars');
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate, toast]);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container-autowise">
          <h1 className="text-3xl font-bold mb-8">Réservation</h1>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-gray-200 rounded mb-4"></div>
                </div>
                <div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {car && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Réservation de {car.brand} {car.model} ({car.year})
                    </h2>
                    <p className="text-gray-600">
                      Complétez le formulaire ci-dessous pour réserver cette voiture.
                    </p>
                  </div>
                  
                  <BookingForm car={car} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;
