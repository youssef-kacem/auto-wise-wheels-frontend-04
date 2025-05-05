
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Car, Users } from 'lucide-react';

const AdminStatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Données simulées pour les graphiques
  const monthlyRevenue = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Fév', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Avr', revenue: 5800 },
    { month: 'Mai', revenue: 6700 },
    { month: 'Jui', revenue: 7500 },
    { month: 'Juil', revenue: 9200 },
    { month: 'Aoû', revenue: 10100 },
    { month: 'Sep', revenue: 8400 },
    { month: 'Oct', revenue: 7200 },
    { month: 'Nov', revenue: 6300 },
    { month: 'Déc', revenue: 5900 },
  ];

  const reservationsByCategory = [
    { name: 'SUV', value: 35 },
    { name: 'Berline', value: 30 },
    { name: 'Citadine', value: 20 },
    { name: 'Premium', value: 15 },
  ];

  const userGrowth = [
    { month: 'Jan', users: 120 },
    { month: 'Fév', users: 132 },
    { month: 'Mar', users: 145 },
    { month: 'Avr', users: 160 },
    { month: 'Mai', users: 178 },
    { month: 'Jui', users: 190 },
    { month: 'Juil', users: 210 },
    { month: 'Aoû', users: 226 },
    { month: 'Sep', users: 240 },
    { month: 'Oct', users: 258 },
    { month: 'Nov', users: 275 },
    { month: 'Déc', users: 290 },
  ];

  const reservationsByVehicle = [
    { name: 'Tesla Model 3', value: 28 },
    { name: 'BMW Série 5', value: 22 },
    { name: 'Audi A4', value: 20 },
    { name: 'Mercedes Classe C', value: 18 },
    { name: 'Renault Captur', value: 15 },
    { name: 'Toyota RAV4', value: 14 },
    { name: 'Peugeot 3008', value: 13 },
    { name: 'Autres', value: 40 },
  ];

  // Totaux calculés
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const totalReservations = reservationsByCategory.reduce((sum, item) => sum + item.value, 0);
  const totalUsers = userGrowth[userGrowth.length - 1].users;
  const averageRevenuePerBooking = Math.round(totalRevenue / totalReservations);

  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  return (
    <AdminLayout currentPage="Statistiques">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <div className="p-3 mr-4 rounded-full bg-blue-100 text-blue-800">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Revenu total</p>
            <p className="text-lg font-semibold text-gray-700">{totalRevenue.toLocaleString('fr-FR')} €</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <div className="p-3 mr-4 rounded-full bg-green-100 text-green-800">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Réservations</p>
            <p className="text-lg font-semibold text-gray-700">{totalReservations}</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <div className="p-3 mr-4 rounded-full bg-purple-100 text-purple-800">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Utilisateurs</p>
            <p className="text-lg font-semibold text-gray-700">{totalUsers}</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <div className="p-3 mr-4 rounded-full bg-yellow-100 text-yellow-800">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">Revenu moyen / réservation</p>
            <p className="text-lg font-semibold text-gray-700">{averageRevenuePerBooking} €</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Graphique des revenus */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Revenus mensuels</h2>
            <div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="month">12 derniers mois</option>
                <option value="quarter">4 derniers trimestres</option>
                <option value="year">5 dernières années</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={monthlyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} €`, 'Revenu']}
                  labelFormatter={(label) => `Mois: ${label}`}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenu" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique des réservations par catégorie */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Réservations par catégorie</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={reservationsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reservationsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} réservations`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Graphique de croissance des utilisateurs */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Croissance des utilisateurs</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={userGrowth}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} utilisateurs`, 'Total']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Utilisateurs"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique des réservations par véhicule */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Véhicules les plus réservés</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={reservationsByVehicle}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 100,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value} réservations`, 'Nombre']} />
                <Legend />
                <Bar dataKey="value" name="Réservations" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rapport analytique */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Rapport analytique</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Performance des ventes</h3>
            <p className="text-gray-600 mb-4">
              Les revenus montrent une tendance à la hausse avec une augmentation de 20% par rapport à l'année précédente.
              Les mois d'été (juin à septembre) sont les plus performants, avec un pic en août.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">Préférences des utilisateurs</h3>
            <p className="text-gray-600 mb-4">
              Les SUV et les berlines représentent 65% des réservations, ce qui indique une préférence des utilisateurs pour le confort et l'espace.
              La Tesla Model 3 reste le véhicule le plus populaire avec 28 réservations.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Croissance des utilisateurs</h3>
            <p className="text-gray-600 mb-4">
              Le nombre d'utilisateurs montre une croissance régulière avec une augmentation mensuelle moyenne de 5%.
              Le taux de conversion des visiteurs en utilisateurs inscrits est de 12%.
            </p>
            
            <h3 className="font-medium text-gray-700 mb-2">Recommandations</h3>
            <p className="text-gray-600">
              1. Augmenter l'offre de SUV et berlines premium pour répondre à la demande.<br />
              2. Lancer des promotions spéciales pendant les mois moins actifs (janvier, février).<br />
              3. Développer un programme de fidélité pour encourager les réservations répétées.<br />
              4. Optimiser le processus de réservation pour améliorer davantage le taux de conversion.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Rapport généré le {new Date().toLocaleDateString('fr-FR')}</p>
            <button className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700">
              Télécharger le rapport complet
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStatisticsPage;
