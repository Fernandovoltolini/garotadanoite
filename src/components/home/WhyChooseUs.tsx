
import { Shield, Award, Heart, UserCheck } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-brand-red" />,
      title: "Segurança e Discrição",
      description: "Protegemos sua privacidade com processos rigorosos de verificação e políticas de discrição absoluta."
    },
    {
      icon: <Award className="h-10 w-10 text-brand-red" />,
      title: "Acompanhantes Verificadas",
      description: "Todas as acompanhantes passam por um processo de verificação para garantir autenticidade."
    },
    {
      icon: <Heart className="h-10 w-10 text-brand-red" />,
      title: "Experiências Personalizadas",
      description: "Encontre companhia para eventos, viagens ou jantares, alinhada com seus gostos pessoais."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-brand-red" />,
      title: "Suporte Dedicado",
      description: "Equipe de suporte disponível para ajudá-lo com qualquer dúvida ou necessidade."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Por que escolher <span className="text-brand-red">Garota da Noite?</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Oferecemos uma plataforma segura e elegante para encontrar companhia de qualidade para seus momentos especiais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-black/50 border border-brand-red/20 rounded-lg p-6 hover:border-brand-red/40 transition-all duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
