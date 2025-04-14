
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <div className="relative bg-black">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516575017964-8c704617549e?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Encontre a <span className="text-brand-red">companhia perfeita</span><br />
          para momentos especiais
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
          Conectamos você a acompanhantes premium em um ambiente seguro, 
          discreto e sofisticado para experiências inesquecíveis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild size="lg" className="bg-brand-red hover:bg-red-800 text-white flex-1">
            <Link to="/busca">Explorar Agora</Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white flex-1">
            <Link to="/anunciar">Anunciar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
