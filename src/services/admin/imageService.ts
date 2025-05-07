
import { supabase } from '@/integrations/supabase/client';

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
