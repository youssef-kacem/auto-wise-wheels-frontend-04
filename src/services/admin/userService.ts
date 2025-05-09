
import { supabase } from '@/integrations/supabase/client';
import type { Profile, UserRole } from '@/types/supabase';

// Utilisateurs
export const fetchAllUsers = async () => {
  try {
    // Vérifier que l'utilisateur est admin
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.id) {
      throw new Error("Utilisateur non authentifié");
    }
    
    const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin', { 
      user_id: user.user.id 
    });

    if (adminCheckError) {
      console.error("Erreur lors de la vérification des droits d'administration:", adminCheckError);
      throw new Error("Erreur lors de la vérification des droits d'administration");
    }

    if (!isAdmin) {
      throw new Error("Accès non autorisé");
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_roles(*)');
    
    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
    
    return data as (Profile & { user_roles: UserRole[] })[];
  } catch (error) {
    console.error("Erreur dans fetchAllUsers:", error);
    throw error;
  }
};
