
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Trash, X, Check } from 'lucide-react';
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
    startTime: string;
    endTime: string;
  }>({
    startDate: undefined,
    endDate: undefined,
    startTime: "08:00",
    endTime: "18:00",
  });
  const [editingPeriodId, setEditingPeriodId] = useState<string | null>(null);

  // Ajouter une nouvelle période de disponibilité
  const addAvailabilityPeriod = () => {
    if (newPeriod.startDate && newPeriod.endDate) {
      // Créer les dates complètes avec heures
      const startDateTime = new Date(newPeriod.startDate);
      const endDateTime = new Date(newPeriod.endDate);
      
      // Appliquer les heures et minutes
      if (newPeriod.startTime) {
        const [startHours, startMinutes] = newPeriod.startTime.split(':').map(Number);
        startDateTime.setHours(startHours, startMinutes);
      }
      
      if (newPeriod.endTime) {
        const [endHours, endMinutes] = newPeriod.endTime.split(':').map(Number);
        endDateTime.setHours(endHours, endMinutes);
      }
      
      // Vérifier que la date de fin est après la date de début
      if (endDateTime < startDateTime) {
        alert("La date et heure de fin doivent être postérieures à la date et heure de début");
        return;
      }

      const newAvailabilityPeriod: AvailabilityPeriod = {
        id: `period-${Date.now()}`,
        startDate: startDateTime,
        endDate: endDateTime,
      };

      onChange([...availabilityPeriods, newAvailabilityPeriod]);
      resetPeriodForm();
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
        startTime: format(periodToEdit.startDate, "HH:mm"),
        endTime: format(periodToEdit.endDate, "HH:mm"),
      });
      setEditingPeriodId(id);
      setIsAddingPeriod(true);
    }
  };

  // Sauvegarder les modifications d'une période
  const saveEditedPeriod = () => {
    if (editingPeriodId && newPeriod.startDate && newPeriod.endDate) {
      // Créer des dates avec les heures
      const startDateTime = new Date(newPeriod.startDate);
      const endDateTime = new Date(newPeriod.endDate);
      
      // Appliquer les heures et minutes
      if (newPeriod.startTime) {
        const [startHours, startMinutes] = newPeriod.startTime.split(':').map(Number);
        startDateTime.setHours(startHours, startMinutes);
      }
      
      if (newPeriod.endTime) {
        const [endHours, endMinutes] = newPeriod.endTime.split(':').map(Number);
        endDateTime.setHours(endHours, endMinutes);
      }
      
      if (endDateTime < startDateTime) {
        alert("La date et heure de fin doivent être postérieures à la date et heure de début");
        return;
      }

      const updatedPeriods = availabilityPeriods.map(period => {
        if (period.id === editingPeriodId) {
          return {
            ...period,
            startDate: startDateTime,
            endDate: endDateTime,
          };
        }
        return period;
      });

      onChange(updatedPeriods);
      resetPeriodForm();
    }
  };

  // Réinitialiser le formulaire d'ajout/modification de période
  const resetPeriodForm = () => {
    setNewPeriod({
      startDate: undefined,
      endDate: undefined,
      startTime: "08:00",
      endTime: "18:00",
    });
    setEditingPeriodId(null);
    setIsAddingPeriod(false);
  };

  // Formater l'affichage des périodes
  const formatDateTimeRange = (startDate: Date, endDate: Date) => {
    const sameDay = startDate.toDateString() === endDate.toDateString();
    
    if (sameDay) {
      return (
        <>
          <span className="font-medium">{format(startDate, "dd MMMM yyyy", { locale: fr })}</span>
          <span> • </span>
          <span>{format(startDate, "HH:mm", { locale: fr })} - {format(endDate, "HH:mm", { locale: fr })}</span>
        </>
      );
    }
    
    return (
      <>
        <span className="font-medium">{format(startDate, "dd MMM", { locale: fr })} {format(startDate, "HH:mm", { locale: fr })}</span>
        <span> - </span>
        <span className="font-medium">{format(endDate, "dd MMM yyyy", { locale: fr })} {format(endDate, "HH:mm", { locale: fr })}</span>
      </>
    );
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
              className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-100"
            >
              <div className="flex items-center text-sm">
                <CalendarIcon size={16} className="mr-2 text-autowise-blue" />
                <span className="text-gray-700">
                  {formatDateTimeRange(period.startDate, period.endDate)}
                </span>
              </div>
              <div className="flex space-x-1">
                <Button 
                  onClick={() => editPeriod(period.id)} 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-blue-100 hover:text-autowise-blue transition-colors"
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
        <div className="text-center py-6 bg-gray-50 rounded-md border">
          <p className="text-gray-500">Aucune période de disponibilité définie</p>
          <p className="text-xs text-gray-400 mt-1">Ajoutez des périodes pour indiquer quand ce véhicule est disponible à la location</p>
        </div>
      )}

      {/* Formulaire d'ajout ou de modification d'une période */}
      {isAddingPeriod && (
        <div className="border p-4 rounded-md space-y-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{editingPeriodId ? "Modifier la période" : "Ajouter une période"}</h4>
            <Button 
              onClick={resetPeriodForm} 
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sélection des dates */}
            <div className="space-y-3">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
                <input
                  type="time"
                  value={newPeriod.startTime}
                  onChange={(e) => setNewPeriod({ ...newPeriod, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-3">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
                <input
                  type="time"
                  value={newPeriod.endTime}
                  onChange={(e) => setNewPeriod({ ...newPeriod, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={resetPeriodForm}
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
            >
              Annuler
            </Button>
            <Button
              onClick={editingPeriodId ? saveEditedPeriod : addAvailabilityPeriod}
              disabled={!newPeriod.startDate || !newPeriod.endDate || !newPeriod.startTime || !newPeriod.endTime}
              className="bg-autowise-blue hover:bg-blue-700 transition-colors"
            >
              {editingPeriodId ? (
                <><Check size={16} className="mr-1" /> Enregistrer</>
              ) : (
                <><Plus size={16} className="mr-1" /> Ajouter</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarAvailabilityManager;
