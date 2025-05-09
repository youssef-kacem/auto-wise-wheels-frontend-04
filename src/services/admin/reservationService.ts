
import { supabase } from '@/integrations/supabase/client';
import type { Reservation, Car, Profile } from '@/types/supabase';

// Réservations - Admin
export const fetchAllReservations = async () => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, car:cars(*), user:profiles(*)');
    
    if (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      throw error;
    }
    
    // Type assertion to handle the response safely
    return (data || []) as unknown as (Reservation & { car: Car, user: Profile })[];
  } catch (error) {
    console.error("Erreur dans fetchAllReservations:", error);
    throw error;
  }
};

export const updateReservationStatus = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
  try {
    if (!id) {
      throw new Error("ID de réservation non valide");
    }
    
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
  } catch (error) {
    console.error(`Erreur dans updateReservationStatus pour la réservation ${id}:`, error);
    throw error;
  }
};
