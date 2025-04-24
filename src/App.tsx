
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/Profile";
import PlanSelection from "./pages/PlanSelection";
import Advertise from "./pages/Advertise";
import Admin from "./pages/Admin";
import AdminNewAds from "./pages/admin/AdminNewAds";
import AdminCreateAd from "./pages/admin/AdminCreateAd";
import NotFound from "./pages/NotFound";
import AdminAdvertOptions from "./pages/admin/AdminAdvertOptions";
import AdminBlogPosts from "./pages/admin/AdminBlogPosts";
import AdminUsers from "./pages/admin/AdminUsers";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";
import DocumentVerification from "./pages/DocumentVerification";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create router with all necessary routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/planos",
    element: <PlanSelection />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/anunciar",
    element: (
      <ProtectedRoute>
        <Advertise />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verificacao-documentos",
    element: (
      <ProtectedRoute>
        <DocumentVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verificacao",
    element: (
      <ProtectedRoute>
        <Verification />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute isAdmin={true}>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/novos-anuncios",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminNewAds />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/criar-anuncio",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminCreateAd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/anuncios",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminAdvertOptions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/blog",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminBlogPosts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/usuarios",
    element: (
      <ProtectedRoute isAdmin={true}>
        <AdminUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
