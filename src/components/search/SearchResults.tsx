
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  filters: {
    cidade: string;
    servico: string;
    idade: string;
    idiomas: string[];
    disponibilidade: string;
  };
}

// Mock data para exemplo
const mockResults = [
  {
    id: 1,
    name: "Amanda",
    age: 25,
    city: "São Paulo",
    photo: "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?q=80&w=500&auto=format&fit=crop",
    description: "Elegante e sofisticada, ideal para eventos e jantares.",
    rating: 4.8,
    verified: true,
    services: ["Eventos", "Jantares"],
    available: true
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
    services: ["Viagens", "Eventos"],
    available: true
  }
];

const SearchResults = ({ filters }: SearchResultsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockResults.map((profile) => (
        <div key={profile.id} className="card-profile">
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
  );
};

export default SearchResults;
