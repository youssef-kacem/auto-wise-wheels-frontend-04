
import { supabase } from '@/integrations/supabase/client';
import type { Profile, UserRole, Car, Reservation } from '@/types/supabase';

// Utilisateurs
export const fetchAllUsers = async () => {
  // Vérifier que l'utilisateur est admin
  const { data: isAdmin } = await supabase.rpc('is_admin', { 
    user_id: (await supabase.auth.getUser()).data.user?.id 
  });

  if (!isAdmin) {
    throw new Error("Accès non autorisé");
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*, user_roles(*)');
  
  if (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
  
  return data as (Profile & { user_roles: UserRole[] })[];
};

// Voitures - Admin
export const createCar = async (car: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de la création de la voiture:", error);
    throw error;
  }
  
  return data as Car;
};

export const updateCar = async (id: string, car: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('cars')
    .update(car)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Erreur lors de la mise à jour de la voiture ${id}:`, error);
    throw error;
  }
  
  return data as Car;
};

export const deleteCar = async (id: string) => {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Erreur lors de la suppression de la voiture ${id}:`, error);
    throw error;
  }
  
  return true;
};

// Images de voitures
export const uploadCarImage = async (carId: string, file: File, isPrimary: boolean = false) => {
  // Upload de l'image dans le bucket
  const fileName = `${carId}/${Date.now()}-${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('car-images')
    .upload(fileName, file);
  
  if (uploadError) {
    console.error("Erreur lors de l'upload de l'image:", uploadError);
    throw uploadError;
  }
  
  // Obtention de l'URL publique
  const { data: publicURL } = supabase.storage
    .from('car-images')
    .getPublicUrl(fileName);
  
  // Enregistrement dans la base de données
  const { data, error } = await supabase
    .from('car_images')
    .insert([{
      car_id: carId,
      url: publicURL.publicUrl,
      is_primary: isPrimary
    }])
    .select()
    .single();
  
  if (error) {
    console.error("Erreur lors de l'enregistrement de l'image:", error);
    throw error;
  }
  
  return data;
};

export const deleteCarImage = async (id: string) => {
  // D'abord récupérer l'URL de l'image
  const { data: image, error: getError } = await supabase
    .from('car_images')
    .select('url')
    .eq('id', id)
    .single();
  
  if (getError) {
    console.error(`Erreur lors de la récupération de l'image ${id}:`, getError);
    throw getError;
  }
  
  // Extraire le nom du fichier de l'URL
  const urlParts = new URL(image.url).pathname.split('/');
  const fileName = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];
  
  // Supprimer de la base de données
  const { error: deleteDbError } = await supabase
    .from('car_images')
    .delete()
    .eq('id', id);
  
  if (deleteDbError) {
    console.error(`Erreur lors de la suppression de l'image ${id}:`, deleteDbError);
    throw deleteDbError;
  }
  
  // Supprimer du bucket
  const { error: deleteStorageError } = await supabase.storage
    .from('car-images')
    .remove([fileName]);
  
  if (deleteStorageError) {
    console.error(`Erreur lors de la suppression du fichier ${fileName}:`, deleteStorageError);
    // Ne pas bloquer même si l'erreur de stockage se produit
  }
  
  return true;
};

// Réservations - Admin
export const fetchAllReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, car:cars(*), user:profiles(*)');
  
  if (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    throw error;
  }
  
  return data as (Reservation & { car: Car, user: Profile })[];
};

export const updateReservationStatus = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
  const { data, error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Erreur lors de la mise à jour du statut de la réservation ${id}:`, error);
    throw error;
  }
  
  return data as Reservation;
};

// Statistiques
export const fetchStatistics = async () => {
  // Statistiques de base
  const [
    { data: totalCars, error: carsError },
    { data: totalUsers, error: usersError },
    { data: totalReservations, error: resError }
  ] = await Promise.all([
    supabase.from('cars').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('reservations').select('id', { count: 'exact', head: true })
  ]);
  
  if (carsError || usersError || resError) {
    throw new Error("Erreur lors de la récupération des statistiques");
  }
  
  // Réservations par statut
  const { data: reservationsByStatus, error: statusError } = await supabase
    .from('reservations')
    .select('status')
    .then(({ data, error }) => {
      if (error) throw error;
      
      const counts = {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
      };
      
      data?.forEach(res => {
        counts[res.status as keyof typeof counts]++;
      });
      
      return { data: counts, error: null };
    })
    .catch(err => ({ data: null, error: err }));
  
  if (statusError) {
    throw statusError;
  }
  
  return {
    totalCars: totalCars?.count || 0,
    totalUsers: totalUsers?.count || 0,
    totalReservations: totalReservations?.count || 0,
    reservationsByStatus
  };
};
