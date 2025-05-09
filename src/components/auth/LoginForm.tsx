
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error: loginError } = await login(email, password);
      
      if (loginError) {
        setError(loginError.message || "Erreur de connexion. Veuillez vérifier vos identifiants.");
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Identifiants incorrects. Veuillez réessayer.",
        });
      } else {
        // Redirection vers la page d'origine ou la page d'accueil
        const from = (location.state as any)?.from || '/';
        navigate(from);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur AutoWise!",
        });
      }
    } catch (err: any) {
      setError(err.message || "Erreur de connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 p-3 rounded border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          placeholder="exemple@mail.com"
          required
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <Link to="/auth/reset-password" className="text-sm text-autowise-blue hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-autowise-blue focus:ring-autowise-blue"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
          Se souvenir de moi
        </label>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex justify-center items-center"
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
      
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/auth/register" className="text-autowise-blue hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
