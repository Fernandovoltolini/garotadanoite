
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black border-b border-brand-red/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-montserrat font-bold text-brand-red">
                Garota<span className="text-brand-white">da</span>Noite
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-brand-white hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Início
              </Link>
              <Link to="/busca" className="text-brand-white hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Busca
              </Link>
              <Link to="/anunciar" className="text-brand-white hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Anunciar
              </Link>
              <Link to="/blog" className="text-brand-white hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link to="/suporte" className="text-brand-white hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Suporte
              </Link>
              <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-white">
                Entrar
              </Button>
              <Button className="bg-brand-red text-brand-white hover:bg-red-900">
                Cadastrar
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-white hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-brand-red/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-white hover:text-brand-red hover:bg-black/30"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/busca" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-white hover:text-brand-red hover:bg-black/30"
              onClick={() => setIsOpen(false)}
            >
              Busca
            </Link>
            <Link 
              to="/anunciar" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-white hover:text-brand-red hover:bg-black/30"
              onClick={() => setIsOpen(false)}
            >
              Anunciar
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-white hover:text-brand-red hover:bg-black/30"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/suporte" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-white hover:text-brand-red hover:bg-black/30"
              onClick={() => setIsOpen(false)}
            >
              Suporte
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-white w-full">
                Entrar
              </Button>
              <Button className="bg-brand-red text-brand-white hover:bg-red-900 w-full">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
