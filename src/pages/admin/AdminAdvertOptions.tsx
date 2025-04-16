
import { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2, CircleDot } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

// Define interfaces for our data types
interface Plan {
  id: string; 
  name: string; 
  duration_days: number;
  price: number; 
  features: {
    items: string[];
  } | null;
  description: string;
  icon?: string;
  color?: string;
}

interface Service {
  id: number;
  name: string;
  active: boolean;
}

// Color options
const colorOptions = {
  "red": "Vermelho",
  "blue": "Azul",
  "green": "Verde",
  "purple": "Roxo",
  "pink": "Rosa",
  "yellow": "Amarelo",
  "gray": "Cinza"
};

// Icon options
const iconOptions = {
  "diamond": "Diamante",
  "star": "Estrela",
  "gem": "Gema",
  "award": "Prêmio",
  "crown": "Coroa",
  "sparkles": "Brilhos"
};

// Form schema for plans
const planFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  duration_days: z.coerce.number().min(1, "Duração deve ser pelo menos 1"),
  price: z.coerce.number().min(0, "Preço não pode ser negativo"),
  boosts: z.coerce.number().min(0, "Número de impulsos não pode ser negativo"),
  featured: z.boolean().default(false),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  icon: z.string().default("diamond"),
  color: z.string().default("red")
});

// Form schema for services
const serviceFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  active: z.boolean().default(true)
});

