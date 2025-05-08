
import { supabase, getPublicImageUrl } from '@/integrations/supabase/client';
import { Car, CarImage } from '@/types/supabase';

// Récupérer toutes les voitures avec leurs images
export const fetchAllCars = async () => {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      images:car_images(*)
    `)
    .eq('is_available', true)
    .order('brand', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des voitures:', error);
    throw error;
  }

  // Transformer les URLs des images pour utiliser les URLs publiques
  return data?.map(car => ({
    ...car,
    images: car.images?.map((image: CarImage) => ({
      ...image,
      url: getPublicImageUrl(image.url)
    }))
  }));
};

// Récupérer une voiture par son ID
export const fetchCarById = async (carId: string) => {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      images:car_images(*)
    `)
    .eq('id', carId)
    .single();

  if (error) {
    console.error('Erreur lors de la récupération de la voiture:', error);
    throw error;
  }

  // Transformer les URLs des images
  return {
    ...data,
    images: data.images?.map((image: CarImage) => ({
      ...image,
      url: getPublicImageUrl(image.url)
    }))
  };
};

// Créer une nouvelle voiture
export const createCar = async (carData: Car) => {
  // S'assurer que les champs requis sont présents
  if (!carData.brand || !carData.model || !carData.price || !carData.year) {
    throw new Error('Les champs brand, model, price et year sont requis');
  }

  const { data, error } = await supabase
    .from('cars')
    .insert({
      brand: carData.brand,
      model: carData.model,
      price: carData.price,
      year: carData.year,
      description: carData.description,
      features: carData.features,
      is_available: carData.is_available,
      category: carData.category,
      fuel_type: carData.fuel_type,
      transmission: carData.transmission,
      seats: carData.seats,
      rating: carData.rating
    })
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de la voiture:', error);
    throw error;
  }

  return data;
};

// Mettre à jour une voiture
export const updateCar = async (carId: string, updates: Partial<Car>) => {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', carId)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la mise à jour de la voiture:', error);
    throw error;
  }

  return data;
};

// Supprimer une voiture
export const deleteCar = async (carId: string) => {
  // Supprimer d'abord les images liées à la voiture
  const { error: imageError } = await supabase
    .from('car_images')
    .delete()
    .eq('car_id', carId);

  if (imageError) {
    console.error('Erreur lors de la suppression des images:', imageError);
    throw imageError;
  }

  // Puis supprimer la voiture
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', carId);

  if (error) {
    console.error('Erreur lors de la suppression de la voiture:', error);
    throw error;
  }

  return true;
};

// Recherche de voitures avec filtres
export const searchCars = async (filters: Record<string, any>) => {
  let query = supabase
    .from('cars')
    .select(`
      *,
      images:car_images(*)
    `)
    .eq('is_available', true);

  // Appliquer les filtres
  if (filters.brand) {
    query = query.eq('brand', filters.brand);
  }
  
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters.transmission) {
    query = query.eq('transmission', filters.transmission);
  }

  if (filters.fuelType) {
    query = query.eq('fuel_type', filters.fuelType);
  }

  if (filters.minSeats) {
    query = query.gte('seats', filters.minSeats);
  }

  // Exécuter la requête
  const { data, error } = await query.order('price', { ascending: filters.sortByPriceAsc !== false });

  if (error) {
    console.error('Erreur lors de la recherche des voitures:', error);
    throw error;
  }

  // Transformer les URLs des images
  return data?.map(car => ({
    ...car,
    images: car.images?.map((image: CarImage) => ({
      ...image,
      url: getPublicImageUrl(image.url)
    }))
  }));
};
