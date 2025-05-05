
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Car, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Info,
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  // Données simulées
  const stats = [
    { name: 'Voitures disponibles', value: '24', icon: Car, color: 'bg-green-100 text-green-800' },
    { name: 'Réservations actives', value: '18', icon: Calendar, color: 'bg-blue-100 text-blue-800' },
    { name: 'Utilisateurs inscrits', value: '126', icon: Users, color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Revenus du mois', value: '9 850 €', icon: TrendingUp, color: 'bg-purple-100 text-purple-800' },
  ];

  const recentReservations = [
    { id: 'RES-1234', user: 'Martin Dupont', car: 'Tesla Model 3', status: 'Confirmée', date: '24/05/2023', statusColor: 'text-green-500' },
    { id: 'RES-1235', user: 'Julie Martin', car: 'BMW Série 5', status: 'En attente', date: '23/05/2023', statusColor: 'text-yellow-500' },
    { id: 'RES-1236', user: 'Thomas Bernard', car: 'Audi A4', status: 'Confirmée', date: '22/05/2023', statusColor: 'text-green-500' },
    { id: 'RES-1237', user: 'Sophie Lambert', car: 'Renault Captur', status: 'Annulée', date: '21/05/2023', statusColor: 'text-red-500' },
  ];

  const alerts = [
    { id: 1, message: 'Retour de location prévu aujourd\'hui pour 3 véhicules', type: 'info', icon: Info },
    { id: 2, message: 'Maintenance prévue pour la BMW X5 demain', type: 'warning', icon: Clock },
    { id: 3, message: '5 nouvelles réservations nécessitent validation', type: 'alert', icon: AlertCircle },
  ];

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'alert':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <AdminLayout currentPage="Dashboard">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div 
            key={item.name}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          >
            <div className={`p-3 mr-4 rounded-full ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">{item.name}</p>
              <p className="text-lg font-semibold text-gray-700">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Réservations récentes</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-xs text-gray-500">Référence</th>
                    <th className="px-4 py-2 text-xs text-gray-500">Client</th>
                    <th className="px-4 py-2 text-xs text-gray-500">Véhicule</th>
                    <th className="px-4 py-2 text-xs text-gray-500">Date</th>
                    <th className="px-4 py-2 text-xs text-gray-500">Statut</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentReservations.map((res) => (
                    <tr key={res.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{res.id}</td>
                      <td className="px-4 py-3">{res.user}</td>
                      <td className="px-4 py-3">{res.car}</td>
                      <td className="px-4 py-3">{res.date}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${res.statusColor}`}>{res.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <a href="/admin/reservations" className="text-sm font-medium text-autowise-blue hover:underline">
                Voir toutes les réservations →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Alertes et notifications</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 flex items-center border rounded-md ${getAlertClass(alert.type)}`}
                >
                  <alert.icon className="h-5 w-5 mr-2" />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <a href="/admin/notifications" className="text-sm font-medium text-autowise-blue hover:underline">
                Voir toutes les notifications →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Activité récente</h2>
          </div>
          <div className="p-4">
            <div className="relative">
              <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
              <div className="space-y-6 relative">
                <div className="flex">
                  <div className="flex-shrink-0 z-10">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 pt-1">
                    <p className="text-sm text-gray-500">Il y a 1 heure</p>
                    <p className="font-medium">Nouvelle réservation confirmée pour Tesla Model 3</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 z-10">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <Car className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 pt-1">
                    <p className="text-sm text-gray-500">Il y a 3 heures</p>
                    <p className="font-medium">Retour de location - BMW X3 (vérification effectuée)</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 z-10">
                    <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 pt-1">
                    <p className="text-sm text-gray-500">Il y a 5 heures</p>
                    <p className="font-medium">5 nouveaux utilisateurs se sont inscrits sur la plateforme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
