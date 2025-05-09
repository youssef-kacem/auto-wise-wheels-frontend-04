
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Reservation } from '@/types/supabase';
import { useToast } from './use-toast';

export const useReservations = (userId: string | undefined) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);
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

        if (error) throw error;

        // Use type assertion to ensure compatibility with Reservation type
        setReservations(data as unknown as Reservation[]);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        toast({
          title: "Erreur",
          description: "Impossible de charger vos réservations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId, toast]);

  return { reservations, loading, error };
};

export default useReservations;
