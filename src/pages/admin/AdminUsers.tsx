
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
import {
  Eye,
  EyeOff,
  Lock,
  Search,
  ShieldCheck,
  Trash2,
  Unlock,
  UserCheck,
  UserCog,
  UserX,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// Sample data for users
const initialUsers = [
  { 
    id: 1, 
    name: "Amanda Silva", 
    email: "amanda.silva@email.com",
    role: "user",
    status: "active",
    verified: true,
    createdAt: "2025-01-10",
    lastLogin: "2025-04-12"
  },
  { 
    id: 2, 
    name: "Carlos Oliveira", 
    email: "carlos.oliveira@email.com",
    role: "admin",
    status: "active",
    verified: true,
    createdAt: "2024-11-05",
    lastLogin: "2025-04-14"
  },
  { 
    id: 3, 
    name: "Marina Costa", 
    email: "marina.costa@email.com",
    role: "user",
    status: "suspended",
    verified: true,
    createdAt: "2025-02-20",
    lastLogin: "2025-03-30"
  },
  { 
    id: 4, 
    name: "Rodrigo Santos", 
    email: "rodrigo.santos@email.com",
    role: "user",
    status: "pending",
    verified: false,
    createdAt: "2025-04-01",
    lastLogin: null
  },
  { 
    id: 5, 
    name: "Juliana Lima", 
    email: "juliana.lima@email.com",
    role: "editor",
    status: "active",
    verified: true,
    createdAt: "2025-01-15",
    lastLogin: "2025-04-10"
  }
];

// Form schema for user filters
const userFilterFormSchema = z.object({
  search: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  verified: z.boolean().optional(),
});

// Form schema for user edit
const userEditFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.string().min(1, "Selecione um papel"),
  status: z.string().min(1, "Selecione um status"),
  verified: z.boolean().default(false),
});

const statusOptions = {
  active: { label: "Ativo", color: "bg-green-100 text-green-800" },
  suspended: { label: "Suspenso", color: "bg-orange-100 text-orange-800" },
  pending: { label: "Pendente", color: "bg-blue-100 text-blue-800" },
  banned: { label: "Banido", color: "bg-red-100 text-red-800" },
};

