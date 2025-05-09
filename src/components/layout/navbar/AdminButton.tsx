
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavbar } from './contexts/NavbarContext';

interface AdminButtonProps {
  isMobile?: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({ isMobile = false }) => {
  const { isActive, user } = useNavbar();
  
  // Don't render if there's no user
  if (!user) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/admin/dashboard" 
            className={`${isMobile ? 'mr-3 p-1.5' : 'ml-2 p-2'} rounded-full transition-colors duration-200 ${
              isActive('/admin') 
                ? "bg-autowise-blue text-white" 
                : "text-gray-500 hover:text-autowise-blue hover:bg-gray-100"
            }`}
            aria-label="Administration"
          >
            <Settings size={isMobile ? 18 : 20} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Accéder à l'administration</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AdminButton;
