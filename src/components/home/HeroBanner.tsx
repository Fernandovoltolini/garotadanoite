import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
const HeroBanner = () => {
  return <section className="relative bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>
      
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encontre Companhia de <span className="text-brand-red">Qualidade</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            O melhor site de acompanhantes do Brasil, com perfis verificados e serviços exclusivos para você
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/busca">
              <Button size="lg" className="w-full sm:w-auto bg-brand-red hover:bg-red-900 text-white px-8 py-6 text-lg rounded-md">
                <Search className="mr-2 h-5 w-5" />
                Explorar
              </Button>
            </Link>
            <Link to="/planos">
              <Button size="lg" className="w-full sm:w-auto bg-transparent hover:bg-gray-800 text-white border border-white px-8 py-6 text-lg rounded-md">
                Anunciar
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            
            
            
            
          </div>
        </div>
      </div>
    </section>;
};
export default HeroBanner;