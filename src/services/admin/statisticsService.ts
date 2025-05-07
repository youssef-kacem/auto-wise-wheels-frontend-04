
import { supabase } from '@/integrations/supabase/client';

// Statistiques
export const fetchStatistics = async () => {
  // Statistiques de base
  const [
    carsResponse,
    usersResponse,
    reservationsResponse
  ] = await Promise.all([
    supabase.from('cars').select('id', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('reservations').select('id', { count: 'exact' })
  ]);
  
  if (carsResponse.error || usersResponse.error || reservationsResponse.error) {
    throw new Error("Erreur lors de la récupération des statistiques");
  }
  
  // Réservations par statut
  const reservationsByStatusPromise = supabase
    .from('reservations')
    .select('status')
    .then(({ data, error }) => {
      if (error) throw error;
      
      const counts = {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
      };
      
      data?.forEach(res => {
        counts[res.status as keyof typeof counts]++;
      });
      
      return { data: counts, error: null };
    });

  try {
    const { data: reservationsByStatus } = await reservationsByStatusPromise;
    
    return {
      totalCars: carsResponse.count || 0,
      totalUsers: usersResponse.count || 0,
      totalReservations: reservationsResponse.count || 0,
      reservationsByStatus
    };
  } catch (error) {
    console.error("Erreur lors du comptage des réservations par statut:", error);
    throw error;
  }
};
