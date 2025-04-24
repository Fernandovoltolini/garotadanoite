
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface State {
  id: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  name: string;
  state_id: string;
  is_active: boolean;
}

export const useLocation = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      const { data: statesData, error } = await supabase
        .from('states')
        .select('*')
        .order('name');
      
      if (!error && statesData) {
        setStates(statesData);
      }
    };

    fetchStates();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const { data: citiesData, error } = await supabase
          .from('cities')
          .select('*')
          .eq('state_id', selectedState)
          .eq('is_active', true)
          .order('name');
        
        if (!error && citiesData) {
          setCities(citiesData);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedState]);

  return {
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
    loading
  };
};
