
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const SearchHeader = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-gray-400">
        <Link to="/" className="hover:text-brand-red">Início</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Busca</span>
      </div>
      
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Encontre <span className="text-brand-red">Acompanhantes</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Use os filtros para encontrar a companhia perfeita para seu momento especial
        </p>
      </div>
    </div>
  );
};

export default SearchHeader;
