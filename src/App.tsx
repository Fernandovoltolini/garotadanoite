
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
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
    path: "/anunciar",
    element: <Advertise />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/novos-anuncios",
    element: <AdminNewAds />,
  },
  {
    path: "/admin/criar-anuncio",
    element: <AdminCreateAd />
  },
  {
    path: "/admin/anuncios",
    element: <AdminAdvertOptions />
  },
  {
    path: "/admin/blog",
    element: <AdminBlogPosts />
  },
  {
    path: "/admin/usuarios",
    element: <AdminUsers />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/verificacao",
    element: <Verification />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
