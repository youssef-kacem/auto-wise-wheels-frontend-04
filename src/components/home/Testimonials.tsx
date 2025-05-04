
import React from 'react';
import { Star } from 'lucide-react';

// Données statiques pour les témoignages
const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    role: 'Chef d\'entreprise',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: 'AutoWise a rendu mon voyage d\'affaires beaucoup plus agréable. La voiture était impeccable et le chauffeur extrêmement professionnel. Je recommande vivement leurs services pour tous vos déplacements professionnels.',
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    role: 'Ingénieur',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 4,
    text: 'J\'ai loué une voiture pour un week-end en famille et tout était parfait. Le processus de réservation est simple et rapide. La voiture était exactement comme décrite sur le site. Nous avons passé un excellent séjour !',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Photographe',
    avatar: 'https://i.pravatar.cc/150?img=29',
    rating: 5,
    text: 'En tant que photographe, j\'avais besoin d\'un véhicule spacieux pour transporter mon équipement. AutoWise m\'a proposé exactement ce qu\'il me fallait. Service client exceptionnel et prix très compétitifs.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-autowise">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits qui ont choisi AutoWise pour leurs besoins de location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
