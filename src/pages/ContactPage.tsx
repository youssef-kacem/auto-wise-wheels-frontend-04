
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message. Notre équipe vous contactera dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container-autowise">
          <h1 className="text-3xl font-bold text-center mb-2">Contactez-nous</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vous avez des questions ou des demandes spécifiques ? Notre équipe est à votre disposition pour vous répondre.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-autowise-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-autowise-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                      <p className="text-gray-600">Du lundi au vendredi, 9h à 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-autowise-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-autowise-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">contact@autowise.fr</p>
                      <p className="text-gray-600">Réponse sous 24h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-autowise-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-autowise-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-gray-600">123 Rue de Paris</p>
                      <p className="text-gray-600">75001 Paris, France</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi:</span>
                      <span>9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi:</span>
                      <span>10h - 16h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimanche:</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-autowise-blue" />
                  Envoyez-nous un message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="reservation">Question sur une réservation</option>
                      <option value="information">Demande d'information</option>
                      <option value="problem">Signalement d'un problème</option>
                      <option value="partnership">Proposition de partenariat</option>
                      <option value="other">Autre demande</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full md:w-auto"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        "Envoyer le message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Carte */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342371!2d2.3354292156742845!3d48.87456857928884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3c844d5cbd%3A0xb5ab1c25fc19621f!2s123%20Rue%20Saint-Honor%C3%A9%2C%2075001%20Paris!5e0!3m2!1sfr!2sfr!4v1621345678901!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="AutoWise location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
