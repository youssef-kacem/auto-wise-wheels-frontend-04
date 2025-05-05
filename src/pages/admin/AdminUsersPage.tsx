
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, User, Mail, Search, Eye, Calendar, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'blocked';
  reservations: number;
}

const AdminUsersPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Données simulées
  const [users, setUsers] = useState<UserType[]>([
    {
      id: 'user-1',
      name: 'Martin Dupont',
      email: 'martin.dupont@email.com',
      phone: '06 12 34 56 78',
      createdAt: '2023-01-15',
      lastLogin: '2023-05-24',
      status: 'active',
      reservations: 3
    },
    {
      id: 'user-2',
      name: 'Julie Martin',
      email: 'julie.martin@email.com',
      phone: '07 23 45 67 89',
      createdAt: '2023-02-20',
      lastLogin: '2023-05-20',
      status: 'active',
      reservations: 1
    },
    {
      id: 'user-3',
      name: 'Thomas Bernard',
      email: 'thomas.bernard@email.com',
      phone: '06 34 56 78 90',
      createdAt: '2023-03-05',
      lastLogin: '2023-05-15',
      status: 'inactive',
      reservations: 2
    },
    {
      id: 'user-4',
      name: 'Sophie Lambert',
      email: 'sophie.lambert@email.com',
      phone: '07 45 67 89 01',
      createdAt: '2023-03-18',
      lastLogin: '2023-04-28',
      status: 'active',
      reservations: 0
    },
    {
      id: 'user-5',
      name: 'Pierre Leroy',
      email: 'pierre.leroy@email.com',
      phone: '06 56 78 90 12',
      createdAt: '2023-04-02',
      lastLogin: '2023-05-22',
      status: 'blocked',
      reservations: 1
    },
  ]);

  // Fonctions
  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive' | 'blocked') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    
    const statusMessages = {
      active: "Compte utilisateur activé.",
      inactive: "Compte utilisateur désactivé.",
      blocked: "Compte utilisateur bloqué."
    };
    
    toast({
      title: `Statut mis à jour`,
      description: statusMessages[newStatus]
    });
    
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  const sendEmailToUser = (user: UserType) => {
    // Simulation d'envoi d'email
    toast({
      title: "Email envoyé",
      description: `Un email a été envoyé à ${user.email}`
    });
  };

  const viewUserDetails = (user: UserType) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  // Filtrage des utilisateurs
  const filteredUsers = users.filter(user => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query)
      );
    }
    return true;
  });

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  // Classes de statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Traduction des statuts pour l'affichage
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'blocked': return 'Bloqué';
      default: return status;
    }
  };

  // Données simulées des réservations de l'utilisateur
  const userReservations = [
    {
      id: 'RES-1234',
      carName: 'Tesla Model 3',
      startDate: '2023-05-10',
      endDate: '2023-05-15',
      status: 'completed'
    },
    {
      id: 'RES-1290',
      carName: 'BMW Série 5',
      startDate: '2023-06-05',
      endDate: '2023-06-10',
      status: 'confirmed'
    },
    {
      id: 'RES-1305',
      carName: 'Audi A4',
      startDate: '2023-07-20',
      endDate: '2023-07-25',
      status: 'pending'
    }
  ];

  return (
    <AdminLayout currentPage="Utilisateurs">
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <Users className="mr-2 h-5 w-5 text-autowise-blue" /> 
            Gestion des utilisateurs
          </h2>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-8 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Inscription</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Réservations</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      Aucun utilisateur ne correspond à votre recherche.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          {user.reservations}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(user.status)}`}>
                          {getStatusText(user.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewUserDetails(user)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Voir détails"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => sendEmailToUser(user)}
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Envoyer un email"
                          >
                            <Mail className="h-5 w-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Modal de détails utilisateur */}
      {isDetailOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium flex items-center">
                <User className="mr-2 h-5 w-5 text-autowise-blue" />
                Détails de l'utilisateur
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-4 pb-2 border-b">Informations personnelles</h4>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">Nom:</span> {selectedUser.name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Email:</span> {selectedUser.email}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Téléphone:</span> {selectedUser.phone}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Date d'inscription:</span> {formatDate(selectedUser.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Dernière connexion:</span> {formatDate(selectedUser.lastLogin)}
                  </p>
                  <div>
                    <span className="font-medium text-gray-600">Statut:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusClass(selectedUser.status)}`}>
                      {getStatusText(selectedUser.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 pb-2 border-b">Actions</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => sendEmailToUser(selectedUser)}
                      className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                    </button>
                    
                    <h5 className="font-medium mt-4 mb-2">Modifier le statut</h5>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedUser.id, 'active')}
                        className={`px-3 py-2 rounded-md ${selectedUser.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-100'}`}
                      >
                        Activer
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedUser.id, 'inactive')}
                        className={`px-3 py-2 rounded-md ${selectedUser.status === 'inactive' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'}`}
                      >
                        Désactiver
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedUser.id, 'blocked')}
                        className={`px-3 py-2 rounded-md ${selectedUser.status === 'blocked' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-100'}`}
                      >
                        Bloquer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4 pb-2 border-b flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-autowise-blue" />
                Historique des réservations
              </h4>
              
              {userReservations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Véhicule</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userReservations.map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{reservation.id}</td>
                          <td className="px-4 py-2">{reservation.carName}</td>
                          <td className="px-4 py-2">
                            {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                          </td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reservation.status === 'completed' ? 'Terminée' :
                               reservation.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Cet utilisateur n'a pas encore fait de réservation.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
