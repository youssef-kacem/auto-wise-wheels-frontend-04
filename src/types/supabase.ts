
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string | null;
  features: Record<string, any> | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  images?: CarImage[];
  // Ajout des nouveaux champs
  category?: string | null;
  fuel_type?: string | null;
  transmission?: string | null;
  seats?: number | null;
  rating?: number | null;
}

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  is_primary: boolean;
  created_at: string;
}

export interface Reservation {
  id: string;
  user_id: string | null;
  car_id: string | null;
  start_date: string;
  end_date: string;
  pickup_location: string;
  return_location: string;
  with_driver: boolean;
  additional_options: Record<string, any> | null;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  car?: Car;
  // Ajout des nouveaux champs
  payment_status?: string | null;
  payment_method?: string | null;
  payment_date?: string | null;
  payment_reference?: string | null;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'client' | 'admin';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  is_read: boolean;
  created_at: string;
  related_entity?: string | null;
  related_id?: string | null;
}
