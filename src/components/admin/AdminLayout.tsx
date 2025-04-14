
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home, LogOut, Settings, Users } from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/admin", 
      icon: <Home className="w-4 h-4" /> 
    },
    { 
      title: "Anúncios", 
      path: "/admin/anuncios", 
      icon: <Settings className="w-4 h-4" /> 
    },
    { 
      title: "Blog", 
      path: "/admin/blog", 
      icon: <FileText className="w-4 h-4" /> 
    },
    { 
      title: "Usuários", 
      path: "/admin/usuarios", 
      icon: <Users className="w-4 h-4" /> 
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex justify-center py-6">
            <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={item.title}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <LogOut className="w-4 h-4" />
                    <span>Sair do Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
