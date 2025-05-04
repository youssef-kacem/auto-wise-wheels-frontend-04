
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: User | null;
}

interface User {
  id: string;
  email: string;
  name: string;
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

  // Vérification au chargement si l'utilisateur est déjà connecté
  useEffect(() => {
    const storedUser = localStorage.getItem('autowise_user');
    const storedAuthStatus = localStorage.getItem('autowise_authenticated');
    
    if (storedUser && storedAuthStatus === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // Dans un environnement réel, cette logique serait remplacée par un appel API
    // Pour l'instant, on simule une connexion réussie
    const mockUser = {
      id: '123',
      email: email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Sauvegarde dans le localStorage pour persistance
    localStorage.setItem('autowise_user', JSON.stringify(mockUser));
    localStorage.setItem('autowise_authenticated', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Supprimer du localStorage
    localStorage.removeItem('autowise_user');
    localStorage.removeItem('autowise_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
