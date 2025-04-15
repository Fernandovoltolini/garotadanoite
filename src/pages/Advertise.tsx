
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ImageUpload {
  id: number;
  file?: File;
  preview: string;
}

const Advertise = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>("opal");
  const [selectedDuration, setSelectedDuration] = useState<string>("3dias");
  const [images, setImages] = useState<ImageUpload[]>([
    { id: 1, preview: "/placeholder.svg" },
    { id: 2, preview: "/placeholder.svg" },
    { id: 3, preview: "/placeholder.svg" },
    { id: 4, preview: "/placeholder.svg" },
    { id: 5, preview: "/placeholder.svg" },
    { id: 6, preview: "/placeholder.svg" },
    { id: 7, preview: "/placeholder.svg" },
    { id: 8, preview: "/placeholder.svg" },
    { id: 9, preview: "/placeholder.svg" },
    { id: 10, preview: "/placeholder.svg" },
    { id: 11, preview: "/placeholder.svg" },
    { id: 12, preview: "/placeholder.svg" },
    { id: 13, preview: "/placeholder.svg" },
    { id: 14, preview: "/placeholder.svg" },
    { id: 15, preview: "/placeholder.svg" },
    { id: 16, preview: "/placeholder.svg" }
  ]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    city: "",
    description: "",
    services: [] as string[],
    height: "",
    languages: [] as string[],
    availability: "",
    phone: "",
    whatsapp: false,
    email: "",
    password: "",
    agreeTerms: false,
    prices: {
      fifteenMin: "",
      halfHour: "",
      hour: "",
      overnight: ""
    }
  });

  // Load plan selection from localStorage
  useEffect(() => {
    const planFromStorage = localStorage.getItem("selectedPlan");
    const durationFromStorage = localStorage.getItem("selectedDuration");
    
    if (planFromStorage) {
      setSelectedPlan(planFromStorage);
    }
    
    if (durationFromStorage) {
      setSelectedDuration(durationFromStorage);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleServiceToggle = (service: string) => {
    setForm(prev => {
      const services = [...prev.services];
      if (services.includes(service)) {
        return { ...prev, services: services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...services, service] };
      }
    });
  };

  const handleLanguageToggle = (language: string) => {
    setForm(prev => {
      const languages = [...prev.languages];
      if (languages.includes(language)) {
        return { ...prev, languages: languages.filter(l => l !== language) };
      } else {
        return { ...prev, languages: [...languages, language] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageId: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => 
            prev.map(img => 
              img.id === imageId 
                ? { ...img, file, preview: event.target?.result as string } 
                : img
            )
          );
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: value
      }
    }));
  };

  const getMaxPhotos = (planId: string) => {
    switch (planId) {
      case "free": return 1;
      case "opal": return 4;
      case "ruby": return 8;
      case "diamond": return 16;
      default: return 4;
    }
  };

  const planOptions = {
    free: { name: "Grátis", price: 0 },
    opal: { name: "Opala", price: 20 },
    ruby: { name: "Rubi", price: 40 },
    diamond: { name: "Diamante", price: 80 }
  };

  const durationOptions = {
    "1dia": { label: "1 dia", multiplier: 0.5 },
    "3dias": { label: "3 dias", multiplier: 1.0 },
    "15dias": { label: "15 dias", multiplier: 2.5 },
    "1mes": { label: "1 mês", multiplier: 3.5 },
    "3meses": { label: "3 meses", multiplier: 8.0 }
  };

  const calculatePrice = (basePrice: number, durationMultiplier: number) => {
    if (basePrice === 0) return 0;
    return Math.round(basePrice * durationMultiplier);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.agreeTerms) {
      toast({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos e condições para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (!form.prices.hour) {
      toast({
        title: "Preço por hora obrigatório",
        description: "Por favor, informe o valor cobrado por hora.",
        variant: "destructive"
      });
      return;
    }
    
    if (form.name && form.age && form.city && form.description) {
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Prossiga para o pagamento para ativar seu anúncio."
      });
      
      // In a real implementation, this would redirect to a payment page
      // For now, let's just show a success message
      setTimeout(() => {
        toast({
          title: "Pagamento confirmado",
          description: "Seu anúncio está em análise e em breve estará disponível."
        });
      }, 2000);
    } else {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'diamond':
        return 'bg-purple-500';
      case 'ruby':
        return 'bg-red-500';
      case 'opal':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Criar seu <span className="text-brand-red">Anúncio</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Preencha seus dados para criar seu perfil personalizado
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Informações Básicas</CardTitle>
                  <CardDescription className="text-gray-400">
                    Preencha seus dados para criar seu anúncio
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nome ou Apelido *</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Como você gostaria de ser chamada"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-white">Idade *</Label>
                      <Input 
                        id="age"
                        name="age"
                        type="number"
                        min="18"
                        max="99"
                        value={form.age}
                        onChange={handleInputChange}
                        placeholder="Sua idade (mínimo 18 anos)"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">Cidade *</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="Sua localização"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-white">Altura</Label>
                      <Input 
                        id="height"
                        name="height"
                        value={form.height}
                        onChange={handleInputChange}
                        placeholder="Ex: 1.70m"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description" className="text-white">Descrição *</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        placeholder="Fale sobre você, seus interesses e o que você oferece..."
                        className="bg-gray-900 border-gray-700 min-h-[120px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white">Idiomas</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Português", "Inglês", "Espanhol", "Francês", "Italiano"].map(language => (
                          <Badge 
                            key={language}
                            onClick={() => handleLanguageToggle(language)}
                            className={`cursor-pointer ${
                              form.languages.includes(language) 
                                ? "bg-brand-red" 
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-white">Disponibilidade</Label>
                      <Input 
                        id="availability"
                        name="availability"
                        value={form.availability}
                        onChange={handleInputChange}
                        placeholder="Ex: Segunda à Sexta, das 18h às 00h"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Serviços Oferecidos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {["Companhia para eventos", "Jantar romântico", "Massagens", "Viagens", "Acompanhante de festas", "Final de semana"].map(service => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`service-${service}`}
                            checked={form.services.includes(service)}
                            onCheckedChange={(checked) => 
                              handleServiceToggle(service)
                            }
                            className="data-[state=checked]:bg-brand-red"
                          />
                          <label
                            htmlFor={`service-${service}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-3 block">Fotos do Perfil (máximo {getMaxPhotos(selectedPlan)})</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {images.slice(0, getMaxPhotos(selectedPlan)).map(image => (
                        <div 
                          key={image.id} 
                          className="aspect-square relative rounded-md overflow-hidden border border-gray-700 bg-gray-900 flex items-center justify-center"
                        >
                          <img 
                            src={image.preview} 
                            alt={`Prévia ${image.id}`} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition">
                            <label className="cursor-pointer p-4 text-white flex flex-col items-center">
                              <Camera className="w-8 h-8 mb-2 text-brand-red" />
                              <span className="text-xs">Adicionar foto</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, image.id)} 
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Fotos devem estar de acordo com os termos de uso. Fotos explícitas ou que violem diretrizes serão rejeitadas.
                    </p>
                  </div>
                  
                  <h3 className="text-white mb-3 text-lg font-medium">Informações de Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Telefone / WhatsApp</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Seu número de telefone"
                        className="bg-gray-900 border-gray-700"
                      />
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="whatsapp"
                          checked={form.whatsapp}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("whatsapp", checked === true)
                          }
                          className="data-[state=checked]:bg-brand-red"
                        />
                        <label
                          htmlFor="whatsapp"
                          className="text-sm text-gray-300"
                        >
                          Este número possui WhatsApp
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Seu endereço de email"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                      <p className="text-xs text-gray-400">
                        Este email será usado para acessar sua conta.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Senha *</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleInputChange}
                        placeholder="Escolha uma senha segura"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                    </div>
                  </div>
                
                  <div className="space-y-4 mt-6">
                    <h3 className="text-white text-lg font-medium">Valores dos Serviços</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hour" className="text-white">Valor por Hora *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                          <Input
                            id="hour"
                            name="hour"
                            type="number"
                            min="0"
                            value={form.prices.hour}
                            onChange={handlePriceChange}
                            placeholder="0"
                            className="bg-gray-900 border-gray-700 pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fifteenMin" className="text-white">Valor 15 minutos (opcional)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                          <Input
                            id="fifteenMin"
                            name="fifteenMin"
                            type="number"
                            min="0"
                            value={form.prices.fifteenMin}
                            onChange={handlePriceChange}
                            placeholder="0"
                            className="bg-gray-900 border-gray-700 pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="halfHour" className="text-white">Valor 30 minutos (opcional)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                          <Input
                            id="halfHour"
                            name="halfHour"
                            type="number"
                            min="0"
                            value={form.prices.halfHour}
                            onChange={handlePriceChange}
                            placeholder="0"
                            className="bg-gray-900 border-gray-700 pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="overnight" className="text-white">Valor Pernoite (opcional)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                          <Input
                            id="overnight"
                            name="overnight"
                            type="number"
                            min="0"
                            value={form.prices.overnight}
                            onChange={handlePriceChange}
                            placeholder="0"
                            className="bg-gray-900 border-gray-700 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agreeTerms"
                        checked={form.agreeTerms}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("agreeTerms", checked === true)
                        }
                        className="data-[state=checked]:bg-brand-red"
                        required
                      />
                      <label
                        htmlFor="agreeTerms"
                        className="text-sm text-gray-300"
                      >
                        Eu aceito os <a href="#" className="text-brand-red hover:underline">termos de uso</a> e <a href="#" className="text-brand-red hover:underline">política de privacidade</a>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-brand-red hover:bg-red-900 text-white" size="lg">
                      Confirmar e Prosseguir para Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
          
          <div className="col-span-1">
            <Card className="bg-secondary border-gray-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">Resumo do Plano</CardTitle>
                <CardDescription className="text-gray-400">
                  Detalhes do plano selecionado
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3 bg-gray-900/70 p-4 rounded-md border border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getPlanBadgeColor(selectedPlan)} text-white`}>
                      {planOptions[selectedPlan as keyof typeof planOptions]?.name || "Plano"}
                    </Badge>
                    
                    {selectedPlan !== 'free' && (
                      <Badge className="bg-gray-800 text-white">
                        {durationOptions[selectedDuration as keyof typeof durationOptions]?.label || ""}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Plano:</span>
                    <span className="text-white">{planOptions[selectedPlan as keyof typeof planOptions]?.name || ""}</span>
                  </div>
                  
                  {selectedPlan !== 'free' && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Duração:</span>
                      <span className="text-white">{durationOptions[selectedDuration as keyof typeof durationOptions]?.label || ""}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-400">Valor:</span>
                    <span className="text-brand-red">
                      {selectedPlan === 'free' 
                        ? 'Grátis' 
                        : `R$ ${calculatePrice(
                            planOptions[selectedPlan as keyof typeof planOptions]?.price || 0, 
                            durationOptions[selectedDuration as keyof typeof durationOptions]?.multiplier || 1
                          )}`
                      }
                    </span>
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fotos permitidas:</span>
                    <span className="text-white">{getMaxPhotos(selectedPlan)}</span>
                  </div>

                  <Button 
                    onClick={() => navigate("/planos")} 
                    variant="outline" 
                    className="w-full mt-4 border-gray-700"
                  >
                    Alterar Plano
                  </Button>
                </div>
                
                <div className="bg-gray-900/70 p-4 rounded-md border border-gray-800">
                  <h3 className="text-white font-medium mb-2">Verificação de Documentos</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span>Status: Em análise</span>
                  </div>
                  
                  <Button 
                    onClick={() => navigate("/verificacao")} 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gray-700 text-sm"
                  >
                    Revisar documentos
                  </Button>
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Precisa de ajuda? <a href="#" className="text-brand-red hover:underline">Entre em contato</a> com nossa equipe.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Advertise;
