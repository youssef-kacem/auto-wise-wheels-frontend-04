
import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

interface CarOption {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  features: {
    [key: string]: boolean | string | number;
  };
}

const BookingComparator: React.FC = () => {
  // Données fictives pour démonstration
  const comparableCars: CarOption[] = [
    {
      id: 1,
      brand: 'BMW',
      model: 'Série 5',
      year: 2024,
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: {
        seats: 5,
        doors: 4,
        automatic: true,
        airCon: true,
        GPS: true,
        consumption: '7L/100km',
        bluetooth: true,
        cruiseControl: true,
        leatherSeats: true,
      },
    },
    {
      id: 2,
      brand: 'Mercedes',
      model: 'Classe C',
      year: 2023,
      price: 110,
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: {
        seats: 5,
        doors: 4,
        automatic: true,
        airCon: true,
        GPS: true,
        consumption: '6.5L/100km',
        bluetooth: true,
        cruiseControl: true,
        leatherSeats: false,
      },
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4',
      year: 2023,
      price: 95,
      imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: {
        seats: 5,
        doors: 4,
        automatic: false,
        airCon: true,
        GPS: false,
        consumption: '6L/100km',
        bluetooth: true,
        cruiseControl: false,
        leatherSeats: false,
      },
    }
  ];

  const featureLabels: {[key: string]: string} = {
    seats: 'Nombre de sièges',
    doors: 'Nombre de portes',
    automatic: 'Boîte automatique',
    airCon: 'Climatisation',
    GPS: 'GPS intégré',
    consumption: 'Consommation',
    bluetooth: 'Bluetooth',
    cruiseControl: 'Régulateur de vitesse',
    leatherSeats: 'Sièges en cuir',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-2">Comparateur de voitures</h2>
        <p className="text-gray-600">Comparez les options pour trouver la voiture parfaite pour vos besoins.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left font-medium text-gray-600">Caractéristiques</th>
              {comparableCars.map(car => (
                <th key={car.id} className="py-4 px-6 text-center">
                  <div className="mb-2">
                    <img 
                      src={car.imageUrl} 
                      alt={`${car.brand} ${car.model}`} 
                      className="h-20 w-32 object-cover rounded-md mx-auto" 
                    />
                  </div>
                  <div className="font-semibold">{car.brand} {car.model}</div>
                  <div className="text-sm text-gray-500">{car.year}</div>
                  <div className="font-bold text-autowise-blue mt-1">{car.price}€ / jour</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {Object.keys(featureLabels).map(feature => (
              <tr key={feature} className="hover:bg-gray-50">
                <td className="py-3 px-6 text-left">{featureLabels[feature]}</td>
                {comparableCars.map(car => (
                  <td key={`${car.id}-${feature}`} className="py-3 px-6 text-center">
                    {typeof car.features[feature] === 'boolean' ? (
                      car.features[feature] ? 
                        <Check className="mx-auto text-green-600" /> : 
                        <X className="mx-auto text-red-500" />
                    ) : (
                      <span>{car.features[feature]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="py-4 px-6"></td>
              {comparableCars.map(car => (
                <td key={`${car.id}-action`} className="py-4 px-6 text-center">
                  <a 
                    href={`/booking/${car.id}`}
                    className="inline-flex items-center justify-center py-2 px-4 bg-autowise-blue text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Réserver <ArrowRight size={16} className="ml-2" />
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BookingComparator;
