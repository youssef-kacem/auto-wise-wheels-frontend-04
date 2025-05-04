
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  onChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, className }) => {
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    onChange(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              !date.from && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "d MMMM yyyy", { locale: fr })} - {format(date.to, "d MMMM yyyy", { locale: fr })}
                  </>
                ) : (
                  format(date.from, "d MMMM yyyy", { locale: fr })
                )
              ) : (
                "Sélectionnez les dates"
              )}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            locale={fr}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
