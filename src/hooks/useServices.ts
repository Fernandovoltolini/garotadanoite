
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return { services, loading };
};
