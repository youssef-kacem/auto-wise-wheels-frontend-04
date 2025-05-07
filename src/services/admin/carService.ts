
import { supabase } from '@/integrations/supabase/client';
import type { Car } from '@/types/supabase';

// Voitures - Admin
export const createCar = async (car: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de la création de la voiture:", error);
    throw error;
  }
  
  return data as Car;
};

export const updateCar = async (id: string, car: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('cars')
    .update(car)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Erreur lors de la mise à jour de la voiture ${id}:`, error);
    throw error;
  }
  
  return data as Car;
};

export const deleteCar = async (id: string) => {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Erreur lors de la suppression de la voiture ${id}:`, error);
    throw error;
  }
  
  return true;
};
