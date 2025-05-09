
import { useLocation } from 'react-router-dom';

/**
 * Hook that returns a function to check if a path is active
 */
export const useIsActive = () => {
  const location = useLocation();
  
  return (path: string): boolean => {
    // Handle root path special case
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    
    // For other paths, check if the current pathname starts with the given path
    // This handles nested routes properly
    return path !== '/' && location.pathname.startsWith(path);
  };
};
