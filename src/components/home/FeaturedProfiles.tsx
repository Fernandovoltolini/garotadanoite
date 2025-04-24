
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FeaturedProfile {
  id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  price: number;
  featured: boolean;
  user_id: string;
  age?: number;
}

const FeaturedProfiles = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState<FeaturedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      try {
        // Get real featured ads from Supabase
        const { data, error } = await supabase
          .from('advertisements')
          .select('*, profiles(age)')
          .eq('featured', true)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        
        // Format the data to include profile age
        const formattedData = data.map((ad: any) => ({
          ...ad,
          age: ad.profiles?.age || null
        }));

        setFeaturedProfiles(formattedData);
      } catch (error) {
        console.error("Error fetching featured profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProfiles();
  }, []);

  if (loading) {
    return (
      <section className="bg-black py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Perfis em <span className="text-brand-red">Destaque</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden bg-gray-900 border-gray-800">
                <div className="h-80 animate-pulse bg-gray-800"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Perfis em <span className="text-brand-red">Destaque</span>
          </h2>
          <Link to="/busca">
            <Button variant="link" className="text-brand-red hover:text-red-400">
              Ver todos
            </Button>
          </Link>
        </div>
        
        {featuredProfiles.length === 0 ? (
          <Alert className="bg-gray-900 border-brand-red/30">
            <AlertCircle className="h-4 w-4 text-brand-red" />
            <AlertDescription>
              Não há perfis em destaque no momento.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProfiles.map((profile) => (
              <Link to={`/perfil/${profile.id}`} key={profile.id}>
                <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors h-full">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={profile.images?.[0] || 'https://placehold.co/600x800/111/333?text=Sem+Imagem'} 
                      alt={profile.title} 
                      className="object-cover w-full h-full"
                    />
                    {profile.featured && (
                      <Badge className="absolute top-2 right-2 bg-brand-red">Destaque</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-white">{profile.title}</h3>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{profile.location}</span>
                        </div>
                      </div>
                      {profile.price && (
                        <div className="flex items-center text-brand-red font-medium">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>R$ {profile.price}</span>
                        </div>
                      )}
                    </div>
                    
                    {profile.age && (
                      <div className="text-sm text-gray-300 mb-2">
                        Idade: {profile.age} anos
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProfiles;
