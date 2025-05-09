
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

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);
        
        // Defer checking admin status with setTimeout to avoid deadlocks
        if (currentSession?.user) {
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

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);
      
      if (currentSession?.user) {
        checkIsAdmin(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const checkIsAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
      if (error) {
        console.error("Erreur lors de la vérification du rôle admin:", error);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Erreur lors de la vérification du rôle admin:", error);
      setIsAdmin(false);
    }
  };

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
