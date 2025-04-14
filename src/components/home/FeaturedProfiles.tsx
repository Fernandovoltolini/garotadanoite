
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for featured profiles
const featuredProfiles = [
  {
    id: 1,
    name: "Amanda",
    age: 25,
    city: "São Paulo",
    photo: "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?q=80&w=500&auto=format&fit=crop",
    description: "Elegante e sofisticada, ideal para eventos e jantares.",
    rating: 4.8,
    verified: true,
    services: ["Eventos", "Jantares"]
  },
  {
    id: 2,
    name: "Carolina",
    age: 28,
    city: "Rio de Janeiro",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
    description: "Carismática e comunicativa, perfeita para viagens.",
    rating: 4.9,
    verified: true,
    services: ["Viagens", "Eventos"]
  },
  {
    id: 3,
    name: "Fernanda",
    age: 24,
    city: "Belo Horizonte",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500&auto=format&fit=crop",
    description: "Massagista qualificada com técnicas relaxantes.",
    rating: 4.7,
    verified: true,
    services: ["Massagem", "Encontros"]
  },
  {
    id: 4,
    name: "Bianca",
    age: 26,
    city: "Brasília",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=500&auto=format&fit=crop",
    description: "Simpática e divertida para momentos descontraídos.",
    rating: 4.6,
    verified: true,
    services: ["Encontros", "Jantares"]
  },
  {
    id: 5,
    name: "Daniela",
    age: 29,
    city: "Salvador",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop",
    description: "Companhia ideal para viagens e eventos corporativos.",
    rating: 4.9,
    verified: true,
    services: ["Viagens", "Eventos"]
  },
  {
    id: 6,
    name: "Gabriela",
    age: 27,
    city: "Curitiba",
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=500&auto=format&fit=crop",
    description: "Elegante e culta, perfeita para eventos sociais.",
    rating: 4.7,
    verified: true,
    services: ["Eventos", "Encontros"]
  }
];

export default function FeaturedProfiles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Acompanhantes em <span className="text-brand-red">Destaque</span>
          </h2>
          
          <Link to="/busca" className="text-brand-red hover:text-red-400 text-sm font-medium">
            Ver todos →
          </Link>
        </div>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white border border-brand-red/30 hover:bg-brand-red/20 -ml-4 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {featuredProfiles.map((profile) => (
              <div key={profile.id} className="card-profile min-w-[280px] max-w-[280px] flex-shrink-0">
                <div className="relative">
                  <img 
                    src={profile.photo} 
                    alt={profile.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  {profile.verified && (
                    <Badge className="absolute top-3 right-3 bg-brand-red text-white">
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm text-white">{profile.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">{profile.city}</p>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {profile.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.services.map((service, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full bg-brand-red hover:bg-red-900 text-white">
                    <Link to={`/perfil/${profile.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 rounded-full p-2 text-white border border-brand-red/30 hover:bg-brand-red/20 -mr-4 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
