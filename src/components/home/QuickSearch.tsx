
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export default function QuickSearch() {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const { data, error } = await supabase
          .from('states')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setStates(data || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state is selected
  useEffect(() => {
    if (!state) {
      setCities([]);
      setCity("");
      return;
    }

    const fetchCities = async () => {
      try {
        const { data, error } = await supabase
          .from('cities')
          .select('*')
          .eq('state_id', state)
          .eq('is_active', true)
          .order('name');
        
        if (error) throw error;
        setCities(data || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [state]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (state) params.append("estado", state);
    if (city) params.append("cidade", city);
    if (ageRange) params.append("idade", ageRange);
    
    navigate(`/busca?${params.toString()}`);
  };

  return (
    <div className="bg-black border border-brand-red/20 rounded-lg p-6 max-w-4xl mx-auto -mt-12 relative z-10 shadow-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">
        Encontre Acompanhantes
      </h2>
      
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm text-gray-300">
            Estado
          </label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="bg-black/70 border-gray-700 focus:ring-brand-red">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {states.map((stateItem) => (
                <SelectItem key={stateItem.id} value={stateItem.id}>
                  {stateItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm text-gray-300">
            Cidade
          </label>
          <Select value={city} onValueChange={setCity} disabled={!state || cities.length === 0}>
            <SelectTrigger className="bg-black/70 border-gray-700 focus:ring-brand-red">
              <SelectValue placeholder={!state ? "Selecione o estado primeiro" : "Selecione a cidade"} />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {cities.map((cityItem) => (
                <SelectItem key={cityItem.id} value={cityItem.id}>
                  {cityItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ageRange" className="text-sm text-gray-300">
            Faixa Etária
          </label>
          <Select value={ageRange} onValueChange={setAgeRange}>
            <SelectTrigger className="bg-black/70 border-gray-700 focus:ring-brand-red">
              <SelectValue placeholder="Selecione a idade" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="18-25">18-25 anos</SelectItem>
              <SelectItem value="26-30">26-30 anos</SelectItem>
              <SelectItem value="31-35">31-35 anos</SelectItem>
              <SelectItem value="36-40">36-40 anos</SelectItem>
              <SelectItem value="40+">Acima de 40</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="bg-brand-red hover:bg-red-900 text-white flex items-center justify-center gap-2 h-10 mt-auto">
          <SearchIcon size={18} />
          Pesquisar
        </Button>
      </form>
    </div>
  );
}
