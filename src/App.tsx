import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PlanSelection from "./pages/PlanSelection";
import Verification from "./pages/Verification";
import Advertise from "./pages/Advertise";
import Admin from "./pages/Admin";
import AdminAnuncios from "./pages/admin/AdminAnuncios";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminNewAds from "./pages/admin/AdminNewAds";
import AdminCreateAd from "./pages/admin/AdminCreateAd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
    path: "/verificacao",
    element: <Verification />,
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
    path: "/admin/anuncios",
    element: <AdminAnuncios />,
  },
  {
    path: "/admin/blog",
    element: <AdminBlog />,
  },
  {
    path: "/admin/usuarios",
    element: <AdminUsuarios />,
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
