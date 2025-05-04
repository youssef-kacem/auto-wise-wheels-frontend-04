
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Car } from 'lucide-react';
import DateRangePicker from '../booking/DateRangePicker';

const Hero = () => {
  const [location, setLocation] = React.useState('');
  const [dateRange, setDateRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection vers la page de recherche avec les paramètres
    if (location && dateRange.from && dateRange.to) {
      const params = new URLSearchParams();
      params.set('location', location);
      params.set('from', dateRange.from.toISOString());
      params.set('to', dateRange.to.toISOString());
      
      window.location.href = `/cars?${params.toString()}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-autowise-blue to-autowise-blue-light text-white">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="container-autowise relative z-10 py-16 lg:py-28">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Découvrez la liberté avec AutoWise
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Louez la voiture idéale pour vos déplacements, avec ou sans chauffeur
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-800">
          <form onSubmit={handleSearch} className="space-y-6">
            <h2 className="text-xl font-semibold text-center mb-2">Trouvez votre voiture idéale</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu de prise en charge
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <MapPin size={18} />
                  </span>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Ville, Code postal"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
                  Dates de location
                </label>
                <DateRangePicker onChange={setDateRange} />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-autowise-blue text-white py-3 px-6 rounded-md hover:bg-autowise-blue-dark transition-colors duration-300 flex items-center justify-center"
              disabled={!location || !dateRange.from || !dateRange.to}
            >
              <Car size={18} className="mr-2" />
              Rechercher une voiture
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/cars" className="text-autowise-blue hover:underline flex items-center justify-center">
              Voir toutes nos voitures
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
