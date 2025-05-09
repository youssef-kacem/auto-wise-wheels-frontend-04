
import { supabase } from '@/integrations/supabase/client';
import type { Reservation, Car, Profile } from '@/types/supabase';

// Réservations - Admin
export const fetchAllReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, car:cars(*), user:profiles(*)');
  
  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }
  
  return data as (Reservation & { car: Car, user: Profile })[];
};

export const updateReservationStatus = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Erreur lors de la mise à jour du statut de la réservation ${id}:`, error);
    throw error;
  }
  
  return data as Reservation;
};