// Define types based on zod schemas
type PlanFormValues = z.infer<typeof planFormSchema>;
type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const AdminAdvertOptions = () => {
  // Get subscription plans from Supabase with real-time updates
  const plans = useRealTimeUpdates<Plan>('subscription_plans', []);
  
  // Local state for services (since there's no services table yet)
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Massagem", active: true },
    { id: 2, name: "Acompanhante", active: true },
    { id: 3, name: "Festas", active: false }
  ]);
  
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<number | null>(null);

  // Form for plans
  const planForm = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      duration_days: 1,
      price: 0,
      boosts: 0,
      featured: false,
      description: "",
      icon: "diamond",
      color: "red"
    }
  });

  // Form for services
  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      active: true
    }
  });

  const handleAddPlan = async (data: PlanFormValues) => {
    try {
      // Verify that free plans (price 0) only have duration_days of 1
      if (data.price === 0 && data.duration_days !== 1) {
        toast({ 
          title: "Erro nas configurações do plano", 
          description: "Planos gratuitos só podem ter duração de 1 dia.",
          variant: "destructive"
        });
        return;
      }

      const planData = {
        name: data.name,
        duration_days: data.duration_days,
        price: data.price,
        description: data.description,
        icon: data.icon,
        color: data.color,
        features: { 
          items: [
            `${data.boosts} impulsos incluídos`,
            data.featured ? 'Anúncio em destaque' : 'Anúncio padrão',
          ]
        }
      };

      if (editingPlan) {
        const { error } = await supabase
          .from('subscription_plans')
          .update(planData)
          .eq('id', editingPlan);
          
        if (error) throw error;
        toast({ title: "Plano atualizado com sucesso!" });
        setEditingPlan(null);
      } else {
        const { error } = await supabase
          .from('subscription_plans')
          .insert([planData]);
          
        if (error) throw error;
        toast({ title: "Plano adicionado com sucesso!" });
      }
      planForm.reset();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast({ 
        title: "Erro ao salvar plano", 
        description: "Ocorreu um erro ao salvar o plano. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleAddService = (data: ServiceFormValues) => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService ? { ...service, ...data } : service
      ));
      setEditingService(null);
    } else {
      // Create a complete Service object with all required properties
      const newService: Service = {
        id: Date.now(),
        name: data.name,
        active: data.active
      };
      setServices([...services, newService]);
    }
    serviceForm.reset();
  };

  const handleEditPlan = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      // Extract values from features for the form
      const boosts = plan.features?.items?.[0]?.match(/(\d+)/)?.[0] || "0";
      const featured = plan.features?.items?.[1]?.includes('destaque') || false;
      
      planForm.reset({
        name: plan.name,
        duration_days: plan.duration_days,
        price: plan.price,
        boosts: parseInt(boosts),
        featured,
        description: plan.description,
        icon: plan.icon || "diamond",
        color: plan.color || "red"
      });
      setEditingPlan(id);
    }
  };

  const handleEditService = (id: number) => {
    const service = services.find(s => s.id === id);
    if (service) {
      serviceForm.reset(service);
      setEditingService(id);
    }
  };

  const handleDeletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      toast({ title: "Plano removido com sucesso!" });
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast({ 
        title: "Erro ao remover plano", 
        description: "Ocorreu um erro ao remover o plano. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Anúncios</h1>
        
        <Tabs defaultValue="plans">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="plans" className="flex-1">Planos de Anúncio</TabsTrigger>
            <TabsTrigger value="services" className="flex-1">Serviços Oferecidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Planos Disponíveis</CardTitle>
                    <CardDescription>Gerenciar planos de anúncios disponíveis no site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>Lista de planos de anúncios</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Duração</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Cor</TableHead>
                          <TableHead>Ícone</TableHead>
                          <TableHead>Destaque</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.name}</TableCell>
                            <TableCell>{plan.duration_days} dias</TableCell>
                            <TableCell>R$ {plan.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div 
                                className={`w-6 h-6 rounded-full bg-${plan.color || 'gray'}-500`}
                                title={colorOptions[plan.color as keyof typeof colorOptions] || "Cinza"}
                              ></div>
                            </TableCell>
                            <TableCell>
                              {plan.icon && iconOptions[plan.icon as keyof typeof iconOptions]}
                            </TableCell>
                            <TableCell>
                              {plan.features?.items?.[1]?.includes('destaque') ? "Sim" : "Não"}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEditPlan(plan.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => handleDeletePlan(plan.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {editingPlan ? "Editar Plano" : "Adicionar Plano"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...planForm}>
                      <form onSubmit={planForm.handleSubmit(handleAddPlan)} className="space-y-4">
                        <FormField
                          control={planForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Plano</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Rubi, Diamante..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="duration_days"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duração (dias)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preço (R$)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                              {field.value === 0 && (
                                <p className="text-xs text-amber-500">
                                  Atenção: Planos gratuitos só podem ter duração de 1 dia.
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="icon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ícone do Plano</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um ícone" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.entries(iconOptions).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cor do Plano</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma cor" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.entries(colorOptions).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                      <div className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full bg-${value}-500 mr-2`}></div>
                                        <span>{label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="boosts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Impulsos</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Plano em Destaque</FormLabel>
                                <FormDescription>
                                  Planos em destaque são exibidos no topo das listagens
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={planForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Descreva os benefícios do plano..."
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          {editingPlan ? "Atualizar Plano" : "Adicionar Plano"}
                        </Button>
                        
                        {editingPlan && (
                          <Button 
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              planForm.reset();
                              setEditingPlan(null);
                            }}
                          >
                            Cancelar
                          </Button>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Serviços Oferecidos</CardTitle>
                    <CardDescription>Gerenciar categorias de serviços disponíveis no site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>Lista de serviços</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {service.active ? "Ativo" : "Inativo"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEditService(service.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {editingService ? "Editar Serviço" : "Adicionar Serviço"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...serviceForm}>
                      <form onSubmit={serviceForm.handleSubmit(handleAddService)} className="space-y-4">
                        <FormField
                          control={serviceForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Serviço</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Massagem, Acompanhante..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={serviceForm.control}
                          name="active"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Serviço Ativo</FormLabel>
                                <FormDescription>
                                  Serviços ativos podem ser selecionados pelos anunciantes
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          {editingService ? "Atualizar Serviço" : "Adicionar Serviço"}
                        </Button>
                        
                        {editingService && (
                          <Button 
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              serviceForm.reset();
                              setEditingService(null);
                            }}
                          >
                            Cancelar
                          </Button>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAdvertOptions;
