
import { useState, useEffect } from "react";
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
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";
import { Database } from '@/integrations/supabase/types';

type Plan = Database['public']['Tables']['subscription_plans']['Row'];

interface DurationOption {
  label: string;
  multiplier: number;
}

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("3dias");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use real-time updates for plans
  const plans = useRealTimeUpdates<Plan>('subscription_plans', []);

  // Set initial selected plan when plans are loaded
  useEffect(() => {
    if (plans.length > 0 && !selectedPlan) {
      setSelectedPlan(plans[0].id);
    }
  }, [plans]);

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
    if (!selectedPlan) return;
    
    localStorage.setItem("selectedPlan", selectedPlan);
    localStorage.setItem("selectedDuration", selectedDuration);
    
    const plan = plans.find(p => p.id === selectedPlan);
    
    toast({
      title: "Plano selecionado",
      description: `${plan?.name} por ${durationOptions[selectedDuration].label}`,
    });
    
    navigate("/verificacao");
  };

  const getPlanBadgeColor = (plan: Plan) => {
    switch (plan.name.toLowerCase()) {
      case 'diamante': return 'bg-purple-500';
      case 'rubi': return 'bg-red-500';
      case 'safira': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Add helper to get plan icon
  const getPlanIcon = (plan: Plan) => {
    switch (plan.name.toLowerCase()) {
      case 'diamante': return '💎';
      case 'rubi': return '★';
      case 'safira': return '✧';
      default: return '✦';
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
            Selecione o melhor plano para aumentar sua visibilidade no site
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
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`border ${
                      selectedPlan === plan.id 
                        ? "border-brand-red" 
                        : "border-gray-700"
                    } bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="text-2xl mb-2">{getPlanIcon(plan)}</div>
                      <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                      <CardDescription className="text-lg font-bold text-brand-red">
                        R$ {plan.price}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {plan.features && typeof plan.features === 'object' && 
                         Array.isArray((plan.features as any).items) && 
                         (plan.features as any).items.map((feature: string, index: number) => (
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
              
              {selectedPlan && (
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
              
              {selectedPlan && (
                <div className="bg-gray-900/70 p-4 rounded-md border border-gray-800 mb-6">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-3">
                    Resumo do Plano Selecionado
                  </h3>
                  
                  {plans.map(plan => plan.id === selectedPlan && (
                    <div key={plan.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={`${getPlanBadgeColor(plan)} text-white`}>
                          {plan.name}
                        </Badge>
                        <Badge className="bg-gray-800 text-white">
                          {durationOptions[selectedDuration].label}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Plano:</span>
                        <span className="text-white">{plan.name}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Duração:</span>
                        <span className="text-white">{durationOptions[selectedDuration].label}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xl font-bold mb-4">
                        <span className="text-gray-400">Valor:</span>
                        <span className="text-brand-red">
                          R$ {calculatePrice(plan.price, durationOptions[selectedDuration].multiplier)}
                        </span>
                      </div>
                      
                      <Separator className="bg-gray-800 mb-4" />
                      
                      <div className="space-y-2">
                        {plan.features && typeof plan.features === 'object' && 
                         (plan.features as any).items && 
                         (plan.features as any).items.map((feature: string, index: number) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-brand-red hover:bg-red-900 text-white" 
                size="lg"
                disabled={!selectedPlan}
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
