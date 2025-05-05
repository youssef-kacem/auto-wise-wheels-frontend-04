
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Check, X, AlertCircle, Search, Filter, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
interface Reservation {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  car: {
    brand: string;
    model: string;
  };
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
}

const AdminReservationsPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'confirm' | 'cancel' | null;
    id: string | null;
  }>({ type: null, id: null });
  
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Données simulées
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'RES-1234',
      customer: {
        name: 'Martin Dupont',
        email: 'martin.dupont@email.com',
        phone: '06 12 34 56 78'
      },
      car: {
        brand: 'Tesla',
        model: 'Model 3'
      },
      startDate: '2023-05-24',
      endDate: '2023-05-28',
      status: 'confirmed',
      totalPrice: 480
    },
    {
      id: 'RES-1235',
      customer: {
        name: 'Julie Martin',
        email: 'julie.martin@email.com',
        phone: '07 23 45 67 89'
      },
      car: {
        brand: 'BMW',
        model: 'Série 5'
      },
      startDate: '2023-05-25',
      endDate: '2023-05-30',
      status: 'pending',
      totalPrice: 750
    },
    {
      id: 'RES-1236',
      customer: {
        name: 'Thomas Bernard',
        email: 'thomas.bernard@email.com',
        phone: '06 34 56 78 90'
      },
      car: {
        brand: 'Audi',
        model: 'A4'
      },
      startDate: '2023-05-22',
      endDate: '2023-05-24',
      status: 'completed',
      totalPrice: 260
    },
    {
      id: 'RES-1237',
      customer: {
        name: 'Sophie Lambert',
        email: 'sophie.lambert@email.com',
        phone: '07 45 67 89 01'
      },
      car: {
        brand: 'Renault',
        model: 'Captur'
      },
      startDate: '2023-05-21',
      endDate: '2023-05-23',
      status: 'cancelled',
      totalPrice: 160
    },
    {
      id: 'RES-1238',
      customer: {
        name: 'Pierre Leroy',
        email: 'pierre.leroy@email.com',
        phone: '06 56 78 90 12'
      },
      car: {
        brand: 'Peugeot',
        model: '3008'
      },
      startDate: '2023-05-26',
      endDate: '2023-06-02',
      status: 'pending',
      totalPrice: 560
    },
  ]);

  // Fonctions pour gérer les réservations
  const viewReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: 'confirmed' | 'cancelled' | 'completed') => {
    setReservations(reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status: newStatus } : reservation
    ));
    
    const statusMessages = {
      confirmed: "Réservation confirmée avec succès.",
      cancelled: "Réservation annulée avec succès.",
      completed: "Réservation marquée comme terminée."
    };
    
    toast({
      title: `Statut mis à jour`,
      description: statusMessages[newStatus]
    });
    
    setConfirmAction({ type: null, id: null });
  };

  const openConfirmDialog = (type: 'confirm' | 'cancel', id: string) => {
    setConfirmAction({ type, id });
  };

  const closeConfirmDialog = () => {
    setConfirmAction({ type: null, id: null });
  };

  // Envoi d'email au client
  const sendEmailToCustomer = (reservation: Reservation) => {
    // Simulation d'envoi d'email
    toast({
      title: "Email envoyé",
      description: `Un email a été envoyé à ${reservation.customer.email}`
    });
  };

  // Filtrage des réservations
  const filteredReservations = reservations.filter(reservation => {
    // Filtre par statut
    if (filterStatus !== 'all' && reservation.status !== filterStatus) {
      return false;
    }
    
    // Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        reservation.id.toLowerCase().includes(query) ||
        reservation.customer.name.toLowerCase().includes(query) ||
        reservation.customer.email.toLowerCase().includes(query) ||
        `${reservation.car.brand} ${reservation.car.model}`.toLowerCase().includes(query)
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
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Traduction des statuts pour l'affichage
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  return (
    <AdminLayout currentPage="Réservations">
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-autowise-blue" /> 
            Gestion des réservations
          </h2>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-8 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md appearance-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
              <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Aucune réservation ne correspond à vos critères.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow 
                      key={reservation.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => viewReservationDetails(reservation)}
                    >
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.customer.name}</p>
                          <p className="text-sm text-gray-500">{reservation.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {`${reservation.car.brand} ${reservation.car.model}`}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>Du: {formatDate(reservation.startDate)}</p>
                          <p>Au: {formatDate(reservation.endDate)}</p>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.totalPrice} €</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                          {reservation.status === 'pending' && (
                            <>
                              <button
                                onClick={() => openConfirmDialog('confirm', reservation.id)}
                                className="p-1 text-green-600 hover:text-green-800"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => openConfirmDialog('cancel', reservation.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => sendEmailToCustomer(reservation)}
                            className="p-1 text-blue-600 hover:text-blue-800"
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
      
      {/* Modal de détails de réservation */}
      {isDetailOpen && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Détails de la réservation {selectedReservation.id}</h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Informations client</h4>
                <p><span className="font-medium">Nom:</span> {selectedReservation.customer.name}</p>
                <p><span className="font-medium">Email:</span> {selectedReservation.customer.email}</p>
                <p><span className="font-medium">Téléphone:</span> {selectedReservation.customer.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Informations véhicule</h4>
                <p><span className="font-medium">Véhicule:</span> {selectedReservation.car.brand} {selectedReservation.car.model}</p>
                <p><span className="font-medium">Statut:</span> <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(selectedReservation.status)}`}>{getStatusText(selectedReservation.status)}</span></p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Dates</h4>
                <p><span className="font-medium">Du:</span> {formatDate(selectedReservation.startDate)}</p>
                <p><span className="font-medium">Au:</span> {formatDate(selectedReservation.endDate)}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Paiement</h4>
                <p><span className="font-medium">Prix total:</span> {selectedReservation.totalPrice} €</p>
                <p><span className="font-medium">Statut du paiement:</span> Payé</p>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4 flex justify-end space-x-3">
              <button
                onClick={() => sendEmailToCustomer(selectedReservation)}
                className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              >
                <Mail className="h-4 w-4 mr-2" /> Contacter le client
              </button>
              
              {selectedReservation.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReservation.id, 'confirmed');
                      setIsDetailOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReservation.id, 'cancelled');
                      setIsDetailOpen(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Annuler
                  </button>
                </>
              )}
              
              {selectedReservation.status === 'confirmed' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedReservation.id, 'completed');
                    setIsDetailOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Marquer comme terminée
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Boîte de dialogue de confirmation */}
      {confirmAction.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center text-amber-600 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">
                {confirmAction.type === 'confirm' ? 'Confirmer la réservation' : 'Annuler la réservation'}
              </h3>
            </div>
            
            <p className="mb-4">
              {confirmAction.type === 'confirm' 
                ? 'Êtes-vous sûr de vouloir confirmer cette réservation ? Un email sera envoyé au client.'
                : 'Êtes-vous sûr de vouloir annuler cette réservation ? Un email sera envoyé au client.'}
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeConfirmDialog}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (confirmAction.id) {
                    handleStatusChange(
                      confirmAction.id, 
                      confirmAction.type === 'confirm' ? 'confirmed' : 'cancelled'
                    );
                  }
                }}
                className={`px-4 py-2 text-white rounded-md ${
                  confirmAction.type === 'confirm' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {confirmAction.type === 'confirm' ? 'Confirmer' : 'Annuler la réservation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReservationsPage;
