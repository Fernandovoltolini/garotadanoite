
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-brand-red/30 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-4">Garota da Noite</h3>
            <p className="text-gray-400">
              Momentos inesquecíveis, com quem você merece.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-brand-red">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-red">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-red">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-red">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand-red transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/busca" className="text-gray-400 hover:text-brand-red transition-colors">
                  Buscar Acompanhantes
                </Link>
              </li>
              <li>
                <Link to="/anunciar" className="text-gray-400 hover:text-brand-red transition-colors">
                  Anunciar
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-brand-red transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/suporte" className="text-gray-400 hover:text-brand-red transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/suporte/faq" className="text-gray-400 hover:text-brand-red transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-brand-red transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-brand-red transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-brand-red transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-brand-red transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-red/20 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Garota da Noite. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Conteúdo exclusivo para maiores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
}
