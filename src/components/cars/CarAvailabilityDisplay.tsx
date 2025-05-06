
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { CalendarClock, Check, Clock, Calendar as CalendarIcon } from 'lucide-react';

export interface AvailabilityPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface CarAvailabilityDisplayProps {
  availabilityPeriods: AvailabilityPeriod[];
}

const CarAvailabilityDisplay: React.FC<CarAvailabilityDisplayProps> = ({ availabilityPeriods }) => {
  // Fonction pour formatter les dates avec les heures
  const formatDateRange = (startDate: Date, endDate: Date) => {
    const sameDay = startDate.toDateString() === endDate.toDateString();
    
    if (sameDay) {
      return `${format(startDate, "dd MMM yyyy", { locale: fr })} • ${format(startDate, "HH:mm", { locale: fr })} - ${format(endDate, "HH:mm", { locale: fr })}`;
    }
    
    return `${format(startDate, "dd MMM yyyy HH:mm", { locale: fr })} - ${format(endDate, "dd MMM yyyy HH:mm", { locale: fr })}`;
  };

  // Fonction pour vérifier si une date est disponible
  const isDateAvailable = (date: Date) => {
    if (!availabilityPeriods.length) return false;
    return availabilityPeriods.some(period => {
      const checkDate = new Date(date);
      // Normaliser les heures pour la comparaison de dates
      checkDate.setHours(0, 0, 0, 0);
      const startDate = new Date(period.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(period.endDate);
      endDate.setHours(23, 59, 59, 999);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  // Grouper les périodes par jour pour un affichage plus organisé
  const groupPeriodsByDay = () => {
    const groupedPeriods: { [key: string]: AvailabilityPeriod[] } = {};
    
    availabilityPeriods.forEach(period => {
      const startDay = format(period.startDate, 'yyyy-MM-dd');
      const endDay = format(period.endDate, 'yyyy-MM-dd');
      
      // Si la période commence et se termine le même jour
      if (startDay === endDay) {
        if (!groupedPeriods[startDay]) {
          groupedPeriods[startDay] = [];
        }
        groupedPeriods[startDay].push(period);
      } else {
        // Pour les périodes sur plusieurs jours, on les garde indépendantes
        const periodKey = `${startDay}_${endDay}`;
        if (!groupedPeriods[periodKey]) {
          groupedPeriods[periodKey] = [];
        }
        groupedPeriods[periodKey].push(period);
      }
    });
    
    return groupedPeriods;
  };

  const groupedPeriods = groupPeriodsByDay();

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center text-gray-700">
        <CalendarClock size={18} className="mr-2 text-autowise-blue" />
        <h3 className="font-medium">Disponibilité</h3>
      </div>

      {availabilityPeriods.length > 0 ? (
        <div className="space-y-4">
          {/* Liste des périodes de disponibilité */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-600">Périodes disponibles:</h4>
            <div className="space-y-4">
              {Object.entries(groupedPeriods).map(([dateKey, periods]) => {
                // Vérifier s'il s'agit d'une période multi-jours
                const isMultiDay = dateKey.includes('_');
                
                if (isMultiDay) {
                  // Afficher directement chaque période multi-jours
                  return periods.map(period => (
                    <div key={period.id} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center text-sm mb-1">
                        <CalendarClock size={16} className="mr-2 text-autowise-blue" />
                        <span className="font-medium text-gray-700">
                          Période complète
                        </span>
                      </div>
                      <div className="pl-6 text-gray-700">
                        {formatDateRange(period.startDate, period.endDate)}
                      </div>
                    </div>
                  ));
                }
                
                // Pour les périodes du même jour
                const dayDate = new Date(dateKey);
                return (
                  <div key={dateKey} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center text-sm mb-2">
                      <Calendar size={16} className="mr-2 text-autowise-blue" />
                      <span className="font-medium text-gray-700">
                        {format(dayDate, "EEEE dd MMMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    <div className="space-y-1 pl-6">
                      {periods.map(period => (
                        <div key={period.id} className="flex items-center text-sm">
                          <Clock size={14} className="mr-2 text-green-500" />
                          <span className="text-gray-700">
                            {format(period.startDate, "HH:mm", { locale: fr })} - {format(period.endDate, "HH:mm", { locale: fr })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendrier pour visualiser les disponibilités */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Calendrier de disponibilité:</h4>
            <Calendar
              mode="default"
              className="rounded border p-2 pointer-events-auto w-full max-w-xs"
              modifiersClassNames={{
                selected: "bg-autowise-blue text-white",
                today: "border border-autowise-blue",
              }}
              modifiers={{
                available: (date) => isDateAvailable(date),
              }}
              modifiersStyles={{
                available: { backgroundColor: "#e6f7ff", borderRadius: "0" },
              }}
              disabled={(date) => !isDateAvailable(date)}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 rounded-md text-center">
          <p className="text-red-600">Ce véhicule n'est pas disponible actuellement.</p>
        </div>
      )}
    </div>
  );
};

export default CarAvailabilityDisplay;
