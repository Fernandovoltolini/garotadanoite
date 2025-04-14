
import { Search } from "lucide-react";

const SearchHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Encontre <span className="text-brand-red">Acompanhantes</span>
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Use os filtros para encontrar a companhia perfeita para seu momento especial
      </p>
    </div>
  );
};

export default SearchHeader;
