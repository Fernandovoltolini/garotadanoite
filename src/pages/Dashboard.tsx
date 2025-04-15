
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  LayoutDashboard,
  Edit,
  Settings,
  Zap,
  BarChart,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { toast } = useToast();
  const [verificationStatus] = useState("pending"); // This would come from your backend

  const handleBoostPurchase = () => {
    toast({
      title: "Boost adquirido!",
      description: "Seu anúncio será impulsionado pelos próximos 7 dias.",
    });
  };

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
                <CheckCircle className={verificationStatus === "verified" ? "text-green-500" : "text-yellow-500"} />
                Status da Verificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={verificationStatus === "verified" ? "bg-green-500" : "bg-yellow-500"}>
                {verificationStatus === "verified" ? "Verificado" : "Em Análise"}
              </Badge>
              <p className="text-sm text-gray-400 mt-2">
                {verificationStatus === "verified" 
                  ? "Sua conta está verificada e ativa."
                  : "Seus documentos estão em análise. Prazo de até 24h."}
              </p>
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
              <Badge className="bg-purple-500">Diamante</Badge>
              <p className="text-sm text-gray-400 mt-2">Válido até 15/05/2024</p>
              <Button variant="outline" className="w-full mt-4 border-gray-700">
                Alterar Plano
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
              <div className="text-2xl font-bold text-white">1.2k</div>
              <p className="text-sm text-gray-400">Últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="anuncio" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="anuncio" className="data-[state=active]:bg-gray-800">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Anúncio
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

          <TabsContent value="anuncio">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Seu Anúncio</CardTitle>
                <CardDescription>Gerencie as informações do seu anúncio</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Anúncio
                </Button>
                
                {/* Preview do anúncio atual aqui */}
                <div className="rounded-lg border border-gray-800 p-4">
                  <p className="text-gray-400 text-sm">
                    Prévia do seu anúncio atual...
                  </p>
                </div>
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
                    <Button onClick={handleBoostPurchase} className="bg-brand-red hover:bg-red-900">
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
