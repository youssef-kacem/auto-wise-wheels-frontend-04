
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BookingComparator from '@/components/booking/BookingComparator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarComparatorPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container-autowise py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <Link to="/cars" className="text-autowise-blue hover:underline inline-flex items-center mb-3">
              <ArrowLeft size={18} className="mr-1" />
              Retour à la liste des voitures
            </Link>
            <h1 className="text-3xl font-bold">Comparateur de voitures</h1>
            <p className="text-gray-600 mt-1">
              Trouvez la voiture parfaite pour vos besoins en comparant les différentes options
            </p>
          </div>
        </div>

        <BookingComparator />
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Comment utiliser le comparateur ?</h2>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <ol className="list-decimal pl-5 space-y-3">
              <li className="text-gray-700">
                <span className="font-medium">Sélectionnez les voitures</span> que vous souhaitez comparer 
                directement depuis notre catalogue ou via les suggestions.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Comparez les caractéristiques techniques</span> comme la consommation, 
                le type de transmission, et les options disponibles.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Examinez les tarifs</span> pour déterminer quelle option offre 
                le meilleur rapport qualité-prix selon vos besoins.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Réservez directement</span> depuis l'outil comparateur pour gagner du temps.
              </li>
            </ol>
            
            <div className="bg-blue-50 rounded-md p-4 mt-6 border border-blue-100">
              <p className="text-blue-700 text-sm">
                <strong>Conseil :</strong> Tenez compte non seulement du prix quotidien mais aussi des fonctionnalités 
                importantes pour votre voyage comme l'espace pour les bagages, la consommation de carburant, 
                ou les technologies embarquées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CarComparatorPage;
