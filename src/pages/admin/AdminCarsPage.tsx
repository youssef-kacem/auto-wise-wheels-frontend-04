
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, Edit, Trash, Plus, XCircle, Check, X, CalendarRange } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CarAvailabilityManager, { AvailabilityPeriod } from '@/components/admin/CarAvailabilityManager';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Types
interface CarType {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  available: boolean;
  image: string;
  category: string;
  availabilityPeriods: AvailabilityPeriod[];
}

const AdminCarsPage: React.FC = () => {
  const { toast } = useToast();
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isEditingCarId, setIsEditingCarId] = useState<string | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [selectedCarForAvailability, setSelectedCarForAvailability] = useState<CarType | null>(null);
  
  // Données simulées
  const [cars, setCars] = useState<CarType[]>([
    { 
      id: 'car-1', 
      model: 'Model 3', 
      brand: 'Tesla', 
      year: 2022, 
      price: 120, 
      available: true,
      image: 'https://example.com/car1.jpg',
      category: 'Électrique',
      availabilityPeriods: [
        {
          id: 'period-1',
          startDate: new Date('2025-05-10T08:00:00'),
          endDate: new Date('2025-05-15T18:00:00')
        },
        {
          id: 'period-2',
          startDate: new Date('2025-05-20T08:00:00'),
          endDate: new Date('2025-05-25T18:00:00')
        }
      ]
    },
    { 
      id: 'car-2', 
      model: 'Série 5', 
      brand: 'BMW', 
      year: 2021, 
      price: 150, 
      available: true,
      image: 'https://example.com/car2.jpg',
      category: 'Premium',
      availabilityPeriods: [
        {
          id: 'period-3',
          startDate: new Date('2025-05-05T08:00:00'),
          endDate: new Date('2025-05-20T18:00:00')
        }
      ]
    },
    { 
      id: 'car-3', 
      model: 'A4', 
      brand: 'Audi', 
      year: 2020, 
      price: 130, 
      available: false,
      image: 'https://example.com/car3.jpg',
      category: 'Premium',
      availabilityPeriods: []
    },
    { 
      id: 'car-4', 
      model: 'Captur', 
      brand: 'Renault', 
      year: 2021, 
      price: 80, 
      available: true,
      image: 'https://example.com/car4.jpg',
      category: 'SUV Compact',
      availabilityPeriods: [
        {
          id: 'period-4',
          startDate: new Date('2025-06-01T08:00:00'),
          endDate: new Date('2025-06-15T18:00:00')
        }
      ]
    },
  ]);
  
  const [newCar, setNewCar] = useState<Omit<CarType, 'id'>>({
    model: '',
    brand: '',
    year: new Date().getFullYear(),
    price: 0,
    available: true,
    image: '',
    category: '',
    availabilityPeriods: []
  });

  // Ouvrir le gestionnaire de disponibilité
  const openAvailabilityManager = (car: CarType) => {
    setSelectedCarForAvailability(car);
    setAvailabilityDialogOpen(true);
  };

  // Mettre à jour les périodes de disponibilité
  const updateAvailabilityPeriods = (periods: AvailabilityPeriod[]) => {
    if (selectedCarForAvailability) {
      // Mettre à jour la voiture sélectionnée
      setCars(cars.map(car => 
        car.id === selectedCarForAvailability.id 
          ? { ...car, availabilityPeriods: periods, available: periods.length > 0 } 
          : car
      ));

      // Mettre à jour aussi selectedCarForAvailability pour refléter les changements dans le modal
      setSelectedCarForAvailability({
        ...selectedCarForAvailability,
        availabilityPeriods: periods,
        available: periods.length > 0
      });

      toast({
        title: "Disponibilité mise à jour",
        description: `Les périodes de disponibilité de ${selectedCarForAvailability.brand} ${selectedCarForAvailability.model} ont été mises à jour.`
      });
    }
  };

  // Gestion des changements pour un nouveau véhicule
  const handleNewCarChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewCar({ ...newCar, [name]: checked });
    } else if (name === 'year' || name === 'price') {
      setNewCar({ ...newCar, [name]: Number(value) });
    } else {
      setNewCar({ ...newCar, [name]: value });
    }
  };

  // Ajouter une nouvelle voiture
  const handleAddCar = () => {
    const id = `car-${Date.now()}`;
    // Si aucune période de disponibilité n'est définie, en ajouter une par défaut pour les 30 prochains jours
    const availabilityPeriods = newCar.availabilityPeriods.length > 0 
      ? newCar.availabilityPeriods 
      : [{
          id: `period-${Date.now()}`,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 jours
        }];
        
    setCars([...cars, { ...newCar, id, availabilityPeriods }]);
    setIsAddingCar(false);
    setNewCar({
      model: '',
      brand: '',
      year: new Date().getFullYear(),
      price: 0,
      available: true,
      image: '',
      category: '',
      availabilityPeriods: []
    });
    
    toast({
      title: "Voiture ajoutée",
      description: `${newCar.brand} ${newCar.model} a été ajoutée avec succès.`
    });
  };

  // Modifier une voiture
  const startEditingCar = (car: CarType) => {
    setIsEditingCarId(car.id);
    // Pré-remplir avec les données actuelles
    setNewCar({
      model: car.model,
      brand: car.brand,
      year: car.year,
      price: car.price,
      available: car.available,
      image: car.image,
      category: car.category,
      availabilityPeriods: car.availabilityPeriods
    });
  };

  const handleUpdateCar = (id: string) => {
    setCars(cars.map(car => car.id === id ? { ...newCar, id } : car));
    setIsEditingCarId(null);
    
    toast({
      title: "Voiture mise à jour",
      description: `${newCar.brand} ${newCar.model} a été mise à jour avec succès.`
    });
  };

  // Supprimer une voiture
  const openDeleteConfirm = (id: string) => {
    setSelectedCarId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCar = () => {
    if (selectedCarId) {
      const carToDelete = cars.find(car => car.id === selectedCarId);
      setCars(cars.filter(car => car.id !== selectedCarId));
      setDeleteConfirmOpen(false);
      setSelectedCarId(null);
      
      toast({
        title: "Voiture supprimée",
        description: `${carToDelete?.brand} ${carToDelete?.model} a été supprimée.`,
        variant: "destructive"
      });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedCarId(null);
  };

  // Changer la disponibilité
  const toggleAvailability = (id: string) => {
    setCars(cars.map(car => {
      if (car.id === id) {
        const newStatus = !car.available;
        
        // Si la voiture devient disponible mais n'a pas de périodes de disponibilité, en ajouter une par défaut
        let updatedAvailabilityPeriods = car.availabilityPeriods;
        if (newStatus && car.availabilityPeriods.length === 0) {
          updatedAvailabilityPeriods = [{
            id: `period-${Date.now()}`,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 jours
          }];
        }
        
        toast({
          title: newStatus ? "Voiture disponible" : "Voiture indisponible",
          description: `${car.brand} ${car.model} est maintenant ${newStatus ? 'disponible' : 'indisponible'} à la location.`
        });
        
        return { 
          ...car, 
          available: newStatus,
          availabilityPeriods: updatedAvailabilityPeriods
        };
      }
      return car;
    }));
  };

  return (
    <AdminLayout currentPage="Voitures">
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <Car className="mr-2 h-5 w-5 text-autowise-blue" /> 
            Gestion des véhicules
          </h2>
          <button
            onClick={() => setIsAddingCar(true)}
            className="px-4 py-2 bg-autowise-blue text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
          >
            <Plus className="mr-1 h-4 w-4" /> Ajouter une voiture
          </button>
        </div>
        
        {isAddingCar && (
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-medium mb-3">Ajouter un nouveau véhicule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
                <input
                  type="text"
                  name="brand"
                  value={newCar.brand}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
                <input
                  type="text"
                  name="model"
                  value={newCar.model}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                <input
                  type="number"
                  name="year"
                  value={newCar.year}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix par jour (€)</label>
                <input
                  type="number"
                  name="price"
                  value={newCar.price}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <input
                  type="text"
                  name="category"
                  value={newCar.category}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newCar.image}
                  onChange={handleNewCarChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={newCar.available}
                  onChange={(e) => setNewCar({...newCar, available: e.target.checked})}
                  className="h-4 w-4 text-autowise-blue border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Disponible</label>
              </div>
            </div>
            
            {/* Gestionnaire de disponibilité pour nouvelle voiture */}
            <div className="mt-6">
              <CarAvailabilityManager 
                availabilityPeriods={newCar.availabilityPeriods} 
                onChange={(periods) => setNewCar({...newCar, availabilityPeriods: periods})}
              />
            </div>
            
            <div className="mt-4 flex space-x-2 justify-end">
              <button
                onClick={() => setIsAddingCar(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCar}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Ajouter la voiture
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix/jour</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id} className="hover:bg-gray-50 transition-colors">
                    {isEditingCarId === car.id ? (
                      // Mode édition
                      <>
                        <TableCell>
                          <input
                            type="text"
                            name="image"
                            value={newCar.image}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                            placeholder="URL de l'image"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="brand"
                            value={newCar.brand}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="model"
                            value={newCar.model}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            name="year"
                            value={newCar.year}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="category"
                            value={newCar.category}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            name="price"
                            value={newCar.price}
                            onChange={handleNewCarChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            name="available"
                            value={newCar.available ? "true" : "false"}
                            onChange={(e) => setNewCar({...newCar, available: e.target.value === "true"})}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="true">Disponible</option>
                            <option value="false">Indisponible</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => openAvailabilityManager({...newCar, id: car.id})}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            Gérer
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateCar(car.id)}
                              className="p-1 text-green-600 hover:text-green-800 transition-colors"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setIsEditingCarId(null)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      // Mode affichage
                      <>
                        <TableCell>
                          <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                            <img 
                              src={car.image || 'https://via.placeholder.com/150'} 
                              alt={`${car.brand} ${car.model}`} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{car.brand}</TableCell>
                        <TableCell>{car.model}</TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>{car.category}</TableCell>
                        <TableCell>{car.price} €/jour</TableCell>
                        <TableCell>
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {car.available ? 'Disponible' : 'Indisponible'}
                          </span>
                          <button
                            onClick={() => toggleAvailability(car.id)}
                            className="ml-2 text-xs text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                          >
                            Changer
                          </button>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => openAvailabilityManager(car)}
                            className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <CalendarRange size={14} className="mr-1" />
                            {car.availabilityPeriods.length || 0} périodes
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditingCar(car)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteConfirm(car.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash className="h-5 w-5" />
                            </button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center text-red-600 mb-4">
              <XCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Confirmation de suppression</h3>
            </div>
            
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCar}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de gestion des disponibilités */}
      <Dialog open={availabilityDialogOpen} onOpenChange={setAvailabilityDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Gestion des disponibilités - {selectedCarForAvailability?.brand} {selectedCarForAvailability?.model}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCarForAvailability && (
            <div className="mt-4">
              <CarAvailabilityManager 
                availabilityPeriods={selectedCarForAvailability.availabilityPeriods} 
                onChange={updateAvailabilityPeriods}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCarsPage;
