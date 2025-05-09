
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { fetchUserReservations, cancelReservation } from '@/services/reservationService';
import { Reservation } from '@/types/supabase';

export const useReservations = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check user session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };

    checkSession();

    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadReservations = async () => {
      try {
        setLoading(true);
        const data = await fetchUserReservations(user.id);
        // Cast the response to ensure type safety
        setReservations(data as Reservation[]);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos réservations.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [user, toast]);

  const handleCancelReservation = async (id: string) => {
    try {
      await cancelReservation(id);
      // Update local state
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation.",
        variant: "destructive",
      });
    }
  };

  return {
    reservations,
    loading,
    handleCancelReservation
  };
};
