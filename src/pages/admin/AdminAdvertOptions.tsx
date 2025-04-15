
import { useState } from "react";
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
import { Calendar, Edit, Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define interfaces for our data types
interface Plan {
  id: number; 
  name: string; 
  duration: number; 
  durationUnit: string; 
  price: number; 
  boosts: number; 
  featured: boolean;
  description: string;
}

interface Service {
  id: number;
  name: string;
  active: boolean;
}

// Sample data for advertising plans
const initialPlans: Plan[] = [
  { 
    id: 1, 
    name: "Safira", 
    duration: 3, 
    durationUnit: "dias", 
    price: 29.90, 
    boosts: 1, 
    featured: false,
    description: "Anúncio básico por 3 dias com 1 impulso"
  },
  { 
    id: 2, 
    name: "Rubi", 
    duration: 15, 
    durationUnit: "dias", 
    price: 79.90, 
    boosts: 3, 
    featured: false,
    description: "Anúncio por 15 dias com 3 impulsos"
  },
  { 
    id: 3, 
    name: "Esmeralda", 
    duration: 30, 
    durationUnit: "dias", 
    price: 129.90, 
    boosts: 5, 
    featured: true,
    description: "Anúncio mensal com 5 impulsos e destaque"
  },
  { 
    id: 4, 
    name: "Diamante", 
    duration: 90, 
    durationUnit: "dias", 
    price: 299.90, 
    boosts: 15, 
    featured: true,
    description: "Anúncio trimestral com 15 impulsos e destaque premium"
  }
];

// Sample data for service categories
const initialServices: Service[] = [
  { id: 1, name: "Massagem", active: true },
  { id: 2, name: "Acompanhante", active: true },
  { id: 3, name: "Festas", active: false }
];

// Form schema for plans
const planFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  duration: z.coerce.number().min(1, "Duração deve ser pelo menos 1"),
  durationUnit: z.string(),
  price: z.coerce.number().min(0, "Preço não pode ser negativo"),
  boosts: z.coerce.number().min(0, "Número de impulsos não pode ser negativo"),
  featured: z.boolean().default(false),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres")
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
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingPlan, setEditingPlan] = useState<number | null>(null);
  const [editingService, setEditingService] = useState<number | null>(null);

  // Form for plans
  const planForm = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      duration: 1,
      durationUnit: "dias",
      price: 0,
      boosts: 0,
      featured: false,
      description: ""
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

  const handleAddPlan = (data: PlanFormValues) => {
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan ? { ...plan, ...data } : plan
      ));
      setEditingPlan(null);
    } else {
      // Ensure all required fields are present in new plan
      const newPlan: Plan = {
        id: Date.now(),
        ...data
      };
      setPlans([...plans, newPlan]);
    }
    planForm.reset();
  };

  const handleAddService = (data: ServiceFormValues) => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService ? { ...service, ...data } : service
      ));
      setEditingService(null);
    } else {
      // Ensure all required fields are present in new service
      const newService: Service = {
        id: Date.now(),
        ...data
      };
      setServices([...services, newService]);
    }
    serviceForm.reset();
  };

  const handleEditPlan = (id: number) => {
    const plan = plans.find(p => p.id === id);
    if (plan) {
      planForm.reset(plan);
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

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
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
                          <TableHead>Impulsos</TableHead>
                          <TableHead>Destaque</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.name}</TableCell>
                            <TableCell>{plan.duration} {plan.durationUnit}</TableCell>
                            <TableCell>R$ {plan.price.toFixed(2)}</TableCell>
                            <TableCell>{plan.boosts}</TableCell>
                            <TableCell>{plan.featured ? "Sim" : "Não"}</TableCell>
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
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={planForm.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duração</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={planForm.control}
                            name="durationUnit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unidade</FormLabel>
                                <FormControl>
                                  <select
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                    {...field}
                                  >
                                    <option value="dias">dias</option>
                                    <option value="semanas">semanas</option>
                                    <option value="meses">meses</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
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
                        </div>
                        
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
