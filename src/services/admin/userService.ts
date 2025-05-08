
import { supabase } from '@/integrations/supabase/client';
import type { Profile, UserRole } from '@/types/supabase';

// Utilisateurs
export const fetchAllUsers = async () => {
  // Vérifier que l'utilisateur est admin
  const { data: isAdmin } = await supabase.rpc('is_admin', { 
    user_id: (await supabase.auth.getUser()).data.user?.id 
  });

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
  
  // Typage explicite pour résoudre l'erreur
  const typedData = data as unknown as (Profile & { user_roles: UserRole[] })[];
  return typedData;
};
