
interface BookingOption {
  id: string;
  name: string;
  price: number;
}

export const calculateDays = (dateRange: { from: Date | undefined; to: Date | undefined }): number => {
  if (dateRange.from && dateRange.to) {
    const diffTime = dateRange.to.getTime() - dateRange.from.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }
  return 0;
};

export const calculateTotalPrice = (
  carPrice: number | undefined,
  numberOfDays: number,
  withDriver: boolean,
  additionalOptions: string[],
  availableOptions: BookingOption[]
): number => {
  if (!carPrice) return 0;
  let total = carPrice * numberOfDays;
  
  // Coût du chauffeur
  if (withDriver) {
    total += 80 * numberOfDays; // 80€ par jour pour le chauffeur
  }
  
  // Coût des options additionnelles
  additionalOptions.forEach(optionId => {
    const option = availableOptions.find(opt => opt.id === optionId);
    if (option) {
      total += option.price * numberOfDays;
    }
  });
  
  return total;
};
