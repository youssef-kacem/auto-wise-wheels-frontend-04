
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { CalendarClock, Check } from 'lucide-react';

export interface AvailabilityPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface CarAvailabilityDisplayProps {
  availabilityPeriods: AvailabilityPeriod[];
}

const CarAvailabilityDisplay: React.FC<CarAvailabilityDisplayProps> = ({ availabilityPeriods }) => {
  // Fonction pour formatter les dates
  const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${format(startDate, "dd MMM", { locale: fr })} - ${format(endDate, "dd MMM yyyy", { locale: fr })}`;
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

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center text-gray-700">
        <CalendarClock size={18} className="mr-2 text-autowise-blue" />
        <h3 className="font-medium">Disponibilité</h3>
      </div>

      {availabilityPeriods.length > 0 ? (
        <div className="space-y-4">
          {/* Liste des périodes de disponibilité */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">Périodes disponibles:</h4>
            <ul className="space-y-1">
              {availabilityPeriods.map(period => (
                <li key={period.id} className="flex items-center text-sm">
                  <Check size={16} className="mr-2 text-green-500" />
                  <span className="text-gray-700">
                    {formatDateRange(period.startDate, period.endDate)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Calendrier pour visualiser les disponibilités */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Calendrier de disponibilité:</h4>
            <Calendar
              mode="default"
              className="rounded border p-2 pointer-events-auto"
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
