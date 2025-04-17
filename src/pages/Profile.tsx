
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, MapPin, Clock, CheckCircle, Languages, Star, Calendar, Phone, Smartphone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Database } from "@/integrations/supabase/types";

type Advertisement = Database['public']['Tables']['advertisements']['Row'];

const Profile = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [profile, setProfile] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  
  // Fetch advertisement data
  useEffect(() => {
    const fetchAdvertisement = async () => {
      setLoading(true);
      if (!id) return;
      
      try {
        const { data: advertisement, error } = await supabase
          .from('advertisements')
          .select('*, user_id')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error("Error fetching advertisement:", error);
          toast({
            title: "Erro ao carregar",
            description: "Não foi possível carregar este anúncio.",
            variant: "destructive"
          });
          return;
        }
        
        setProfile(advertisement);
        
        // Fetch user profile data
        if (advertisement?.user_id) {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', advertisement.user_id)
            .single();
            
          if (!userError && userData) {
            setUserData(userData);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdvertisement();
  }, [id, toast]);

  const handleContactClick = () => {
    if (!profile || !userData) {
      toast({
        title: "Contato indisponível",
        description: "Informações de contato não disponíveis.",
      });
      return;
    }
    
    toast({
      title: "Contato solicitado!",
      description: userData.phone 
        ? `Ligue para ${userData.phone}` 
        : "Informações de contato não disponíveis.",
    });
  };

  const handleWhatsAppClick = () => {
    if (!userData?.phone) {
      toast({
        title: "WhatsApp indisponível",
        description: "Este perfil não tem WhatsApp cadastrado.",
      });
      return;
    }
    
    // Format phone number for WhatsApp (remove non-digits)
    const phoneNumber = userData.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite 
        ? `Anúncio removido dos seus favoritos` 
        : `Anúncio adicionado aos seus favoritos`,
    });
  };

  const handleReportContent = () => {
    toast({
      title: "Conteúdo reportado",
      description: "Nossa equipe irá analisar este perfil. Obrigado!",
    });
  };

  const handleNextImage = () => {
    if (!profile?.images || !Array.isArray(profile.images)) return;
    setCurrentImage((prev) => (prev + 1) % profile.images.length);
  };

  const handlePrevImage = () => {
    if (!profile?.images || !Array.isArray(profile.images)) return;
    setCurrentImage((prev) => (prev - 1 + profile.images.length) % profile.images.length);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-white">Carregando perfil...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle no profile found
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">Anúncio não encontrado</h1>
            <p>Este anúncio não existe ou foi removido.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get profile images or use placeholders
  const images = Array.isArray(profile.images) && profile.images.length > 0
    ? profile.images
    : ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  // Parse services from JSON if available
  let services: string[] = [];
  if (profile.services) {
    try {
      if (typeof profile.services === 'object') {
        // Extract values from the services object
        services = Object.values(profile.services).filter(Boolean);
      }
    } catch (e) {
      console.error("Error parsing services:", e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Image gallery */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden border border-brand-red/40">
            <img 
              src={images[currentImage]} 
              alt={`Foto do anúncio`}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/50 border-none text-white hover:bg-black/75"
                onClick={handlePrevImage}
              >
                <span className="sr-only">Anterior</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/50 border-none text-white hover:bg-black/75"
                onClick={handleNextImage}
              >
                <span className="sr-only">Próxima</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
            
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${currentImage === index ? 'bg-brand-red' : 'bg-white/50'}`}
                  onClick={() => setCurrentImage(index)}
                >
                  <span className="sr-only">Imagem {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Profile info */}
          <div className="w-full md:w-1/2 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{profile.title}</h1>
              {profile.is_active && (
                <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" /> Verificado
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-gray-300">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {profile.location || "Localização não informada"}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" /> {profile.views_count || 0} visualizações
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">{profile.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {services.length > 0 && (
                <div className="w-full">
                  <h3 className="text-md font-medium mb-2">Serviços em Destaque:</h3>
                  <div className="flex flex-wrap gap-2">
                    {services.slice(0, 3).map((service, index) => (
                      <Badge key={index} className="bg-brand-red text-white py-1">
                        {service}
                      </Badge>
                    ))}
                    {services.length > 3 && (
                      <Badge className="bg-gray-700 text-white py-1">
                        +{services.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1" onClick={handleContactClick}>
                <Phone className="w-4 h-4 mr-2" /> Ligar
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleWhatsAppClick}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white border-none"
              >
                <Smartphone className="w-4 h-4 mr-2" /> WhatsApp
              </Button>

              <Button 
                variant="outline" 
                onClick={handleFavoriteToggle}
                className={`${isFavorite ? "bg-brand-red text-white" : ""}`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${isFavorite ? "fill-white" : "fill-none"}`}
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for details, services, and reviews */}
        <Tabs defaultValue="services" className="mb-8">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger value="services" className="flex-1">Serviços & Valores</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Detalhes</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                {/* Serviços como lista */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Serviços Oferecidos:</h3>
                  {services.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-brand-red" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">Nenhum serviço específico informado.</p>
                  )}
                </div>
                
                {/* Preços */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Valores:</h3>
                  <div className="bg-gray-900/70 rounded-lg p-4">
                    {profile.price ? (
                      <div className="flex justify-between items-center py-2">
                        <span className="flex items-center font-medium">
                          <Clock className="w-5 h-5 mr-2" />
                          Valor base
                        </span>
                        <span className="font-bold text-xl text-brand-red">
                          R$ {profile.price}
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-2">
                        Entre em contato para consultar valores
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-gray-400">Local:</span>
                    <span>{profile.location || "Não informado"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-gray-400">Disponibilidade:</span>
                    <span>Entre em contato para verificar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400 mb-4">Avaliações em breve</p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <Button variant="outline" size="sm" onClick={handleReportContent}>
                    Reportar conteúdo inadequado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
