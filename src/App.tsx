
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import PlanSelection from "./pages/PlanSelection";
import DocumentVerification from "./pages/DocumentVerification";
import Advertise from "./pages/Advertise";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAdvertOptions from "./pages/admin/AdminAdvertOptions";
import AdminBlogPosts from "./pages/admin/AdminBlogPosts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminNewAds from "./pages/admin/AdminNewAds";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/busca" element={<Search />} />
            <Route path="/perfil/:id" element={<Profile />} />
            <Route path="/planos" element={<PlanSelection />} />
            <Route path="/verificacao" element={<DocumentVerification />} />
            <Route path="/anunciar" element={<Advertise />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/suporte" element={<Support />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/anuncios" element={<AdminAdvertOptions />} />
            <Route path="/admin/blog" element={<AdminBlogPosts />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />
            <Route path="/admin/novos-anuncios" element={<AdminNewAds />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
