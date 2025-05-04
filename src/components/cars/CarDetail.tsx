
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Star, Info, User, Calendar, Thermometer, Fuel, Settings, ChevronRight } from 'lucide-react';

interface CarDetailProps {
  car: {
    id: number;
    brand: string;
    model: string;
    year: number;
    images: string[];
    price: number;
    rating: number;
    description: string;
    hasAC: boolean;
    hasDriver: boolean;
    fuelType: string;
    transmission: string;
    seats: number;
    category: string;
    features: string[];
  };
}

const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(car.images[0]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Navigation fil d'Ariane */}
      <div className="bg-gray-50 py-2 px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-autowise-blue">Accueil</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/cars" className="hover:text-autowise-blue">Voitures</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-autowise-blue font-medium">{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{car.brand} {car.model}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm font-medium">{car.rating.toFixed(1)}</span>
              </div>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">Année: {car.year}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{car.category}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-autowise-blue">{car.price} €<span className="text-sm text-gray-500 font-normal">/jour</span></div>
            <Link 
              to={`/booking/${car.id}`} 
              className="mt-2 block w-full md:w-auto btn-primary text-center"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img 
              src={selectedImage} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="flex md:flex-col gap-2 overflow-auto md:h-80">
            {car.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${car.brand} ${car.model} ${index+1}`}
                className={`h-20 w-28 md:w-full md:h-24 object-cover rounded cursor-pointer ${selectedImage === img ? 'ring-2 ring-autowise-blue' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Caractéristiques et description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">{car.description}</p>
            
            <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <User className="text-autowise-blue mb-2" />
                <span className="text-sm font-medium">{car.seats} sièges</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Fuel className="text-autowise-blue mb-2" />
                <span className="text-sm font-medium">{car.fuelType}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Settings className="text-autowise-blue mb-2" />
                <span className="text-sm font-medium">{car.transmission}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-autowise-blue mb-2" />
                <span className="text-sm font-medium">{car.year}</span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Options et équipements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              <div className="flex items-center">
                {car.hasAC ? (
                  <>
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-700">Climatisation</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-500 mr-2" />
                    <span className="text-gray-700">Pas de climatisation</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {car.hasDriver ? (
                  <>
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-700">Chauffeur inclus</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-500 mr-2" />
                    <span className="text-gray-700">Sans chauffeur</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Encadré latéral */}
          <div>
            <div className="bg-gray-50 rounded-lg p-5 border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Info size={18} className="mr-2 text-autowise-blue" />
                À propos de cette location
              </h3>
              
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700">Annulation gratuite jusqu'à 24h avant</span>
                </li>
                <li className="flex">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700">Kilométrage illimité inclus</span>
                </li>
                <li className="flex">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700">Assurance tous risques incluse</span>
                </li>
                <li className="flex">
                  <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700">Assistance 24/7</span>
                </li>
              </ul>
              
              <div className="mt-5 pt-5 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Comment ça marche</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="bg-autowise-blue text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span className="text-sm text-gray-700">Réservez votre voiture</span>
                  </li>
                  <li className="flex">
                    <span className="bg-autowise-blue text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span className="text-sm text-gray-700">Confirmation immédiate</span>
                  </li>
                  <li className="flex">
                    <span className="bg-autowise-blue text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span className="text-sm text-gray-700">Récupérez votre véhicule</span>
                  </li>
                </ol>
              </div>
              
              <Link 
                to={`/booking/${car.id}`} 
                className="mt-5 block w-full btn-primary text-center"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
