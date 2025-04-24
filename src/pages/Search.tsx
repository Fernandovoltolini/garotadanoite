
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import SearchHeader from "@/components/search/SearchHeader";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    estado: "",
    cidade: "",
    idade: "",
    idiomas: [],
    disponibilidade: "",
    servicos: [],
    precoMin: 0,
    precoMax: 1000,
  });

  // Initialize filters from URL query params
  useEffect(() => {
    const estado = searchParams.get("estado") || "";
    const cidade = searchParams.get("cidade") || "";
    const idade = searchParams.get("idade") || "";
    const disponibilidade = searchParams.get("disponibilidade") || "";
    const servicosParam = searchParams.get("servicos") || "";
    const servicos = servicosParam ? servicosParam.split(",") : [];
    const precoMin = Number(searchParams.get("precoMin") || "0");
    const precoMax = Number(searchParams.get("precoMax") || "1000");

    setFilters({
      estado,
      cidade,
      idade,
      idiomas: [],
      disponibilidade,
      servicos,
      precoMin,
      precoMax
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchHeader />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="w-full lg:w-64">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </aside>
          
          <div className="flex-1">
            <SearchResults filters={filters} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
