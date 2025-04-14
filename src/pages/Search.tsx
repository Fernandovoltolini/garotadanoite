
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import SearchHeader from "@/components/search/SearchHeader";

const Search = () => {
  const [filters, setFilters] = useState({
    cidade: "",
    servico: "",
    idade: "",
    idiomas: [],
    disponibilidade: "",
  });

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
