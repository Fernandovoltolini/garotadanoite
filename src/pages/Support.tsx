
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle, MessageCircle, Mail, Phone, AlertCircle, FileText, User, Clock } from "lucide-react";

// FAQ data organized by category
const faqData = {
  general: [
    {
      question: "Como funciona o site Garota da Noite?",
      answer: "Garota da Noite é uma plataforma de classificados onde profissionais de acompanhamento podem anunciar seus serviços e clientes podem encontrá-los. O site opera como um intermediário que facilita o contato entre ambas as partes, sem se envolver diretamente nas negociações ou encontros."
    },
    {
      question: "O site é seguro para usar?",
      answer: "Sim, priorizamos a segurança dos usuários. Utilizamos certificado SSL para garantir conexões seguras, moderamos anúncios e implementamos medidas para proteger a privacidade dos usuários. Recomendamos também que todos sigam nossas diretrizes de segurança ao marcar encontros."
    },
    {
      question: "Existe algum custo para usar o site?",
      answer: "Para visitantes e clientes que buscam acompanhantes, o uso é gratuito. Para anunciantes, oferecemos planos gratuito, premium e VIP com diferentes recursos e níveis de visibilidade."
    },
    {
      question: "Como posso entrar em contato com o suporte?",
      answer: "Você pode entrar em contato através do formulário disponível nesta página, por e-mail em suporte@garotadanoite.com.br, ou pelo chat ao vivo disponível em horário comercial."
    }
  ],
  anunciantes: [
    {
      question: "Como criar um anúncio?",
      answer: "Para criar seu anúncio, clique em 'Anunciar' no menu principal, preencha o formulário com suas informações, adicione fotos e escolha seu plano. Seu anúncio passará por moderação e estará disponível em até 24 horas após aprovação."
    },
    {
      question: "Quanto tempo demora para meu anúncio ser aprovado?",
      answer: "Normalmente, a moderação leva entre 12 a 24 horas em dias úteis. Anúncios que sigam todas as nossas diretrizes são aprovados mais rapidamente."
    },
    {
      question: "Como posso destacar meu anúncio?",
      answer: "Para obter destaque, você pode contratar os planos Premium ou VIP, que oferecem maior visibilidade nos resultados de busca, mais fotos, e recursos exclusivos como o selo de verificação e destaque na página inicial."
    },
    {
      question: "É possível editar meu anúncio após publicação?",
      answer: "Sim, você pode editar seu anúncio a qualquer momento através da sua área de perfil. Alterações significativas podem passar por nova moderação."
    }
  ],
  clientes: [
    {
      question: "Como entrar em contato com um anunciante?",
      answer: "Para entrar em contato, visite o perfil da acompanhante e clique no botão 'Entrar em Contato'. É necessário estar cadastrado e logado para acessar as informações de contato."
    },
    {
      question: "Como avalio um acompanhante após o encontro?",
      answer: "Após interagir com um anunciante, você pode deixar uma avaliação no perfil dela. Avaliações são moderadas para garantir respeito e veracidade."
    },
    {
      question: "O site garante a qualidade dos serviços?",
      answer: "O site não garante diretamente a qualidade dos serviços, funcionando apenas como plataforma de conexão. Recomendamos verificar as avaliações, perfis verificados e conversar previamente para esclarecer expectativas."
    },
    {
      question: "Como reportar um problema com um anúncio?",
      answer: "Em cada perfil existe um botão para reportar problemas. Nossa equipe analisará cada caso com atenção e tomará as medidas necessárias."
    }
  ],
  seguranca: [
    {
      question: "Como garantir minha segurança em encontros?",
      answer: "Recomendamos: encontrar-se sempre em locais públicos inicialmente, informar a alguém de confiança sobre o encontro, verificar avaliações do perfil, utilizar os meios de comunicação do site para manter registro das conversas e confiar em sua intuição."
    },
    {
      question: "O site protege minha privacidade?",
      answer: "Sim, não revelamos seus dados pessoais a terceiros. Para anunciantes, apenas as informações explicitamente compartilhadas ficam visíveis. Para clientes, o sistema protege sua identidade exceto quando você decide compartilhar informações."
    },
    {
      question: "Como funciona a verificação de perfis?",
      answer: "Perfis verificados passaram por um processo onde confirmamos a identidade do anunciante através de documento oficial e foto. Isso ajuda a reduzir perfis falsos e aumenta a confiabilidade."
    }
  ]
};

// Support team data
const supportTeam = [
  {
    name: "Ana Silva",
    role: "Suporte ao Cliente",
    avatar: "/placeholder.svg",
    description: "Especialista em resolver dúvidas sobre uso da plataforma e problemas de conta."
  },
  {
    name: "Carlos Mendes",
    role: "Moderação de Conteúdo",
    avatar: "/placeholder.svg",
    description: "Responsável por garantir que todos os anúncios sigam nossas diretrizes de conteúdo."
  },
  {
    name: "Juliana Costa",
    role: "Suporte a Pagamentos",
    avatar: "/placeholder.svg",
    description: "Auxilia em questões relacionadas a pagamentos, planos e faturas."
  }
];

