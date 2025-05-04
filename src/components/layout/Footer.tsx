
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-autowise-blue text-white pt-12 pb-8">
      <div className="container-autowise">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-semibold mb-4">À propos d'AutoWise</h3>
            <p className="text-gray-300 mb-4">
              AutoWise est votre partenaire de confiance pour la location de voitures. 
              Nous proposons une large gamme de véhicules adaptés à tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-autowise-blue-light transition-colors">
                <Facebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-autowise-blue-light transition-colors">
                <Instagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-autowise-blue-light transition-colors">
                <Twitter />
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-white transition-colors">
                  Nos véhicules
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions" className="text-gray-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">123 Rue des Voitures, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <a href="tel:+33123456789" className="text-gray-300 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="mailto:contact@autowise.fr" className="text-gray-300 hover:text-white transition-colors">
                  contact@autowise.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-autowise-blue-light mt-8 pt-6">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} AutoWise. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
