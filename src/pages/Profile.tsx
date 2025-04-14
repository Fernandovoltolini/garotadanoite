
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, MapPin, Clock, CheckCircle, Languages, Star, Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock data for profile
const profileData = {
  id: "1",
  name: "Ana",
  age: 25,
  city: "São Paulo",
  verified: true,
  rating: 4.8,
  reviews: 27,
  description: "Sou carinhosa, adoro conversar e oferecer momentos inesquecíveis. Acompanhante de luxo para eventos sociais e encontros especiais.",
  services: [
    { name: "Companhia para eventos", price: 300 },
    { name: "Jantar romântico", price: 250 },
    { name: "Final de semana completo", price: 2000 }
  ],
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  details: {
    height: "1.72m",
    languages: ["Português", "Inglês", "Espanhol"],
    availability: "Segunda à Sábado, das 18h às 00h"
  },
  reviewsList: [
    { id: 1, user: "Cliente123", rating: 5, comment: "Excelente companhia, muito atenciosa e carinhosa." },
    { id: 2, user: "Usuario987", rating: 5, comment: "Simplesmente incrível, superou todas as expectativas!" },
    { id: 3, user: "Apreciador22", rating: 4, comment: "Ótima conversa e presença, recomendo fortemente." }
  ]
};

const Profile = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // For demonstration, we're using the mock data
  // In a real app, you would fetch data based on the ID
  const profile = profileData;

  const handleContactClick = () => {
    toast({
      title: "Contato solicitado!",
      description: "Você precisa estar logado para entrar em contato.",
    });
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite 
        ? `${profile.name} foi removida dos seus favoritos` 
        : `${profile.name} foi adicionada aos seus favoritos`,
    });
  };

  const handleReportContent = () => {
    toast({
      title: "Conteúdo reportado",
      description: "Nossa equipe irá analisar este perfil. Obrigado!",
    });
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % profile.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + profile.images.length) % profile.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Image gallery */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden border border-brand-red/40">
            <img 
              src={profile.images[currentImage]} 
              alt={`Foto de ${profile.name}`}
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
              {profile.images.map((_, index) => (
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
              <h1 className="text-3xl font-bold">{profile.name}, {profile.age}</h1>
              {profile.verified && (
                <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" /> Verificada
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-gray-300">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {profile.city}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" /> {profile.rating} ({profile.reviews} avaliações)
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">{profile.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center text-sm text-gray-300">
                <Languages className="w-4 h-4 mr-1" /> 
                <span className="font-semibold mr-2">Idiomas:</span>
                {profile.details.languages.join(', ')}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleContactClick}>
                <MessageCircle className="w-4 h-4 mr-2" /> Entrar em Contato
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleFavoriteToggle}
                className={isFavorite ? "bg-brand-red text-white" : ""}
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
        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger value="details" className="flex-1">Detalhes</TabsTrigger>
            <TabsTrigger value="services" className="flex-1">Serviços & Tarifas</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Altura:</span>
                    <span>{profile.details.height}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-gray-400">Disponibilidade:</span>
                    <span>{profile.details.availability}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="divide-y divide-gray-800">
                  {profile.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center py-3">
                      <span>{service.name}</span>
                      <span className="font-semibold text-brand-red">
                        R$ {service.price}/hora
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="text-white mt-4">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {profile.reviewsList.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 bg-gray-700">
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <span>{review.user}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-500"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800 text-center">
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
