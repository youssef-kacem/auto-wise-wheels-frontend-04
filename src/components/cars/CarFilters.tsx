
import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface CarFiltersProps {
  onFilterChange: (filters: {
    brand: string[];
    hasAC: boolean | null;
    hasDriver: boolean | null;
    minYear: number | null;
    maxYear: number | null;
  }) => void;
  brands: string[];
}

const CarFilters: React.FC<CarFiltersProps> = ({ onFilterChange, brands }) => {
  const currentYear = new Date().getFullYear();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [hasAC, setHasAC] = useState<boolean | null>(null);
  const [hasDriver, setHasDriver] = useState<boolean | null>(null);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      }
      return [...prev, brand];
    });
  };

  const handleACChange = (value: boolean | null) => {
    setHasAC(hasAC === value ? null : value);
  };

  const handleDriverChange = (value: boolean | null) => {
    setHasDriver(hasDriver === value ? null : value);
  };
  
  const handleYearChange = (type: 'min' | 'max', value: string) => {
    const yearValue = value ? parseInt(value, 10) : null;
    if (type === 'min') {
      setMinYear(yearValue);
    } else {
      setMaxYear(yearValue);
    }
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setHasAC(null);
    setHasDriver(null);
    setMinYear(null);
    setMaxYear(null);
  };
  
  const applyFilters = () => {
    onFilterChange({
      brand: selectedBrands,
      hasAC,
      hasDriver,
      minYear,
      maxYear,
    });
  };

  return (
    <div className="mb-6">
      {/* Filtres mobile */}
      <div className="md:hidden">
        <button
          className="w-full py-2 px-4 bg-white border rounded-md shadow-sm flex justify-between items-center"
          onClick={toggleMobileFilters}
        >
          <span className="flex items-center">
            <Filter size={18} className="mr-2" />
            Filtres
          </span>
          {mobileFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {mobileFiltersOpen && (
          <div className="mt-3 p-4 bg-white rounded-md shadow-md animate-fade-in">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Filtres</h3>
              <button onClick={resetFilters} className="text-sm text-autowise-blue flex items-center">
                <X size={14} className="mr-1" /> Réinitialiser
              </button>
            </div>
            
            {/* Filtres contenu (mobile) */}
            <div className="space-y-5">
              {/* Marques */}
              <div>
                <h4 className="font-medium mb-2">Marques</h4>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-autowise-blue"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Climatisation */}
              <div>
                <h4 className="font-medium mb-2">Climatisation</h4>
                <div className="flex gap-3">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${hasAC === true ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => handleACChange(true)}
                  >
                    Avec
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${hasAC === false ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => handleACChange(false)}
                  >
                    Sans
                  </button>
                </div>
              </div>
              
              {/* Chauffeur */}
              <div>
                <h4 className="font-medium mb-2">Chauffeur</h4>
                <div className="flex gap-3">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${hasDriver === true ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => handleDriverChange(true)}
                  >
                    Avec
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md ${hasDriver === false ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => handleDriverChange(false)}
                  >
                    Sans
                  </button>
                </div>
              </div>
              
              {/* Année */}
              <div>
                <h4 className="font-medium mb-2">Année</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">Min</label>
                    <select 
                      className="input-field mt-1 text-sm"
                      value={minYear?.toString() || ''}
                      onChange={(e) => handleYearChange('min', e.target.value)}
                    >
                      <option value="">Indifférent</option>
                      {Array.from({ length: 20 }, (_, i) => currentYear - i).map(year => (
                        <option key={`min-${year}`} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max</label>
                    <select 
                      className="input-field mt-1 text-sm"
                      value={maxYear?.toString() || ''}
                      onChange={(e) => handleYearChange('max', e.target.value)}
                    >
                      <option value="">Indifférent</option>
                      {Array.from({ length: 20 }, (_, i) => currentYear - i).map(year => (
                        <option key={`max-${year}`} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full btn-primary mt-4"
                onClick={applyFilters}
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filtres desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm p-5 border">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Filtres</h3>
          <button onClick={resetFilters} className="text-sm text-autowise-blue flex items-center">
            <X size={14} className="mr-1" /> Réinitialiser
          </button>
        </div>
        
        {/* Filtres contenu (desktop) */}
        <div className="space-y-6">
          {/* Marques */}
          <div>
            <h4 className="font-medium mb-3">Marques</h4>
            <div className="grid grid-cols-2 gap-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-autowise-blue"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
          
          {/* Climatisation */}
          <div>
            <h4 className="font-medium mb-3">Climatisation</h4>
            <div className="flex gap-3">
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${hasAC === true ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleACChange(true)}
              >
                Avec climatisation
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${hasAC === false ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleACChange(false)}
              >
                Sans climatisation
              </button>
            </div>
          </div>
          
          {/* Chauffeur */}
          <div>
            <h4 className="font-medium mb-3">Chauffeur</h4>
            <div className="flex gap-3">
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${hasDriver === true ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleDriverChange(true)}
              >
                Avec chauffeur
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${hasDriver === false ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleDriverChange(false)}
              >
                Sans chauffeur
              </button>
            </div>
          </div>
          
          {/* Année */}
          <div>
            <h4 className="font-medium mb-3">Année</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Min</label>
                <select 
                  className="input-field mt-1 w-full"
                  value={minYear?.toString() || ''}
                  onChange={(e) => handleYearChange('min', e.target.value)}
                >
                  <option value="">Indifférent</option>
                  {Array.from({ length: 20 }, (_, i) => currentYear - i).map(year => (
                    <option key={`min-${year}`} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Max</label>
                <select 
                  className="input-field mt-1 w-full"
                  value={maxYear?.toString() || ''}
                  onChange={(e) => handleYearChange('max', e.target.value)}
                >
                  <option value="">Indifférent</option>
                  {Array.from({ length: 20 }, (_, i) => currentYear - i).map(year => (
                    <option key={`max-${year}`} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full btn-primary mt-2"
            onClick={applyFilters}
          >
            Appliquer les filtres
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
