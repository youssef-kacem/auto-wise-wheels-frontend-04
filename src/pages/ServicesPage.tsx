
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ShieldCheck, Clock, MapPin, Users, Car, CreditCard, Star, Tool } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <MainLayout>
      <div className="bg-autowise-blue text-white py-16">
        <div className="container-autowise">
          <h1 className="text-4xl font-bold mb-4 text-center">Nos Services</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            AutoWise propose une gamme complète de services de location de voitures pour répondre à tous vos besoins, 
            qu'ils soient personnels ou professionnels.
          </p>
        </div>
      </div>
      
      {/* Services principaux */}
      <section className="py-16">
        <div className="container-autowise">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-autowise-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Assurance complète</h3>
              <p className="text-gray-600">
                Tous nos véhicules sont entièrement assurés. Profitez de votre location en toute tranquillité avec une couverture complète incluse dans le prix.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
                <Clock className="h-8 w-8 text-autowise-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Disponibilité 24/7</h3>
              <p className="text-gray-600">
                Notre service client est disponible jour et nuit pour répondre à toutes vos questions et vous fournir une assistance routière en cas de besoin.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
                <MapPin className="h-8 w-8 text-autowise-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Livraison & reprise</h3>
              <p className="text-gray-600">
                Nous livrons votre voiture à l'adresse de votre choix et la récupérons à la fin de votre location pour un confort maximal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-autowise-blue bg-opacity-10 p-3 inline-flex rounded-full mb-4">
                <Users className="h-8 w-8 text-autowise-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chauffeur privé</h3>
              <p className="text-gray-600">
                Option chauffeur disponible sur tous nos véhicules. Nos chauffeurs sont professionnels, expérimentés et connaissent parfaitement la région.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location de voitures */}
      <section className="py-16 bg-gray-50">
        <div className="container-autowise">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Location de voitures</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              AutoWise propose une large gamme de véhicules pour tous vos besoins, des citadines économiques 
              aux voitures de luxe en passant par les SUV familiaux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Voitures économiques" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Voitures économiques</h3>
                <p className="text-gray-600 mb-4">
                  Parfaites pour les déplacements en ville, nos voitures économiques offrent un excellent 
                  rapport qualité-prix et une faible consommation de carburant.
                </p>
                <Link to="/cars" className="text-autowise-blue hover:underline flex items-center">
                  Découvrir
                  <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="SUV et familiales" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">SUV et familiales</h3>
                <p className="text-gray-600 mb-4">
                  Spacieux et confortables, nos SUV et voitures familiales sont idéaux pour les voyages 
                  en famille ou les escapades entre amis.
                </p>
                <Link to="/cars" className="text-autowise-blue hover:underline flex items-center">
                  Découvrir
                  <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Véhicules premium" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Véhicules premium</h3>
                <p className="text-gray-600 mb-4">
                  Pour un événement spécial ou simplement pour le plaisir, nos véhicules premium offrent 
                  une expérience de conduite exceptionnelle.
                </p>
                <Link to="/cars" className="text-autowise-blue hover:underline flex items-center">
                  Découvrir
                  <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services spéciaux */}
      <section className="py-16">
        <div className="container-autowise">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services spéciaux</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              En plus de la location standard, AutoWise propose des services adaptés à des besoins spécifiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-autowise-blue bg-opacity-10 p-3 h-14 rounded-full mr-4 flex-shrink-0">
                <Car className="h-8 w-8 text-autowise-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Location longue durée</h3>
                <p className="text-gray-600 mb-3">
                  Pour les besoins de plusieurs semaines ou mois, nos offres de location longue durée sont économiques et flexibles.
                  Bénéficiez de tarifs dégressifs et d'un service personnalisé.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tarifs avantageux
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Possibilité de changer de véhicule
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Entretien inclus
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-autowise-blue bg-opacity-10 p-3 h-14 rounded-full mr-4 flex-shrink-0">
                <Users className="h-8 w-8 text-autowise-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Services professionnels</h3>
                <p className="text-gray-600 mb-3">
                  Des solutions pour les entreprises et événements professionnels, avec ou sans chauffeur, 
                  pour un service sur-mesure et une facturation simplifiée.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Transport d'équipe
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Organisation de transferts
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Voitures avec branding
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-autowise-blue bg-opacity-10 p-3 h-14 rounded-full mr-4 flex-shrink-0">
                <Star className="h-8 w-8 text-autowise-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Événements spéciaux</h3>
                <p className="text-gray-600 mb-3">
                  Mariage, réunion familiale ou autre événement spécial ? Nous proposons des véhicules élégants 
                  avec chauffeur pour rendre votre journée mémorable.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Voitures décorées
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Chauffeurs en tenue
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Service personnalisé
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-autowise-blue bg-opacity-10 p-3 h-14 rounded-full mr-4 flex-shrink-0">
                <Tool className="h-8 w-8 text-autowise-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Services additionnels</h3>
                <p className="text-gray-600 mb-3">
                  Pour rendre votre location encore plus pratique, nous proposons des services additionnels 
                  qui peuvent être ajoutés à toute réservation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    GPS navigation
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sièges enfants
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Wi-Fi embarqué
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-autowise-blue text-white">
        <div className="container-autowise text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à découvrir notre flotte ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explorez nos véhicules disponibles et trouvez celui qui correspond parfaitement à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cars" 
              className="px-8 py-3 bg-white text-autowise-blue rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center font-medium"
            >
              <Car className="mr-2 h-5 w-5" />
              Voir nos voitures
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-transparent border border-white rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ServicesPage;
