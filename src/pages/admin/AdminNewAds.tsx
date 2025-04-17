
import React, { useState } from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Calendar, X } from "lucide-react";
import { toast } from "sonner";
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Advertisement = Database['public']['Tables']['advertisements']['Row'];

const AdminNewAds = () => {
  // Use real-time updates for advertisements
  const ads = useRealTimeUpdates<Advertisement>('advertisements', []);

  // Filter only pending (not active) advertisements
  const pendingAds = ads.filter(ad => !ad.is_active);

  const handleApprove = async (id: string) => {
    try {
      const {
        error
      } = await supabase.from('advertisements').update({
        is_active: true
      }).eq('id', id);
      if (error) throw error;
      toast.success("Anúncio aprovado com sucesso!");
    } catch (err) {
      console.error('Error approving ad:', err);
      toast.error("Erro ao aprovar anúncio!");
    }
  };

  const handleReject = async (id: string) => {
    try {
      // In a real app you might want to add a rejection_reason field
      const {
        error
      } = await supabase.from('advertisements').delete().eq('id', id);
      if (error) throw error;
      toast.error("Anúncio rejeitado!");
    } catch (err) {
      console.error('Error rejecting ad:', err);
      toast.error("Erro ao rejeitar anúncio!");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Anúncios Pendentes</h1>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={() => window.location.href = "/admin/criar-anuncio"}
          >
            Criar Novo Anúncio
          </Button>
        </div>
        
        <div className="grid gap-6">
          {pendingAds.length > 0 ? (
            pendingAds.map(ad => (
              <Card key={ad.id} className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{ad.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID do usuário: {ad.user_id}</p>
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
                      <h3 className="font-medium">Localização:</h3>
                      <span className="text-sm">{ad.location}</span>
                    </div>
                    <div className="flex gap-4">
                      <h3 className="font-medium">Plano:</h3>
                      <span className="text-sm">ID: {ad.plan_id}</span>
                    </div>
                    
                    {/* Lista de serviços */}
                    {ad.services && (
                      <div>
                        <h3 className="font-medium mb-2">Serviços:</h3>
                        <ul className="list-disc pl-5 text-sm">
                          {Object.entries(ad.services as object).map(([key, value], index) => (
                            <li key={index} className="text-muted-foreground">
                              {key}: {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" size="sm" onClick={() => handleReject(ad.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Rejeitar
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => handleApprove(ad.id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 rounded-md bg-secondary">
              <p>Não há anúncios pendentes de aprovação.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewAds;
