
import { supabase } from '@/integrations/supabase/client';
import type { Profile } from '@/types/supabase';
import { useEffect, useState } from 'react';

export const fetchUserProfile = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("Utilisateur non connecté");
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  if (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    throw error;
  }
  
  return data as Profile;
};

export const updateUserProfile = async (profile: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("Utilisateur non connecté");
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', session.user.id)
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
  
  return data as Profile;
};

export const useFetchUserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    };

    // Vérifier si l'utilisateur est connecté avant de charger le profil
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchData();
      } else {
        setProfile(null);
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

  return { profile, loading, error, refetch: fetchUserProfile };
};
