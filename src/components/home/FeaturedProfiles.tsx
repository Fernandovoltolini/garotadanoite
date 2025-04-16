
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

// Sample featured profiles data
const featuredProfiles = [
  {
    id: "1",
    name: "Amanda",
    age: 28,
    location: "São Paulo",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Massagem", "Acompanhante"],
    hourPrice: 200,
    featured: true
  },
  {
    id: "2",
    name: "Juliana",
    age: 24,
    location: "Rio de Janeiro",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Eventos", "Viagens"],
    hourPrice: 300,
    featured: true
  },
  {
    id: "3",
    name: "Carla",
    age: 26,
    location: "Belo Horizonte",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Festas", "Acompanhante"],
    hourPrice: 250,
    featured: false
  },
  {
    id: "4",
    name: "Daniela",
    age: 29,
    location: "Brasília",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    tags: ["Massagem", "Jantar"],
    hourPrice: 280,
    featured: false
  }
];

const FeaturedProfiles = () => {
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProfiles.map((profile) => (
            <Link to={`/perfil/${profile.id}`} key={profile.id}>
              <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors h-full">
                <div className="relative aspect-[3/4]">
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="object-cover w-full h-full"
                  />
                  {profile.featured && (
                    <Badge className="absolute top-2 right-2 bg-brand-red">Destaque</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-white">{profile.name}, {profile.age}</h3>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-brand-red font-medium">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>R$ {profile.hourPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {profile.tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
