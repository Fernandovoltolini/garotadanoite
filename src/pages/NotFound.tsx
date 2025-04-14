
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-5xl font-bold text-brand-red mb-4">404</h1>
          <p className="text-xl text-white mb-8">
            Oops! A página que você está procurando não foi encontrada.
          </p>
          <Button asChild className="bg-brand-red hover:bg-red-900 text-white">
            <Link to="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
