import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home, LogOut, Settings, Users, Clipboard } from "lucide-react";
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
      title: "Novos Anúncios",
      path: "/admin/novos-anuncios",
      icon: <Clipboard className="w-4 h-4" />
    },
    { 
      title: "Opções de Anúncios", 
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
        <Sidebar variant="inset" collapsible="icon" className="bg-[#1A1F2C] text-white border-r border-gray-800">
          <SidebarHeader className="flex justify-center py-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
          </SidebarHeader>
          
          <SidebarContent className="bg-[#1A1F2C]">
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className="text-gray-300 hover:text-white hover:bg-[#2A2F3C] data-[active=true]:bg-[#2A2F3C] data-[active=true]:text-white"
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
          
          <SidebarFooter className="border-t border-gray-800">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-[#2A2F3C]">
                  <Link to="/">
                    <LogOut className="w-4 h-4" />
                    <span>Sair do Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-gray-50">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
