
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Checkbox } from "@/components/ui/checkbox";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Plan = Database['public']['Tables']['subscription_plans']['Row'];

const AdminCreateAd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Profile[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [services, setServices] = useState<{[key: string]: boolean}>({
    "Massagem": false,
    "Companhia para eventos": false,
    "Jantar romântico": false,
    "Conversação": false,
    "Viagens": false,
    "Final de semana": false,
  });
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    user_id: "",
    plan_id: "",
    is_active: false,
  });

  // Fetch users and plans
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*');
          
        if (userError) throw userError;
        setUsers(userData || []);
        
        // Fetch plans
        const { data: planData, error: planError } = await supabase
          .from('subscription_plans')
          .select('*');
          
        if (planError) throw planError;
        setPlans(planData || []);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Erro ao carregar dados");
      }
    };
    
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    setServices(prev => ({
      ...prev,
      [service]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Filter selected services
      const selectedServices = Object.entries(services)
        .filter(([_, isSelected]) => isSelected)
        .reduce((obj, [service, _]) => {
          obj[service] = service;
          return obj;
        }, {} as {[key: string]: string});
      
      // Create advertisement
      const { data, error } = await supabase
        .from('advertisements')
        .insert({
          title: form.title,
          description: form.description,
          location: form.location,
          price: form.price ? parseFloat(form.price) : null,
          user_id: form.user_id,
          plan_id: form.plan_id || null,
          is_active: form.is_active,
          services: selectedServices
        })
        .select();
        
      if (error) throw error;
      
      toast.success("Anúncio criado com sucesso!");
      navigate("/admin/novos-anuncios");
      
    } catch (err) {
      console.error("Error creating advertisement:", err);
      toast.error("Erro ao criar anúncio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Criar Novo Anúncio</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Anúncio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user_id">Usuário</Label>
                  <Select 
                    value={form.user_id} 
                    onValueChange={(value) => handleSelectChange("user_id", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.first_name || user.last_name 
                            ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
                            : `Usuário ${user.id.substring(0, 8)}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan_id">Plano</Label>
                  <Select 
                    value={form.plan_id} 
                    onValueChange={(value) => handleSelectChange("plan_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um plano (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - R$ {plan.price} ({plan.duration_days} dias)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Preço Base (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Serviços Oferecidos</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(services).map(([service, isChecked]) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`service-${service}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleServiceToggle(service, checked === true)}
                      />
                      <Label htmlFor={`service-${service}`} className="cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_active: checked === true }))}
                />
                <Label htmlFor="is_active">
                  Ativar anúncio imediatamente (sem aprovação)
                </Label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/admin/novos-anuncios")}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  {loading ? "Criando..." : "Criar Anúncio"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateAd;