// Knowledge base articles
const knowledgeArticles = [
  {
    title: "Guia completo para novos usuários",
    excerpt: "Aprenda a navegar no site e utilizar todos os recursos disponíveis",
    icon: <User className="h-5 w-5" />,
    readTime: "4 min"
  },
  {
    title: "Como garantir mais visualizações no seu perfil",
    excerpt: "Dicas para otimizar seu anúncio e atrair mais clientes qualificados",
    icon: <HelpCircle className="h-5 w-5" />,
    readTime: "6 min"
  },
  {
    title: "Políticas de uso e conduta",
    excerpt: "Entenda as regras do site e como garantir uma experiência positiva",
    icon: <FileText className="h-5 w-5" />,
    readTime: "5 min"
  },
  {
    title: "Dicas de segurança para encontros",
    excerpt: "Recomendações essenciais para encontros seguros e agradáveis",
    icon: <AlertCircle className="h-5 w-5" />,
    readTime: "8 min"
  }
];

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the message to a backend
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Nossa equipe responderá em breve para o email fornecido.",
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Suporte & <span className="text-brand-red">Ajuda</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para ajudar você com qualquer dúvida ou problema
          </p>
        </div>
        
        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-secondary border-gray-800 hover:border-brand-red/40 transition-all">
            <CardHeader className="text-center pb-2">
              <MessageCircle className="mx-auto h-10 w-10 text-brand-red mb-2" />
              <CardTitle className="text-white">Chat ao Vivo</CardTitle>
              <CardDescription className="text-gray-400">
                Suporte imediato em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-gray-300 pb-2">
              <p>Disponível das 9h às 21h</p>
              <p>Tempo médio de espera: 2 minutos</p>
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <Button className="bg-brand-red hover:bg-red-900 text-white">
                Iniciar Chat
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-secondary border-gray-800 hover:border-brand-red/40 transition-all">
            <CardHeader className="text-center pb-2">
              <Mail className="mx-auto h-10 w-10 text-brand-red mb-2" />
              <CardTitle className="text-white">Email de Contato</CardTitle>
              <CardDescription className="text-gray-400">
                Para assuntos não urgentes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-gray-300 pb-2">
              <p>suporte@garotadanoite.com.br</p>
              <p>Resposta em até 24 horas úteis</p>
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <Button variant="outline" onClick={() => window.location.href = "mailto:suporte@garotadanoite.com.br"}>
                Enviar Email
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-secondary border-gray-800 hover:border-brand-red/40 transition-all">
            <CardHeader className="text-center pb-2">
              <Phone className="mx-auto h-10 w-10 text-brand-red mb-2" />
              <CardTitle className="text-white">Telefone</CardTitle>
              <CardDescription className="text-gray-400">
                Para suporte urgente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-gray-300 pb-2">
              <p>(11) 9999-9999</p>
              <p>Seg - Sex: 10h às 18h</p>
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <Button variant="outline" onClick={() => window.location.href = "tel:1199999999"}>
                Ligar Agora
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Perguntas Frequentes
          </h2>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="w-full flex flex-wrap justify-center">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="anunciantes">Para Anunciantes</TabsTrigger>
              <TabsTrigger value="clientes">Para Clientes</TabsTrigger>
              <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card className="bg-secondary border-gray-800">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(faqData).map(([category, questions]) => {
                  // Only show if "all" is selected or the specific category is selected
                  if (activeTab === "all" || activeTab === category) {
                    return questions.map((faq, index) => (
                      <AccordionItem 
                        key={`${category}-${index}`} 
                        value={`${category}-${index}`}
                        className="border-gray-800"
                      >
                        <AccordionTrigger className="text-white hover:text-brand-red">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          <p className="pb-2">{faq.answer}</p>
                          <div className="flex justify-end mt-2">
                            <Badge variant="outline" className="text-xs border-gray-600">
                              {category === "general" ? "Geral" : 
                               category === "anunciantes" ? "Para Anunciantes" :
                               category === "clientes" ? "Para Clientes" : "Segurança"}
                            </Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ));
                  }
                  return null;
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Form and Knowledge Base */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-secondary border-gray-800 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-xl">Envie sua Mensagem</CardTitle>
              <CardDescription className="text-gray-400">
                Preencha o formulário abaixo e nossa equipe entrará em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      className="bg-gray-900 border-gray-700"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="Seu email"
                      className="bg-gray-900 border-gray-700"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">Assunto</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    placeholder="Assunto da mensagem"
                    className="bg-gray-900 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Mensagem</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Detalhe seu problema ou dúvida..."
                    className="bg-gray-900 border-gray-700 min-h-[150px]"
                    required
                  />
                </div>
                
                <div>
                  <Button type="submit" className="w-full bg-brand-red hover:bg-red-900 text-white">
                    Enviar Mensagem
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Base de Conhecimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {knowledgeArticles.map((article, index) => (
                  <div 
                    key={index}
                    className="flex gap-3 p-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="text-brand-red">
                      {article.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{article.title}</h4>
                      <p className="text-gray-400 text-sm">{article.excerpt}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime} de leitura
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Todos os Artigos
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Horário de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta:</span>
                    <span>9h às 21h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span>10h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span>12h às 16h</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
                  <p>Tempo médio de resposta: 2 horas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Support Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Nossa Equipe de Suporte
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportTeam.map((member, index) => (
              <Card key={index} className="bg-secondary border-gray-800 text-center">
                <CardHeader className="pb-2">
                  <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <Badge className="mx-auto bg-brand-red mt-1">{member.role}</Badge>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
