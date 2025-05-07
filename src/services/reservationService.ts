
import { supabase } from '@/integrations/supabase/client';
import type { Reservation, Car } from '@/types/supabase';
import { useEffect, useState } from 'react';

export const fetchUserReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, car:cars(*, car_images(*))')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }
  
  return data as (Reservation & { car: Car & { car_images: any[] } })[];
};

export const createReservation = async (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }
  
  return data as Reservation;
};

export const cancelReservation = async (id: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de l'annulation de la réservation:", error);
    throw error;
  }
  
  return data as Reservation;
};

export const useFetchUserReservations = () => {
  const [reservations, setReservations] = useState<(Reservation & { car: Car & { car_images: any[] } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserReservations();
        setReservations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    };

    // Vérifier si l'utilisateur est connecté avant de charger les réservations
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchData();
      } else {
        setReservations([]);
        setLoading(false);
      }
    });

    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { reservations, loading, error, refetch: fetchUserReservations };
};

export const checkCarAvailability = async (carId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .rpc('check_car_availability', { 
      car_id: carId, 
      start_date: startDate, 
      end_date: endDate 
    });
  
  if (error) {
    console.error("Erreur lors de la vérification de disponibilité:", error);
    throw error;
  }
  
  return data as boolean;
};
