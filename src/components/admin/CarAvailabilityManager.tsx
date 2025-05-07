
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Trash, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from "@/lib/utils";

export interface AvailabilityPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface CarAvailabilityManagerProps {
  availabilityPeriods: AvailabilityPeriod[];
  onChange: (periods: AvailabilityPeriod[]) => void;
}

const CarAvailabilityManager: React.FC<CarAvailabilityManagerProps> = ({ 
  availabilityPeriods, 
  onChange 
}) => {
  const [isAddingPeriod, setIsAddingPeriod] = useState(false);
  const [newPeriod, setNewPeriod] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [editingPeriodId, setEditingPeriodId] = useState<string | null>(null);

  // Ajouter une nouvelle période de disponibilité
  const addAvailabilityPeriod = () => {
    if (newPeriod.startDate && newPeriod.endDate) {
      // Vérifier que la date de fin est après la date de début
      if (newPeriod.endDate < newPeriod.startDate) {
        alert("La date de fin doit être postérieure à la date de début");
        return;
      }

      const newAvailabilityPeriod: AvailabilityPeriod = {
        id: `period-${Date.now()}`,
        startDate: newPeriod.startDate,
        endDate: newPeriod.endDate,
      };

      onChange([...availabilityPeriods, newAvailabilityPeriod]);
      setNewPeriod({ startDate: undefined, endDate: undefined });
      setIsAddingPeriod(false);
    }
  };

  // Supprimer une période de disponibilité
  const removePeriod = (id: string) => {
    onChange(availabilityPeriods.filter(period => period.id !== id));
  };

  // Modifier une période de disponibilité
  const editPeriod = (id: string) => {
    const periodToEdit = availabilityPeriods.find(period => period.id === id);
    if (periodToEdit) {
      setNewPeriod({
        startDate: periodToEdit.startDate,
        endDate: periodToEdit.endDate,
      });
      setEditingPeriodId(id);
      setIsAddingPeriod(true);
    }
  };

  // Sauvegarder les modifications d'une période
  const saveEditedPeriod = () => {
    if (editingPeriodId && newPeriod.startDate && newPeriod.endDate) {
      if (newPeriod.endDate < newPeriod.startDate) {
        alert("La date de fin doit être postérieure à la date de début");
        return;
      }

      const updatedPeriods = availabilityPeriods.map(period => {
        if (period.id === editingPeriodId) {
          return {
            ...period,
            startDate: newPeriod.startDate,
            endDate: newPeriod.endDate,
          };
        }
        return period;
      });

      onChange(updatedPeriods);
      setNewPeriod({ startDate: undefined, endDate: undefined });
      setEditingPeriodId(null);
      setIsAddingPeriod(false);
    }
  };

  // Annuler l'ajout ou la modification
  const cancelAddOrEdit = () => {
    setNewPeriod({ startDate: undefined, endDate: undefined });
    setEditingPeriodId(null);
    setIsAddingPeriod(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Périodes de disponibilité</h3>
        {!isAddingPeriod && (
          <Button
            onClick={() => setIsAddingPeriod(true)}
            variant="outline"
            size="sm"
            className="flex items-center hover:bg-autowise-blue hover:text-white transition-colors"
          >
            <Plus size={16} className="mr-1" /> Ajouter une période
          </Button>
        )}
      </div>

      {/* Liste des périodes existantes */}
      {availabilityPeriods.length > 0 ? (
        <div className="space-y-2">
          {availabilityPeriods.map((period) => (
            <div 
              key={period.id} 
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
            >
              <div className="flex items-center">
                <CalendarIcon size={16} className="mr-2 text-autowise-blue" />
                <span>
                  {format(period.startDate, "dd/MM/yyyy HH:mm", { locale: fr })} - {format(period.endDate, "dd/MM/yyyy HH:mm", { locale: fr })}
                </span>
              </div>
              <div className="flex space-x-1">
                <Button 
                  onClick={() => editPeriod(period.id)} 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-blue-50 hover:text-autowise-blue transition-colors"
                >
                  Modifier
                </Button>
                <Button 
                  onClick={() => removePeriod(period.id)} 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 bg-gray-50 rounded-md border">
          <p className="text-gray-500">Aucune période de disponibilité définie</p>
          <p className="text-xs text-gray-400">Ajoutez des périodes pour indiquer quand ce véhicule est disponible à la location</p>
        </div>
      )}

      {/* Formulaire d'ajout ou de modification d'une période */}
      {isAddingPeriod && (
        <div className="border p-4 rounded-md space-y-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{editingPeriodId ? "Modifier la période" : "Ajouter une période"}</h4>
            <Button 
              onClick={cancelAddOrEdit} 
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sélecteur de date de début */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <div className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newPeriod.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newPeriod.startDate ? format(newPeriod.startDate, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newPeriod.startDate}
                      onSelect={(date) => setNewPeriod({ ...newPeriod, startDate: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {newPeriod.startDate && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
                  <input
                    type="time"
                    value={newPeriod.startDate ? format(newPeriod.startDate, "HH:mm") : ""}
                    onChange={(e) => {
                      if (newPeriod.startDate && e.target.value) {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = new Date(newPeriod.startDate);
                        newDate.setHours(hours, minutes);
                        setNewPeriod({ ...newPeriod, startDate: newDate });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Sélecteur de date de fin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <div className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newPeriod.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newPeriod.endDate ? format(newPeriod.endDate, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newPeriod.endDate}
                      onSelect={(date) => setNewPeriod({ ...newPeriod, endDate: date })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {newPeriod.endDate && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
                  <input
                    type="time"
                    value={newPeriod.endDate ? format(newPeriod.endDate, "HH:mm") : ""}
                    onChange={(e) => {
                      if (newPeriod.endDate && e.target.value) {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = new Date(newPeriod.endDate);
                        newDate.setHours(hours, minutes);
                        setNewPeriod({ ...newPeriod, endDate: newDate });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={cancelAddOrEdit}
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
            >
              Annuler
            </Button>
            <Button
              onClick={editingPeriodId ? saveEditedPeriod : addAvailabilityPeriod}
              disabled={!newPeriod.startDate || !newPeriod.endDate}
              className="bg-autowise-blue hover:bg-blue-700 transition-colors"
            >
              {editingPeriodId ? "Enregistrer" : "Ajouter"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarAvailabilityManager;
