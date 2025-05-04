
import React from 'react';
import { ShieldCheck, Clock, MapPin, Users } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-16">
      <div className="container-autowise">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AutoWise vous propose une variété de services adaptés à vos besoins.
            Que vous recherchiez une voiture pour un usage personnel ou professionnel, nous avons ce qu'il vous faut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-autowise-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Assurance complète</h3>
            <p className="text-gray-600">
              Tous nos véhicules sont entièrement assurés. Profitez de votre location en toute tranquillité.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
              <Clock className="h-8 w-8 text-autowise-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Disponibilité 24/7</h3>
            <p className="text-gray-600">
              Service client disponible à tout moment. Assistance routière incluse pour tous les véhicules.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
              <MapPin className="h-8 w-8 text-autowise-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Livraison & reprise</h3>
            <p className="text-gray-600">
              Nous vous livrons le véhicule à l'adresse de votre choix et le récupérons à la fin de votre location.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
              <Users className="h-8 w-8 text-autowise-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Chauffeur privé</h3>
            <p className="text-gray-600">
              Option chauffeur disponible sur tous nos véhicules. Nos chauffeurs sont professionnels et expérimentés.
            </p>
          </div>
        </div>

        {/* Bannière avantages */}
        <div className="mt-16 bg-autowise-blue rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">100+</h4>
              <p className="text-gray-200">Véhicules disponibles</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">24/7</h4>
              <p className="text-gray-200">Service client</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-2">4.9/5</h4>
              <p className="text-gray-200">Note client moyenne</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
