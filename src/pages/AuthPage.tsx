
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  const { action } = useParams<{ action: string }>();
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Redirection si venant de s'inscrire
  if (isRegistered) {
    return <Navigate to="/auth/login" />;
  }

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
            {currentAction === 'login' && <LoginForm />}
            
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
