
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  filters: {
    cidade: string;
    servico: string;
    idade: string;
    idiomas: string[];
    disponibilidade: string;
  };
  setFilters: (filters: any) => void;
}

const SearchFilters = ({ filters, setFilters }: SearchFiltersProps) => {
  const handleReset = () => {
    setFilters({
      cidade: "",
      servico: "",
      idade: "",
      idiomas: [],
      disponibilidade: "",
    });
  };

  return (
    <div className="bg-black/50 border border-brand-red/20 rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="cidade" className="text-white mb-2">Cidade</Label>
          <Select value={filters.cidade} onValueChange={(value) => setFilters({ ...filters, cidade: value })}>
            <SelectTrigger className="bg-black/70 border-gray-700">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
              <SelectItem value="curitiba">Curitiba</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="servico" className="text-white mb-2">Tipo de Serviço</Label>
          <Select value={filters.servico} onValueChange={(value) => setFilters({ ...filters, servico: value })}>
            <SelectTrigger className="bg-black/70 border-gray-700">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="acompanhante">Acompanhante</SelectItem>
              <SelectItem value="massagem">Massagem</SelectItem>
              <SelectItem value="eventos">Eventos</SelectItem>
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
              <SelectItem value="36+">36+ anos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
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