const roleOptions = {
  user: { label: "Usuário", icon: UserCheck },
  admin: { label: "Admin", icon: ShieldCheck },
  editor: { label: "Editor", icon: UserCog },
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Form for user filters
  const filterForm = useForm<z.infer<typeof userFilterFormSchema>>({
    resolver: zodResolver(userFilterFormSchema),
    defaultValues: {
      search: "",
      role: "",
      status: "",
      verified: undefined,
    }
  });

  // Form for user edit
  const userForm = useForm<z.infer<typeof userEditFormSchema>>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active",
      verified: false,
    }
  });

  // Apply filters to users
  const applyFilters = (data: z.infer<typeof userFilterFormSchema>) => {
    let result = [...users];
    
    if (data.search) {
      const searchTerm = data.search.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
      );
    }
    
    if (data.role) {
      result = result.filter(user => user.role === data.role);
    }
    
    if (data.status) {
      result = result.filter(user => user.status === data.status);
    }
    
    if (data.verified !== undefined) {
      result = result.filter(user => user.verified === data.verified);
    }
    
    setFilteredUsers(result);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    filterForm.reset();
    setFilteredUsers(users);
    setIsFilterOpen(false);
  };

  const handleEditUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      userForm.reset(user);
      setEditingUser(id);
    }
  };

  const handleUpdateUser = (data: z.infer<typeof userEditFormSchema>) => {
    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.id === editingUser ? { ...user, ...data } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setEditingUser(null);
      userForm.reset();
    }
  };

  const toggleUserStatus = (id: number, newStatus: string) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Usuários</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Usuários</CardTitle>
                  <CardDescription>Gerenciar usuários do sistema</CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuários..."
                      className="pl-8 w-[200px] md:w-[300px]"
                      value={filterForm.watch("search") || ""}
                      onChange={(e) => {
                        filterForm.setValue("search", e.target.value);
                        applyFilters(filterForm.getValues());
                      }}
                    />
                  </div>
                  
                  <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Filtros</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <Form {...filterForm}>
                        <form onSubmit={filterForm.handleSubmit(applyFilters)} className="space-y-4">
                          <h3 className="font-medium text-lg">Filtrar Usuários</h3>
                          
                          <FormField
                            control={filterForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Papel</FormLabel>
                                <FormControl>
                                  <select
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                    {...field}
                                  >
                                    <option value="">Todos os papéis</option>
                                    {Object.entries(roleOptions).map(([value, { label }]) => (
                                      <option key={value} value={value}>{label}</option>
                                    ))}
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={filterForm.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                  <select
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                    {...field}
                                  >
                                    <option value="">Todos os status</option>
                                    {Object.entries(statusOptions).map(([value, { label }]) => (
                                      <option key={value} value={value}>{label}</option>
                                    ))}
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={filterForm.control}
                            name="verified"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value || false}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Apenas verificados</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={resetFilters}>
                              Limpar
                            </Button>
                            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                              Aplicar
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Total de {filteredUsers.length} usuários</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Papel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verificado</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const RoleIcon = roleOptions[user.role as keyof typeof roleOptions]?.icon || UserCheck;
                      const statusStyle = statusOptions[user.status as keyof typeof statusOptions]?.color || "";
                      const statusLabel = statusOptions[user.status as keyof typeof statusOptions]?.label || user.status;
                      
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                  <RoleIcon className="h-4 w-4" />
                                  <span className="capitalize">{user.role}</span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-56">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">{roleOptions[user.role as keyof typeof roleOptions]?.label || user.role}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {user.role === "admin" 
                                      ? "Acesso total ao sistema, incluindo configurações avançadas"
                                      : user.role === "editor"
                                        ? "Pode editar conteúdo do site, como blog e anúncios"
                                        : "Usuário padrão com acesso limitado"
                                    }
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusStyle}`}>
                              {statusLabel}
                            </span>
                          </TableCell>
                          <TableCell>{user.verified ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEditUser(user.id)}
                              >
                                <UserCog className="h-4 w-4" />
                              </Button>
                              
                              {user.status === "active" ? (
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => toggleUserStatus(user.id, "suspended")}
                                >
                                  <Lock className="h-4 w-4 text-orange-600" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => toggleUserStatus(user.id, "active")}
                                >
                                  <Unlock className="h-4 w-4 text-green-600" />
                                </Button>
                              )}
                              
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => toggleUserStatus(user.id, "banned")}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1">
            {editingUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Editar Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(handleUpdateUser)} className="space-y-4">
                      <FormField
                        control={userForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Papel</FormLabel>
                            <FormControl>
                              <select
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                {...field}
                              >
                                {Object.entries(roleOptions).map(([value, { label }]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <select
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                {...field}
                              >
                                {Object.entries(statusOptions).map(([value, { label }]) => (
                                  <option key={value} value={value}>{label}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={userForm.control}
                        name="verified"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Verificado</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 space-y-2">
                        <Button 
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Salvar Alterações
                        </Button>
                        
                        <Button 
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            userForm.reset();
                            setEditingUser(null);
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {!editingUser && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Informações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Estatísticas</h3>
                      <ul className="mt-2 space-y-1">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Total de usuários:</span>
                          <span className="font-medium">{users.length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Usuários ativos:</span>
                          <span className="font-medium">{users.filter(u => u.status === "active").length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Administradores:</span>
                          <span className="font-medium">{users.filter(u => u.role === "admin").length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Editores:</span>
                          <span className="font-medium">{users.filter(u => u.role === "editor").length}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Legenda de Status</h3>
                      <ul className="mt-2 space-y-2">
                        {Object.entries(statusOptions).map(([key, { label, color }]) => (
                          <li key={key} className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${color}`}>
                              {label}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {key === "active" && "Usuário com acesso normal"}
                              {key === "suspended" && "Temporariamente sem acesso"}
                              {key === "pending" && "Aguardando verificação"}
                              {key === "banned" && "Banido permanentemente"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
