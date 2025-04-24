
import { useState, useEffect } from "react";
import { Star, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SearchResultsProps {
  filters: {
    estado: string;
    cidade: string;
    idade: string;
    idiomas: string[];
    disponibilidade: string;
    servicos: string[];
    precoMin: number;
    precoMax: number;
  };
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  price: number;
  featured: boolean;
  user_id: string;
  age?: number;
  city_name?: string;
  state_name?: string;
}

const SearchResults = ({ filters }: SearchResultsProps) => {
  const [results, setResults] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Start building the query
        let query = supabase
          .from('advertisements')
          .select(`
            *,
            profiles(age, city_id, user_id),
            cities(name, state_id),
            states(name)
          `)
          .eq('is_active', true);

        // Apply filters
        if (filters.estado) {
          query = query.eq('cities.state_id', filters.estado);
        }
        
        if (filters.cidade) {
          query = query.eq('profiles.city_id', filters.cidade);
        }
        
        if (filters.idade) {
          const [minAge, maxAge] = filters.idade.split('-');
          if (minAge && maxAge) {
            query = query.gte('profiles.age', parseInt(minAge))
                          .lte('profiles.age', parseInt(maxAge));
          } else if (filters.idade === '40+') {
            query = query.gte('profiles.age', 40);
          }
        }
        
        if (filters.servicos && filters.servicos.length > 0) {
          // This assumes services are stored as an array or JSON in the advertisements table
          // Adjust according to your actual database structure
          query = query.contains('services', filters.servicos);
        }
        
        if (filters.precoMin > 0 || filters.precoMax < 1000) {
          if (filters.precoMin > 0) {
            query = query.gte('price', filters.precoMin);
          }
          if (filters.precoMax < 1000) {
            query = query.lte('price', filters.precoMax);
          }
        }

        // Execute the query
        const { data, error } = await query.order('featured', { ascending: false });
        
        if (error) throw error;
        
        // Format the data
        const formattedData = data.map((ad: any) => ({
          ...ad,
          age: ad.profiles?.age || null,
          city_name: ad.cities?.name || "",
          state_name: ad.states?.name || ""
        }));

        setResults(formattedData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [filters]);

  const getPlanBadgeColor = (featured: boolean) => {
    return featured ? 'bg-brand-red' : 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card-profile animate-pulse bg-gray-900 h-80"></div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Alert className="bg-gray-900 border-brand-red/30">
        <AlertCircle className="h-4 w-4 text-brand-red" />
        <AlertDescription>
          Nenhum perfil encontrado com os filtros selecionados. Tente alterar seus critérios de busca.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((profile) => (
        <div key={profile.id} className="card-profile">
          <div className="relative">
            <img 
              src={profile.images?.[0] || 'https://placehold.co/600x800/111/333?text=Sem+Imagem'} 
              alt={profile.title} 
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${getPlanBadgeColor(profile.featured)} text-white`}>
                {profile.featured ? 'Destaque' : 'Anúncio'}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-black/80 text-white text-lg font-semibold">
                R$ {profile.price}/h
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">
                {profile.title} {profile.age && `(${profile.age})`}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              <MapPin size={16} className="text-gray-400" />
              <p className="text-gray-400 text-sm">
                {profile.city_name && profile.state_name ? 
                  `${profile.city_name}, ${profile.state_name}` : 
                  profile.location}
              </p>
            </div>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {profile.description}
            </p>
            
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
