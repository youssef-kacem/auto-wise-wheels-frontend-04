
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const NavbarLogo = () => {
  // État pour stocker le chemin du logo depuis Supabase Storage (si disponible)
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer le logo depuis Supabase Storage
    const fetchLogo = async () => {
      try {
        // Tenter de récupérer le logo depuis Supabase Storage
        const { data: publicUrl } = supabase.storage
          .from('car-images')
          .getPublicUrl('logo/autowise_logo.png');

        // Vérifier si l'image existe avec un fetch
        const response = await fetch(publicUrl.publicUrl, { method: 'HEAD' });
        
        if (response.ok) {
          setLogoUrl(publicUrl.publicUrl);
        } else {
          // Si l'image n'existe pas dans Supabase, on garde le logo local
          console.log('Logo non trouvé dans Supabase, utilisation du logo local');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du logo:', error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center">
        <img 
          src={logoUrl || "/lovable-uploads/9524452a-d5e6-4363-8bfa-1b7f6dd5d92b.png"} 
          alt="AutoWise" 
          className="h-16" 
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;
