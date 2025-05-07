
import { supabase } from '@/integrations/supabase/client';
import type { Car, CarImage } from '@/types/supabase';
import { useEffect, useState } from 'react';

export const fetchCars = async () => {
  const { data, error } = await supabase
    .from('cars')
    .select('*, car_images(*)');
  
  if (error) {
    console.error("Erreur lors de la récupération des voitures:", error);
    throw error;
  }
  
  return data as (Car & { car_images: CarImage[] })[];
};

export const fetchCarById = async (id: string) => {
  const { data, error } = await supabase
    .from('cars')
    .select('*, car_images(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Erreur lors de la récupération de la voiture ${id}:`, error);
    throw error;
  }
  
  return data as (Car & { car_images: CarImage[] });
};

export const useFetchCars = () => {
  const [cars, setCars] = useState<(Car & { car_images: CarImage[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cars, loading, error };
};

export const useFetchCarById = (id: string) => {
  const [car, setCar] = useState<(Car & { car_images: CarImage[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await fetchCarById(id);
        setCar(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { car, loading, error };
};
