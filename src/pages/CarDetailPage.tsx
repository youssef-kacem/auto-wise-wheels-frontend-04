
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CarDetail from '@/components/cars/CarDetail';
import { useToast } from '@/hooks/use-toast';

// Données statiques pour les voitures
const carsData = [
  {
    id: 1,
    brand: 'BMW',
    model: 'Série 5',
    year: 2024,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556157382-97eda2f9e37c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    price: 120,
    rating: 4.8,
    description: "La BMW Série 5 incarne l'équilibre parfait entre luxe et sportivité. Avec son design élégant et ses performances exceptionnelles, elle offre une expérience de conduite inégalée. Équipée des dernières technologies en matière de sécurité et de confort, cette berline premium est idéale pour les déplacements professionnels et les longs trajets.",
    hasAC: true,
    hasDriver: false,
    fuelType: 'Essence',
    transmission: 'Automatique',
    seats: 5,
    category: 'Berline',
    features: [
      'Système de navigation GPS',
      'Sièges en cuir',
      'Système audio premium',
      'Toit ouvrant panoramique',
      'Caméra de recul',
      'Bluetooth',
      'Régulateur de vitesse adaptatif',
      'Apple CarPlay / Android Auto',
    ],
  },
  {
    id: 2,
    brand: 'Mercedes',
    model: 'Classe C',
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603053240808-24479210ba26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605270396307-d00ba5dfdda5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    price: 110,
    rating: 4.7,
    description: "La Mercedes Classe C allie élégance, confort et performances dans un ensemble harmonieux. Son intérieur raffiné et ses équipements haut de gamme en font une référence dans sa catégorie. La qualité de fabrication allemande se ressent dans chaque détail, offrant une expérience premium à tous les occupants.",
    hasAC: true,
    hasDriver: true,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    category: 'Berline',
    features: [
      'Système MBUX',
      'Sièges chauffants',
      'Affichage tête haute',
      'Éclairage d\'ambiance',
      'Assistant de stationnement',
      'Système audio Burmester',
      'Suspension pneumatique',
      'Aides à la conduite',
    ],
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571730471078-8e00c4981d53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601928782843-5aa72ec6c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    price: 95,
    rating: 4.6,
    description: "L'Audi A4 est synonyme de sophistication technologique et de confort. Sa ligne élégante et ses performances dynamiques en font un choix privilégié pour les conducteurs exigeants. Le cockpit digital et les systèmes d'assistance à la conduite offrent une expérience moderne et sécurisée.",
    hasAC: true,
    hasDriver: false,
    fuelType: 'Essence',
    transmission: 'Automatique',
    seats: 5,
    category: 'Berline',
    features: [
      'Audi Virtual Cockpit',
      'MMI Navigation plus',
      'Caméras 360°',
      'Sièges sport',
      'Système audio Bang & Olufsen',
      'Jantes alliage 18"',
      'Phares Matrix LED',
      'Assistance au maintien de voie',
    ],
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553260168-69b041873e08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    price: 130,
    rating: 4.9,
    description: "La Tesla Model 3 représente l'avenir de l'automobile avec sa motorisation 100% électrique. Ses performances impressionnantes et son autonomie généreuse en font un véhicule idéal pour une utilisation quotidienne et les voyages longue distance. Son intérieur minimaliste et son grand écran tactile offrent une expérience futuriste.",
    hasAC: true,
    hasDriver: false,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    seats: 5,
    category: 'Berline électrique',
    features: [
      'Autopilote',
      'Écran tactile 15"',
      'Toit en verre',
      'Supercharge',
      'Mode sentinelle',
      'Mise à jour à distance',
      'Application mobile',
      'Accès sans clé',
    ],
  },
  // Autres voitures...
];

const CarDetailPage = () => {
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

  if (loading) {
    return (
      <MainLayout>
        <div className="container-autowise py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-72 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-autowise py-8">
        {car && <CarDetail car={car} />}
      </div>
    </MainLayout>
  );
};

export default CarDetailPage;
