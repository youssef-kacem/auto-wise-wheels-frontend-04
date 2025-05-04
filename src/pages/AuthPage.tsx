
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const { action } = useParams<{ action: string }>();
  const [isRegistered, setIsRegistered] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location.state]);
  
  // Redirection si venant de s'inscrire
  if (isRegistered) {
    return <Navigate to="/auth/login" />;
  }

  // Simuler une connexion pour le développement
  const handleDemoLogin = () => {
    login('utilisateur@exemple.com', 'motdepasse');
  };

  // Déterminer quelle action afficher (login ou register)
  let currentAction = action || 'login';
  if (!['login', 'register', 'reset-password'].includes(currentAction)) {
    currentAction = 'login';
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
        <div className="container-autowise">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            {/* En-têtes */}
            {currentAction === 'login' && (
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
                <p className="text-gray-600 mt-2">
                  Bienvenue sur AutoWise, connectez-vous pour accéder à votre compte
                </p>
                {location.state && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                    Vous devez être connecté pour accéder à cette page.
                  </div>
                )}
              </div>
            )}

            {currentAction === 'register' && (
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
                <p className="text-gray-600 mt-2">
                  Rejoignez AutoWise et profitez de nos services de location premium
                </p>
              </div>
            )}

            {currentAction === 'reset-password' && (
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Réinitialisation du mot de passe</h1>
                <p className="text-gray-600 mt-2">
                  Entrez votre adresse e-mail pour recevoir un lien de réinitialisation
                </p>
              </div>
            )}

            {/* Formulaires */}
            {currentAction === 'login' && (
              <>
                <LoginForm />
                <div className="mt-4 border-t pt-4">
                  <button 
                    onClick={handleDemoLogin}
                    className="w-full btn-primary bg-green-600 hover:bg-green-700 mt-2"
                  >
                    Connexion démo (cliquez ici pour simuler)
                  </button>
                </div>
              </>
            )}
            
            {currentAction === 'register' && <RegisterForm />}
            
            {currentAction === 'reset-password' && (
              <form className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    placeholder="exemple@mail.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Envoyer le lien de réinitialisation
                </button>
                
                <div className="text-center mt-4">
                  <Link to="/auth/login" className="text-autowise-blue hover:underline">
                    Retour à la connexion
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
