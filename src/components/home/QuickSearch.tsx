
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QuickSearch() {
  const navigate = useNavigate();
  const [cidade, setCidade] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (cidade) params.append("cidade", cidade);
    if (tipoServico) params.append("servico", tipoServico);
    if (faixaEtaria) params.append("idade", faixaEtaria);
    
    navigate(`/busca?${params.toString()}`);
  };

  return (
    <div className="bg-black border border-brand-red/20 rounded-lg p-6 max-w-4xl mx-auto -mt-12 relative z-10 shadow-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">
        Encontre Acompanhantes
      </h2>
      
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="cidade" className="text-sm text-gray-300">
            Cidade
          </label>
          <Select value={cidade} onValueChange={setCidade}>
            <SelectTrigger className="bg-black/70 border-gray-700 focus:ring-brand-red">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
              <SelectItem value="brasilia">Brasília</SelectItem>
              <SelectItem value="salvador">Salvador</SelectItem>
              <SelectItem value="recife">Recife</SelectItem>
              <SelectItem value="fortaleza">Fortaleza</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tipoServico" className="text-sm text-gray-300">
            Tipo de Serviço
          </label>
          <Select value={tipoServico} onValueChange={setTipoServico}>
            <SelectTrigger className="bg-black/70 border-gray-700 focus:ring-brand-red">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="acompanhante">Acompanhante</SelectItem>
              <SelectItem value="massagem">Massagem</SelectItem>
              <SelectItem value="encontro">Encontro</SelectItem>
              <SelectItem value="eventos">Eventos</SelectItem>
              <SelectItem value="viagens">Viagens</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="faixaEtaria" className="text-sm text-gray-300">
            Faixa Etária
          </label>
          <Select value={faixaEtaria} onValueChange={setFaixaEtaria}>
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
