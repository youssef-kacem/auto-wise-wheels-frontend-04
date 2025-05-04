
import React from 'react';
import { Calendar } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

interface DateSelectionProps {
  onChange: (dateRange: { from: Date | undefined; to: Date | undefined }) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Dates de location
      </label>
      <DateRangePicker onChange={onChange} />
    </div>
  );
};

export default DateSelection;
