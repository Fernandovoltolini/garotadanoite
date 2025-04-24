
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useServices } from "@/hooks/useServices";

interface SearchFiltersProps {
  filters: {
    estado: string;
    cidade: string;
    idade: string;
    idiomas: string[];
    disponibilidade: string;
    servicos: string[];
    precoMin: number;
    precoMax: number;
  };
  setFilters: (filters: any) => void;
}

const SearchFilters = ({ filters, setFilters }: SearchFiltersProps) => {
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const { services, loading: servicesLoading } = useServices();
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const fetchStates = async () => {
      const { data } = await supabase
        .from('states')
        .select('*')
        .order('name');
      
      if (data) {
        setStates(data);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!filters.estado) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      const { data } = await supabase
        .from('cities')
        .select('*')
        .eq('state_id', filters.estado)
        .eq('is_active', true)
        .order('name');
      
      if (data) {
        setCities(data);
      }
    };

    fetchCities();
  }, [filters.estado]);

  const handleReset = () => {
    setFilters({
      estado: "",
      cidade: "",
      idade: "",
      idiomas: [],
      disponibilidade: "",
      servicos: [],
      precoMin: 0,
      precoMax: 1000
    });
  };

  const toggleService = (serviceId: string) => {
    const currentServices = filters.servicos || [];
    if (currentServices.includes(serviceId)) {
      setFilters({ 
        ...filters, 
        servicos: currentServices.filter(id => id !== serviceId) 
      });
    } else {
      setFilters({ 
        ...filters, 
        servicos: [...currentServices, serviceId] 
      });
    }
  };

  return (
    <div className="bg-black/50 border border-brand-red/20 rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="estado" className="text-white mb-2">Estado</Label>
          <Select value={filters.estado} onValueChange={(value) => {
            setFilters({ ...filters, estado: value, cidade: "" });
          }}>
            <SelectTrigger className="bg-black/70 border-gray-700">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {states.map(state => (
                <SelectItem key={state.id} value={state.id}>{state.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cidade" className="text-white mb-2">Cidade</Label>
          <Select 
            value={filters.cidade} 
            onValueChange={(value) => setFilters({ ...filters, cidade: value })}
            disabled={!filters.estado || cities.length === 0}
          >
            <SelectTrigger className="bg-black/70 border-gray-700">
              <SelectValue placeholder={!filters.estado ? "Selecione um estado primeiro" : "Selecione a cidade"} />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {cities.map(city => (
                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="idade" className="text-white mb-2">Faixa Etária</Label>
          <Select value={filters.idade} onValueChange={(value) => setFilters({ ...filters, idade: value })}>
            <SelectTrigger className="bg-black/70 border-gray-700">
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

        <Accordion type="single" collapsible>
          <AccordionItem value="advanced-filters" className="border-gray-700">
            <AccordionTrigger className="text-white">Filtros Avançados</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-3">
                  <Label className="text-white mb-2">Serviços</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {!servicesLoading && services.map((service) => (
                      <div key={service.id} className="flex items-center gap-2">
                        <Switch 
                          id={`service-${service.id}`}
                          checked={filters.servicos?.includes(service.id) || false}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <Label 
                          htmlFor={`service-${service.id}`}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {service.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Faixa de Preço</Label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[filters.precoMin || 0, filters.precoMax || 1000]}
                      max={1000}
                      step={50}
                      onValueChange={([min, max]) => 
                        setFilters({ ...filters, precoMin: min, precoMax: max })
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>R$ {filters.precoMin || 0}</span>
                      <span>R$ {filters.precoMax || 1000}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Label className="text-white mb-4">Disponibilidade</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Disponível Hoje</span>
                      <Switch 
                        checked={filters.disponibilidade === "hoje"}
                        onCheckedChange={(checked) => 
                          setFilters({ ...filters, disponibilidade: checked ? "hoje" : "" })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleReset}
        className="w-full mt-6 border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
      >
        Limpar Filtros
      </Button>
    </div>
  );
};

export default SearchFilters;
