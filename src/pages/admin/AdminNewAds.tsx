
import React from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const AdminNewAds = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Novos Anúncios Pendentes</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Massagista Profissional</CardTitle>
                <p className="text-sm text-muted-foreground">Enviado por: Maria Silva</p>
              </div>
              <Badge variant="secondary">Pendente</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Descrição:</h3>
                  <p className="text-sm text-muted-foreground">Ofereço serviços de massagem relaxante...</p>
                </div>
                <div className="flex gap-4">
                  <h3 className="font-medium">Categoria:</h3>
                  <span className="text-sm">Massagem</span>
                </div>
                <div className="flex gap-4">
                  <h3 className="font-medium">Plano:</h3>
                  <span className="text-sm">Premium - 30 dias</span>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Check className="w-4 h-4 mr-2" />
                    Aprovar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewAds;
