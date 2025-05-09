
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();

  // Si l'utilisateur est déjà connecté et est admin, rediriger vers le dashboard
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      console.log("Utilisateur déjà authentifié comme admin, redirection vers le dashboard admin");
      navigate('/admin/dashboard');
    } else if (isAuthenticated && !isAdmin) {
      console.log("Utilisateur authentifié mais pas admin, affichage d'un message d'erreur");
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administration nécessaires.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Tentative de connexion administrateur avec:", email);
      // Utiliser la fonction login du contexte d'authentification
      await login(email, password);
      
      // La vérification admin se fait automatiquement dans le contexte
      // et la redirection est gérée par l'useEffect ci-dessus
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Identifiants invalides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonction de test pour une connexion admin rapide (à utiliser uniquement en développement)
  const handleTestAdminLogin = async () => {
    setEmail('admin@autowise.tn');
    setPassword('adminpassword');
    try {
      setLoading(true);
      await login('admin@autowise.tn', 'adminpassword');
    } catch (error) {
      console.error("Erreur de connexion test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Administration AutoWise
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connexion à l'espace d'administration
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-autowise-blue focus:border-autowise-blue sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-autowise-blue focus:border-autowise-blue sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-autowise-blue hover:bg-autowise-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-autowise-blue"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-500">
              <a 
                href="/"
                className="font-medium text-autowise-blue hover:text-autowise-blue-dark"
              >
                Retour au site
              </a>
            </p>
          </div>
          
          {/* Bouton de connexion rapide en mode développement */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleTestAdminLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Test Admin Login (Pour développement)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
