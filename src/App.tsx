
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

// We'll create a simpler router with only the pages that exist
const router = createBrowserRouter([
  {
    path: "/",
    element: <PlanSelection />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
