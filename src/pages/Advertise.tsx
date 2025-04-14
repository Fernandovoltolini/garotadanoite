
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload, Star, MessageSquare, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ImageUpload {
  id: number;
  file?: File;
  preview: string;
}

const Advertise = () => {
  const [images, setImages] = useState<ImageUpload[]>([
    { id: 1, preview: "/placeholder.svg" },
    { id: 2, preview: "/placeholder.svg" },
    { id: 3, preview: "/placeholder.svg" },
    { id: 4, preview: "/placeholder.svg" }
  ]);
  const [selectedPlan, setSelectedPlan] = useState<string>("basic");
  const { toast } = useToast();
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
    agreeTerms: false
  });

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
    
    if (form.name && form.age && form.city && form.description) {
      toast({
        title: "Anúncio enviado com sucesso!",
        description: "Seu perfil está em análise e em breve estará disponível."
      });
    } else {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Anuncie no <span className="text-brand-red">Garota da Noite</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Crie seu perfil personalizado e aumente sua visibilidade para potenciais clientes
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
                    <Label className="text-white mb-3 block">Fotos do Perfil (máximo 10)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {images.map(image => (
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
                  
                  <div>
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
                      Cadastrar Anúncio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
          
          <div className="col-span-1">
            <Card className="bg-secondary border-gray-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">Escolha seu Plano</CardTitle>
                <CardDescription className="text-gray-400">
                  Aumente sua visibilidade com planos premium
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" onValueChange={setSelectedPlan} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="basic" className="flex-1">Básico</TabsTrigger>
                    <TabsTrigger value="premium" className="flex-1">Premium</TabsTrigger>
                    <TabsTrigger value="vip" className="flex-1">VIP</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="mt-4 space-y-4">
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-white mb-2">Grátis</div>
                      <p className="text-sm text-gray-400">Anúncio básico por 30 dias</p>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">4 fotos no perfil</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Aparece nas buscas normais</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <span className="text-gray-500 mr-2">✗</span>
                        <span className="text-gray-500 text-sm">Sem destaque nas pesquisas</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <span className="text-gray-500 mr-2">✗</span>
                        <span className="text-gray-500 text-sm">Sem estatísticas de visitas</span>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="premium" className="mt-4 space-y-4">
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-white mb-2">R$ 50<span className="text-sm font-normal">/mês</span></div>
                      <p className="text-sm text-gray-400">Maior visibilidade</p>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">10 fotos no perfil</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Destaque em pesquisas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Estatísticas de visitas</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <span className="text-gray-500 mr-2">✗</span>
                        <span className="text-gray-500 text-sm">Sem selo VIP</span>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="vip" className="mt-4 space-y-4">
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-white mb-2">R$ 100<span className="text-sm font-normal">/mês</span></div>
                      <p className="text-sm text-gray-400">Visibilidade máxima</p>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Até 20 fotos no perfil</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Selo VIP especial</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Topo nos resultados de busca</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-red mr-2">✓</span>
                        <span className="text-gray-300 text-sm">Estatísticas avançadas e suporte VIP</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  className="w-full"
                  variant={selectedPlan === "basic" ? "outline" : "default"}
                  disabled={selectedPlan === "basic"}
                >
                  {selectedPlan === "basic" 
                    ? "Plano Selecionado" 
                    : `Selecionar Plano ${selectedPlan === "premium" ? "Premium" : "VIP"}`}
                </Button>
                
                <div className="text-center text-xs text-gray-400 mt-4">
                  Renovação automática mensal. Cancele a qualquer momento.
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
