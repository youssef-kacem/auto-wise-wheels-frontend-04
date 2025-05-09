
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fonction pour vérifier si l'utilisateur est admin
  const checkIsAdmin = async (userId: string) => {
    try {
      console.log("Vérification du rôle admin pour l'utilisateur:", userId);
      const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
      
      if (error) {
        console.error("Erreur lors de la vérification du rôle admin:", error);
        setIsAdmin(false);
        return;
      }
      
      console.log("Résultat de la vérification admin:", data);
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Exception lors de la vérification du rôle admin:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // D'abord, configurer l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Événement d'authentification détecté:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        // Vérifier le rôle admin si l'utilisateur est connecté
        if (currentSession?.user) {
          // Utiliser un délai pour éviter les problèmes de synchronisation
          setTimeout(() => {
            checkIsAdmin(currentSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }

        if (event === 'SIGNED_OUT') {
          toast({
            title: "Déconnexion réussie",
            description: "Vous avez été déconnecté avec succès.",
          });
        }
      }
    );

    // Ensuite, vérifier la session existante
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Session existante:", currentSession ? "Oui" : "Non");
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        if (currentSession?.user) {
          await checkIsAdmin(currentSession.user.id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur AutoWise !",
      });

      // État mis à jour automatiquement via onAuthStateChange
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès !",
      });

      // État mis à jour automatiquement via onAuthStateChange
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // État mis à jour automatiquement via onAuthStateChange
      
      // Supprimer les données d'admin
      localStorage.removeItem('autowise_admin_authenticated');
      localStorage.removeItem('autowise_admin_email');
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        register,
        logout, 
        user, 
        session,
        isAdmin,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
