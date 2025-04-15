import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950 border-b border-gray-800">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-6">
          <div className="flex items-center">
            <span className="hidden md:inline-block text-xl font-bold text-brand-red">Garota da Noite</span>
            <span className="md:hidden text-xl font-bold text-brand-red">GDN</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium text-gray-200 transition-colors hover:text-white">
            <span>Início</span>
          </Link>
          <Link to="/busca" className="text-sm font-medium text-gray-200 transition-colors hover:text-white">
            <span>Buscar</span>
          </Link>
          <Link to="/blog" className="text-sm font-medium text-gray-200 transition-colors hover:text-white">
            <span>Blog</span>
          </Link>
          <Link to="/suporte" className="text-sm font-medium text-gray-200 transition-colors hover:text-white">
            <span>Suporte</span>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link to="/planos" className="hidden md:inline-flex bg-brand-red hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm font-medium">
            Anunciar
          </Link>
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-gray-800 bg-transparent text-gray-300">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-gray-800 bg-gray-950 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Garota da Noite</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-gray-200 hover:text-white">
                      Início
                    </Link>
                    <Link to="/busca" className="text-gray-200 hover:text-white">
                      Buscar
                    </Link>
                    <Link to="/blog" className="text-gray-200 hover:text-white">
                      Blog
                    </Link>
                    <Link to="/suporte" className="text-gray-200 hover:text-white">
                      Suporte
                    </Link>
                  </nav>
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <Link to="/planos" className="w-full bg-brand-red hover:bg-red-900 text-white px-4 py-2 rounded-md text-center block">
                      Anunciar
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
