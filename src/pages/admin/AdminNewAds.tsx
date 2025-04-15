
import React from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Calendar, X } from "lucide-react";
import { toast } from "sonner";

// Mock data
const pendingAds = [
  {
    id: 1,
    title: "Massagista Profissional",
    user: "Maria Silva",
    description: "Ofereço serviços de massagem relaxante e terapêutica. Ambiente confortável e higiênico.",
    category: "Massagem",
    plan: "Premium - 30 dias",
    services: ["Massagem relaxante", "Massagem terapêutica", "Massagem com pedras quentes"],
    prices: {
      fifteenMin: 80,
      halfHour: 150,
      hour: 250,
      overnight: 1800
    }
  },
  {
    id: 2,
    title: "Acompanhante para Eventos",
    user: "Ana Carolina",
    description: "Acompanhante elegante e discreta para eventos sociais e corporativos. Fluente em inglês e espanhol.",
    category: "Acompanhante",
    plan: "Diamante - 90 dias",
    services: ["Eventos sociais", "Jantares", "Viagens de negócios", "Eventos corporativos"],
    prices: {
      fifteenMin: null,
      halfHour: null,
      hour: 300,
      overnight: 2500
    }
  }
];

const AdminNewAds = () => {
  const handleApprove = (id) => {
    toast.success("Anúncio aprovado com sucesso!");
    // Aqui você implementaria a lógica de aprovação do anúncio
  };

  const handleReject = (id) => {
    toast.error("Anúncio rejeitado!");
    // Aqui você implementaria a lógica de rejeição do anúncio
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Novos Anúncios Pendentes</h1>
        
        <div className="grid gap-6">
          {pendingAds.map((ad) => (
            <Card key={ad.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{ad.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">Enviado por: {ad.user}</p>
                </div>
                <Badge variant="secondary">Pendente</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Descrição:</h3>
                    <p className="text-sm text-muted-foreground">{ad.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-medium">Categoria:</h3>
                    <span className="text-sm">{ad.category}</span>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-medium">Plano:</h3>
                    <span className="text-sm">{ad.plan}</span>
                  </div>
                  
                  {/* Lista de serviços */}
                  <div>
                    <h3 className="font-medium mb-2">Serviços:</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {ad.services.map((service, index) => (
                        <li key={index} className="text-muted-foreground">{service}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tabela de preços */}
                  <div>
                    <h3 className="font-medium mb-2">Valores:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {ad.prices.fifteenMin && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>15 minutos:</span>
                          </div>
                          <span>R$ {ad.prices.fifteenMin}</span>
                        </div>
                      )}
                      
                      {ad.prices.halfHour && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>30 minutos:</span>
                          </div>
                          <span>R$ {ad.prices.halfHour}</span>
                        </div>
                      )}
                      
                      {ad.prices.hour && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>1 hora:</span>
                          </div>
                          <span>R$ {ad.prices.hour}</span>
                        </div>
                      )}
                      
                      {ad.prices.overnight && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Pernoite:</span>
                          </div>
                          <span>R$ {ad.prices.overnight}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReject(ad.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleApprove(ad.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewAds;
