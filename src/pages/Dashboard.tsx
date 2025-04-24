
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Edit,
  Settings,
  Zap,
  BarChart,
  CheckCircle,
  AlertCircle,
  FileText,
  Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<string>("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [userAds, setUserAds] = useState([]);
  const [activePlan, setActivePlan] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Fetch verification status
      const { data: verificationData, error: verificationError } = await supabase
        .from('verification_documents')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (verificationError) {
        console.error("Error fetching verification status:", verificationError);
      } else if (verificationData && verificationData.length > 0) {
        setVerificationStatus(verificationData[0].status);
      } else {
        setVerificationStatus("none"); // No verification documents submitted
      }
      
      // Fetch user ads
      const { data: adsData, error: adsError } = await supabase
        .from('advertisements')
        .select('*')
        .eq('user_id', user.id);
      
      if (adsError) {
        console.error("Error fetching user ads:", adsError);
      } else {
        setUserAds(adsData || []);
      }
      
      // Fetch active subscription plan (this is a simplified example)
      // In a real implementation, you would check for active subscriptions
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('*')
        .limit(1); // Just for example purposes
      
      if (planError) {
        console.error("Error fetching subscription plan:", planError);
      } else if (planData && planData.length > 0) {
        setActivePlan(planData[0]);
      }
      
      setIsLoading(false);
    };
    
    fetchUserData();
  }, [user]);

  const handleBoostPurchase = () => {
    toast({
      title: "Boost adquirido!",
      description: "Seu anúncio será impulsionado pelos próximos 7 dias.",
    });
  };

  const handleCreateAd = () => {
    if (verificationStatus === "approved") {
      navigate("/anunciar");
    } else if (verificationStatus === "none" || verificationStatus === "rejected") {
      navigate("/verificacao-documentos");
    } else {
      toast({
        title: "Verificação pendente",
        description: "Seus documentos estão em análise. Você poderá criar anúncios quando eles forem aprovados.",
        variant: "warning",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white">Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Gerencie seu anúncio e acompanhe seu desempenho</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-secondary border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className={
                  verificationStatus === "approved" ? "text-green-500" : 
                  verificationStatus === "rejected" ? "text-red-500" : 
                  "text-yellow-500"
                } />
                Status da Verificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={
                verificationStatus === "approved" ? "bg-green-500" : 
                verificationStatus === "rejected" ? "bg-red-500" : 
                verificationStatus === "none" ? "bg-gray-500" :
                "bg-yellow-500"
              }>
                {verificationStatus === "approved" ? "Verificado" : 
                 verificationStatus === "rejected" ? "Rejeitado" :
                 verificationStatus === "none" ? "Não enviado" :
                 "Em Análise"}
              </Badge>
              <p className="text-sm text-gray-400 mt-2">
                {verificationStatus === "approved" 
                  ? "Sua conta está verificada e ativa."
                  : verificationStatus === "rejected"
                  ? "Sua verificação foi rejeitada. Por favor, envie novos documentos."
                  : verificationStatus === "none"
                  ? "Você precisa enviar seus documentos para verificação."
                  : "Seus documentos estão em análise. Prazo de até 24h."}
              </p>
              
              {(verificationStatus === "none" || verificationStatus === "rejected") && (
                <Button 
                  onClick={() => navigate("/verificacao-documentos")} 
                  className="mt-4 w-full bg-red-600 hover:bg-red-700"
                >
                  {verificationStatus === "none" ? "Enviar documentos" : "Reenviar documentos"}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-secondary border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="text-gray-400" />
                Plano Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activePlan ? (
                <>
                  <Badge className="bg-purple-500">{activePlan.name}</Badge>
                  <p className="text-sm text-gray-400 mt-2">Válido até 15/05/2024</p>
                </>
              ) : (
                <p className="text-sm text-gray-400">Nenhum plano ativo</p>
              )}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-gray-700"
                onClick={() => navigate("/planos")}
              >
                {activePlan ? "Alterar Plano" : "Escolher Plano"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-secondary border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart className="text-gray-400" />
                Visualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userAds.reduce((sum, ad) => sum + (ad.views_count || 0), 0) || 0}</div>
              <p className="text-sm text-gray-400">Total de visualizações</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Meus Anúncios</h2>
          <Button 
            onClick={handleCreateAd} 
            className="bg-red-600 hover:bg-red-700"
            disabled={verificationStatus !== "approved" && verificationStatus !== "none" && verificationStatus !== "rejected"}
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Anúncio
          </Button>
        </div>

        <Tabs defaultValue="anuncios" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="anuncios" className="data-[state=active]:bg-gray-800">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Anúncios
            </TabsTrigger>
            <TabsTrigger value="boosts" className="data-[state=active]:bg-gray-800">
              <Zap className="w-4 h-4 mr-2" />
              Boosts
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gray-800">
              <BarChart className="w-4 h-4 mr-2" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="anuncios">
            <Card className="bg-secondary border-gray-800">
              <CardContent className="pt-6">
                {userAds.length > 0 ? (
                  <div className="grid gap-4">
                    {userAds.map((ad) => (
                      <div key={ad.id} className="border border-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-medium">{ad.title}</h3>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{ad.description}</p>
                          </div>
                          <Badge className={ad.is_active ? "bg-green-500" : "bg-gray-500"}>
                            {ad.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="border-gray-700">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Zap className="w-4 h-4 mr-2" />
                            Impulsionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : verificationStatus === "approved" ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-medium">Nenhum anúncio criado</h3>
                    <p className="text-gray-400 mt-2">Crie seu primeiro anúncio para começar a receber visualizações</p>
                    <Button 
                      onClick={handleCreateAd} 
                      className="mt-4 bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Anúncio
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-white font-medium">Verificação necessária</h3>
                    <p className="text-gray-400 mt-2">
                      {verificationStatus === "none" ? 
                        "Você precisa enviar seus documentos para poder criar anúncios" :
                        verificationStatus === "rejected" ? 
                        "Sua verificação foi rejeitada. Por favor, envie novos documentos." :
                        "Seus documentos estão sendo verificados. Você poderá criar anúncios quando eles forem aprovados."}
                    </p>
                    {(verificationStatus === "none" || verificationStatus === "rejected") && (
                      <Button 
                        onClick={() => navigate("/verificacao-documentos")} 
                        className="mt-4 bg-red-600 hover:bg-red-700"
                      >
                        {verificationStatus === "none" ? "Enviar documentos" : "Reenviar documentos"}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="boosts">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Boosts Disponíveis</CardTitle>
                <CardDescription>Impulsione seu anúncio para mais visibilidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-medium text-white">Boost 7 dias</h3>
                      <p className="text-sm text-gray-400">Aumente sua visibilidade por uma semana</p>
                    </div>
                    <Button onClick={handleBoostPurchase} className="bg-red-600 hover:bg-red-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Ativar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas Detalhadas</CardTitle>
                <CardDescription>Acompanhe o desempenho do seu anúncio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-400">Cliques</h4>
                      <p className="text-2xl font-bold text-white">458</p>
                    </div>
                    <div className="p-4 border border-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-400">Contatos</h4>
                      <p className="text-2xl font-bold text-white">124</p>
                    </div>
                    <div className="p-4 border border-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-400">Favoritos</h4>
                      <p className="text-2xl font-bold text-white">89</p>
                    </div>
                  </div>
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

export default Dashboard;
