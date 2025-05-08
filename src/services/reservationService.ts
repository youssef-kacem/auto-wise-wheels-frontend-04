
import { supabase } from '@/integrations/supabase/client';
import { Reservation } from '@/types/supabase';

// Récupérer toutes les réservations d'un utilisateur
export const fetchUserReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      car:car_id (
        id,
        brand,
        model,
        year,
        price,
        images:car_images(*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw error;
  }

  return data;
};

// Création d'une nouvelle réservation
export const createReservation = async (reservationData: Reservation) => {
  // S'assurer que les champs requis sont présents
  if (!reservationData.start_date || !reservationData.end_date || !reservationData.pickup_location || 
      !reservationData.return_location || !reservationData.total_price) {
    throw new Error('Tous les champs requis doivent être remplis');
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      user_id: reservationData.user_id,
      car_id: reservationData.car_id,
      start_date: reservationData.start_date,
      end_date: reservationData.end_date,
      pickup_location: reservationData.pickup_location,
      return_location: reservationData.return_location,
      with_driver: reservationData.with_driver,
      additional_options: reservationData.additional_options,
      total_price: reservationData.total_price,
      status: reservationData.status || 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    throw error;
  }

  return data;
};

// Mettre à jour une réservation
export const updateReservation = async (id: string, updates: Partial<Reservation>) => {
  const { data, error } = await supabase
    .from('reservations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    throw error;
  }

  return data;
};

// Annuler une réservation
export const cancelReservation = async (id: string) => {
  return updateReservation(id, { status: 'cancelled' });
};

// Vérifier la disponibilité d'une voiture sur une période donnée
export const checkCarAvailability = async (carId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .rpc('check_car_availability', {
      car_id: carId,
      start_date: startDate,
      end_date: endDate
    });

  if (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    throw error;
  }

  return data;
};

// Récupérer les détails d'une réservation spécifique
export const getReservationDetails = async (reservationId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      car:car_id (
        id,
        brand,
        model,
        year,
        price,
        description,
        features,
        images:car_images(*)
      )
    `)
    .eq('id', reservationId)
    .single();

  if (error) {
    console.error('Erreur lors de la récupération des détails de la réservation:', error);
    throw error;
  }

  return data;
};
