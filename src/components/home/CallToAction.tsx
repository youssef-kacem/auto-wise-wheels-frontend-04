
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-autowise-blue text-white">
      <div className="container-autowise">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Prêt à prendre la route avec AutoWise ?</h2>
            <p className="text-xl text-gray-200 mb-6">
              Réservez dès maintenant et profitez de nos tarifs avantageux et de notre service de qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/cars" 
                className="px-6 py-3 bg-white text-autowise-blue rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center font-medium"
              >
                Réserver maintenant
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <a 
                href="tel:+33123456789" 
                className="px-6 py-3 bg-transparent border border-white rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                +33 1 23 45 67 89
              </a>
            </div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Pourquoi choisir AutoWise ?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Large sélection de véhicules premium</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Processus de réservation rapide et facile</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Service client disponible 24/7</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Options avec ou sans chauffeur</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-white mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Annulation gratuite jusqu'à 24h avant la location</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
