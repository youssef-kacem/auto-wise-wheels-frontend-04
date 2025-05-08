
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fonction pour vérifier si l'utilisateur est admin
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data: adminData, error: adminError } = await supabase.rpc('is_admin', {
        user_id: userId
      });

      if (adminError) {
        console.error("Erreur lors de la vérification du statut admin:", adminError);
        return false;
      }
      
      return !!adminData; // Convertit en booléen
    } catch (error) {
      console.error("Exception lors de la vérification du statut admin:", error);
      return false;
    }
  };

  // Effet pour vérifier la session et configurer l'écouteur d'authentification
  useEffect(() => {
    const setupAuth = async () => {
      setLoading(true);
      
      // Configurer l'écouteur d'événements d'authentification AVANT de vérifier la session
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const currentUser = session?.user || null;
          setUser(currentUser);
          
          if (currentUser) {
            const adminStatus = await checkAdminStatus(currentUser.id);
            setIsAdmin(adminStatus);
          } else {
            setIsAdmin(false);
          }
          
          setLoading(false);
        }
      );

      // Vérifier la session actuelle
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const adminStatus = await checkAdminStatus(session.user.id);
        setIsAdmin(adminStatus);
      }
      
      setLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };
      
      // Vérifier si l'utilisateur est admin après connexion
      if (data.user) {
        const adminStatus = await checkAdminStatus(data.user.id);
        setIsAdmin(adminStatus);
      }
      
      return { error: null };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return { error };
    }
  };

  // Fonction d'inscription
  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
          },
        },
      });

      if (error) return { error };
      return { error: null };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return { error };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const contextValue = {
    isAuthenticated: !!user,
    isAdmin,
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
