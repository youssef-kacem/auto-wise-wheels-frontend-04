
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Données statiques pour les questions fréquentes
const faqs = [
  {
    id: 1,
    question: "Quels documents sont nécessaires pour louer une voiture ?",
    answer: "Pour louer une voiture chez AutoWise, vous aurez besoin d'un permis de conduire valide, d'une pièce d'identité (carte d'identité ou passeport) et d'une carte de crédit à votre nom. Pour certains véhicules haut de gamme, des conditions supplémentaires peuvent s'appliquer."
  },
  {
    id: 2,
    question: "Puis-je réserver une voiture avec chauffeur ?",
    answer: "Oui, AutoWise propose une option de location avec chauffeur pour tous nos véhicules. Nos chauffeurs sont professionnels, expérimentés et connaissent parfaitement la région. Cette option est idéale pour les événements spéciaux, les voyages d'affaires ou simplement pour plus de confort."
  },
  {
    id: 3,
    question: "Comment fonctionne l'assurance pour les locations ?",
    answer: "Toutes nos locations incluent une assurance de base couvrant les dommages matériels et corporels. Nous proposons également des options d'assurance complémentaires pour une protection optimale. Les détails de la couverture sont disponibles lors de la réservation et peuvent être ajustés selon vos besoins."
  },
  {
    id: 4,
    question: "Que se passe-t-il en cas de retard pour la restitution du véhicule ?",
    answer: "En cas de retard prévisible, nous vous conseillons de nous contacter dès que possible. Des frais supplémentaires peuvent s'appliquer selon la durée du retard. Pour les retards importants, une journée supplémentaire pourra être facturée selon nos conditions générales."
  },
  {
    id: 5,
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer: "Oui, vous pouvez annuler ou modifier votre réservation. L'annulation est gratuite jusqu'à 24 heures avant le début de la location. Des frais peuvent s'appliquer en cas d'annulation tardive. Pour modifier votre réservation, connectez-vous à votre compte ou contactez notre service client."
  },
  {
    id: 6,
    question: "Y a-t-il une limite de kilométrage pour les locations ?",
    answer: "La plupart de nos offres incluent un kilométrage illimité. Cependant, certaines offres spéciales ou locations longue durée peuvent avoir une limite de kilométrage. Les détails sont toujours clairement indiqués avant la confirmation de votre réservation."
  }
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-16">
      <div className="container-autowise">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement des réponses aux questions les plus courantes concernant nos services de location.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openItem === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-autowise-blue" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              {openItem === faq.id && (
                <div className="px-6 py-4 bg-gray-50 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <a 
            href="/contact" 
            className="btn-primary inline-block"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
