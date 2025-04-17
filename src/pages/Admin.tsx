
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Users, Clipboard, PlusCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Admin = () => {
  const navigate = useNavigate();
  
  const adminOptions = [
    {
      title: "Gerenciar Planos e Anúncios",
      description: "Administre planos, serviços oferecidos e opções de anúncios",
      icon: <Settings className="w-12 h-12 text-red-600" />,
      action: () => navigate("/admin/anuncios")
    },
    {
      title: "Novos Anúncios",
      description: "Aprovar ou rejeitar anúncios pendentes",
      icon: <Clipboard className="w-12 h-12 text-red-600" />,
      action: () => navigate("/admin/novos-anuncios")
    },
    {
      title: "Criar Anúncio",
      description: "Crie novos anúncios e atribua a usuários",
      icon: <PlusCircle className="w-12 h-12 text-red-600" />,
      action: () => navigate("/admin/criar-anuncio")
    },
    {
      title: "Gerenciar Blog",
      description: "Crie, edite e remova postagens do blog",
      icon: <FileText className="w-12 h-12 text-red-600" />,
      action: () => navigate("/admin/blog")
    },
    {
      title: "Gerenciar Usuários",
      description: "Controle de usuários, permissões e status de contas",
      icon: <Users className="w-12 h-12 text-red-600" />,
      action: () => navigate("/admin/usuarios")
    }
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminOptions.map((option, index) => (
            <Card key={index} className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                <div className="bg-gray-100 p-2 rounded-full">{option.icon}</div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{option.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  onClick={option.action}
                >
                  Acessar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Admin;
