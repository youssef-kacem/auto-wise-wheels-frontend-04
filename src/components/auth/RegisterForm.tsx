
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simuler l'inscription (à remplacer par une vraie API)
    try {
      // Simulation d'une requête API
      setTimeout(() => {
        // Simuler une inscription réussie
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès!",
        });
        
        // Rediriger vers la page de connexion
        // window.location.href = '/auth/login';
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <User size={18} />
              </span>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Jean"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Dupont"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse e-mail *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail size={18} />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="exemple@mail.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Phone size={18} />
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock size={18} />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="input-field pl-10 pr-10"
              placeholder="Minimum 8 caractères"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock size={18} />
            </span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="Confirmer votre mot de passe"
              required
            />
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          En vous inscrivant, vous acceptez nos{' '}
          <Link to="/terms" className="text-autowise-blue hover:underline">
            Conditions Générales
          </Link>{' '}
          et notre{' '}
          <Link to="/privacy" className="text-autowise-blue hover:underline">
            Politique de Confidentialité
          </Link>
          .
        </div>
      
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex justify-center items-center mt-4"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Inscription en cours...
            </span>
          ) : (
            "S'inscrire"
          )}
        </button>
        
        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">Vous avez déjà un compte?</span>{' '}
          <Link to="/auth/login" className="text-autowise-blue hover:underline">
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
