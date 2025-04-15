
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface PlanOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  duration: string;
  price: number;
  features: string[];
  boosts: number;
}

interface DurationOption {
  label: string;
  multiplier: number;
}

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("opal");
  const [selectedDuration, setSelectedDuration] = useState<string>("3dias");
  const navigate = useNavigate();
  const { toast } = useToast();

  const planOptions: Record<string, PlanOption> = {
    free: {
      id: "free",
      name: "Grátis",
      icon: "✦",
      color: "gray",
      duration: "1 dia",
      price: 0,
      features: [
        "1 foto no perfil",
        "Visibilidade limitada",
        "Sem destaque",
        "Apenas renovação paga"
      ],
      boosts: 0
    },
    opal: {
      id: "opal",
      name: "Opala",
      icon: "✧",
      color: "blue",
      duration: "Variável",
      price: 20,
      features: [
        "4 fotos no perfil",
        "Visibilidade normal",
        "Destaque básico",
        "Boosts limitados"
      ],
      boosts: 1
    },
    ruby: {
      id: "ruby",
      name: "Rubi",
      icon: "★",
      color: "red",
      duration: "Variável",
      price: 40,
      features: [
        "8 fotos no perfil",
        "Visibilidade alta",
        "Destaque médio",
        "Mais boosts inclusos"
      ],
      boosts: 3
    },
    diamond: {
      id: "diamond",
      name: "Diamante",
      icon: "💎",
      color: "purple",
      duration: "Variável",
      price: 80,
      features: [
        "16 fotos no perfil",
        "Visibilidade máxima",
        "Destaque premium",
        "Boosts diários"
      ],
      boosts: 7
    }
  };

  const durationOptions: Record<string, DurationOption> = {
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

  const handleContinue = () => {
    localStorage.setItem("selectedPlan", selectedPlan);
    localStorage.setItem("selectedDuration", selectedDuration);
    
    toast({
      title: "Plano selecionado",
      description: `Plano ${planOptions[selectedPlan].name} por ${selectedPlan !== 'free' ? durationOptions[selectedDuration].label : '1 dia'}`,
    });
    
    navigate("/verificacao");
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'diamond': return 'bg-purple-500';
      case 'ruby': return 'bg-red-500';
      case 'opal': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Escolha seu <span className="text-brand-red">Plano</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Selecione o melhor plano para aumentar sua visibilidade no Garota da Noite
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-secondary border-gray-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Planos Disponíveis</CardTitle>
              <CardDescription className="text-gray-400">
                Escolha um plano que atenda às suas necessidades
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(planOptions).map(([id, plan]) => (
                  <Card 
                    key={id} 
                    className={`border ${
                      selectedPlan === id 
                        ? "border-brand-red" 
                        : "border-gray-700"
                    } bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all`}
                    onClick={() => setSelectedPlan(id)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className={`text-2xl mb-2 ${
                        id === 'diamond' ? 'text-purple-400' : 
                        id === 'ruby' ? 'text-red-400' :
                        id === 'opal' ? 'text-blue-400' :
                        'text-gray-400'
                      }`}>
                        {plan.icon}
                      </div>
                      <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                      <CardDescription className="text-lg font-bold text-brand-red">
                        {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-brand-red shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedPlan !== 'free' && (
                <div className="mb-6">
                  <h3 className="text-white text-lg font-medium mb-3">Duração do anúncio</h3>
                  <RadioGroup 
                    defaultValue="3dias" 
                    className="grid grid-cols-2 md:grid-cols-5 gap-2"
                    value={selectedDuration}
                    onValueChange={setSelectedDuration}
                  >
                    {Object.entries(durationOptions).map(([id, duration]) => (
                      <div key={id} className="relative">
                        <RadioGroupItem value={id} id={`duration-${id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`duration-${id}`}
                          className={`flex items-center justify-center p-2 rounded-md border text-center ${
                            selectedDuration === id 
                              ? "border-brand-red bg-gray-900" 
                              : "border-gray-700 bg-gray-900/50"
                          } hover:bg-gray-900 cursor-pointer transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-brand-red`}
                        >
                          <span className="text-white text-sm">{duration.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <div className="bg-gray-900/70 p-4 rounded-md border border-gray-800 mb-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-3">
                  Resumo do Plano Selecionado
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getPlanBadgeColor(selectedPlan)} text-white`}>
                    {planOptions[selectedPlan].name}
                  </Badge>
                  
                  {selectedPlan !== 'free' && (
                    <Badge className="bg-gray-800 text-white">
                      {durationOptions[selectedDuration].label}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Plano:</span>
                  <span className="text-white">{planOptions[selectedPlan].name}</span>
                </div>
                
                {selectedPlan !== 'free' && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Duração:</span>
                    <span className="text-white">{durationOptions[selectedDuration].label}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span className="text-gray-400">Valor:</span>
                  <span className="text-brand-red">
                    {selectedPlan === 'free' 
                      ? 'Grátis' 
                      : `R$ ${calculatePrice(planOptions[selectedPlan].price, durationOptions[selectedDuration].multiplier)}`
                    }
                  </span>
                </div>
                
                <Separator className="bg-gray-800 mb-4" />
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Número máximo de fotos:</span>
                  <span className="text-white font-medium">
                    {selectedPlan === 'free' ? '1' : 
                     selectedPlan === 'opal' ? '4' :
                     selectedPlan === 'ruby' ? '8' : '16'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Impulsos inclusos:</span>
                  <span className="text-white font-medium">{planOptions[selectedPlan].boosts}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-brand-red hover:bg-red-900 text-white" 
                size="lg"
              >
                Continuar para Verificação de Identidade
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanSelection;
