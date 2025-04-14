
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Calendar, Clock, User, Tag, ChevronRight, ChevronLeft } from "lucide-react";

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: "Como escolher a companhia perfeita para um evento",
    excerpt: "Dicas essenciais para selecionar a acompanhante ideal para eventos sociais, considerando etiqueta, interesses comuns e apresentação.",
    image: "/placeholder.svg",
    date: "2025-04-02",
    readTime: "5 min",
    author: "Equipe Editorial",
    category: "Dicas para Clientes",
    tags: ["eventos sociais", "etiqueta", "primeira impressão"]
  },
  {
    id: 2,
    title: "Dicas de segurança para encontros",
    excerpt: "Orientações práticas para garantir que seus encontros sejam sempre seguros e agradáveis, com medidas preventivas importantes.",
    image: "/placeholder.svg",
    date: "2025-03-28",
    readTime: "7 min",
    author: "Equipe de Segurança",
    category: "Segurança",
    tags: ["segurança", "encontros", "proteção"]
  },
  {
    id: 3,
    title: "Como criar um perfil atraente que se destaca",
    excerpt: "Guia completo para anunciantes criarem perfis que chamam a atenção e atraem mais clientes de qualidade.",
    image: "/placeholder.svg",
    date: "2025-03-22",
    readTime: "6 min",
    author: "Consultoria de Marketing",
    category: "Conselhos para Anunciantes",
    tags: ["perfil", "marketing", "fotografia"]
  },
  {
    id: 4,
    title: "Etiqueta e boas maneiras em encontros sociais",
    excerpt: "Aprenda as regras não escritas de comportamento em eventos sociais para causar a melhor impressão possível.",
    image: "/placeholder.svg",
    date: "2025-03-15",
    readTime: "8 min",
    author: "Consultora de Etiqueta",
    category: "Dicas para Clientes",
    tags: ["etiqueta", "eventos", "impressão social"]
  },
  {
    id: 5,
    title: "Como maximizar seus ganhos como acompanhante",
    excerpt: "Estratégias para acompanhantes aumentarem seus rendimentos mantendo a qualidade do serviço e a satisfação dos clientes.",
    image: "/placeholder.svg",
    date: "2025-03-10",
    readTime: "9 min",
    author: "Consultoria Financeira",
    category: "Conselhos para Anunciantes",
    tags: ["finanças", "estratégias", "precificação"]
  },
  {
    id: 6,
    title: "Tendências do mercado de acompanhantes em 2025",
    excerpt: "Análise das novas tendências no setor de serviços de companhia e como se adaptar a essas mudanças.",
    image: "/placeholder.svg",
    date: "2025-03-05",
    readTime: "10 min",
    author: "Analista de Mercado",
    category: "Tendências",
    tags: ["mercado", "tendências", "futuro"]
  }
];

// Categories for sidebar
const categories = [
  { name: "Dicas para Clientes", count: 12 },
  { name: "Conselhos para Anunciantes", count: 9 },
  { name: "Segurança", count: 7 },
  { name: "Tendências", count: 5 },
  { name: "Eventos", count: 3 },
];

// Popular tags
const popularTags = [
  "segurança", "eventos", "perfil", "fotografia", "etiqueta", 
  "encontros", "finanças", "comunicação"
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // In a real application, this would filter the posts
  };
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog <span className="text-brand-red">Garota da Noite</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Dicas, conselhos e tendências para melhorar suas experiências
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar no blog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700"
              />
            </form>
            
            {/* Active filters */}
            {(selectedCategory || selectedTag) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <Badge 
                    variant="secondary" 
                    className="px-3 py-1 bg-gray-800 text-white"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {selectedCategory} ×
                  </Badge>
                )}
                
                {selectedTag && (
                  <Badge 
                    variant="secondary" 
                    className="px-3 py-1 bg-gray-800 text-white"
                    onClick={() => setSelectedTag(null)}
                  >
                    #{selectedTag} ×
                  </Badge>
                )}
                
                {(selectedCategory || selectedTag) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                    }}
                  >
                    Limpar filtros
                  </Button>
                )}
              </div>
            )}
            
            {/* Blog posts grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="bg-secondary border-gray-800 overflow-hidden hover:border-brand-red/50 transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge 
                          className="bg-brand-red text-white hover:bg-brand-red/90 cursor-pointer"
                          onClick={() => setSelectedCategory(post.category)}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-white text-xl hover:text-brand-red transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <CardDescription className="text-gray-300">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap justify-between text-xs text-gray-400 pt-0">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} leitura
                        </span>
                      </div>
                      
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary border border-gray-800 rounded-lg">
                <p className="text-gray-400">Nenhum artigo encontrado com os filtros selecionados.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-brand-red"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                    setSelectedTag(null);
                  }}
                >
                  Limpar filtros e mostrar todos os artigos
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                
                <Button variant="outline" size="sm" className="bg-brand-red border-brand-red text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="mx-1 text-gray-500">...</span>
                <Button variant="outline" size="sm">6</Button>
                
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-6 space-y-8">
              {/* Featured post */}
              <Card className="bg-secondary border-gray-800 overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <img 
                    src="/placeholder.svg" 
                    alt="Post em destaque" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge className="bg-brand-red mb-2">Em Destaque</Badge>
                    <h3 className="text-white text-xl font-bold">Dicas avançadas para garantir sua segurança em encontros</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-gray-300 text-sm">
                    Confira nosso guia completo com as melhores práticas de segurança para garantir experiências positivas.
                  </p>
                  <Button variant="link" className="px-0 text-brand-red">
                    Ler artigo completo
                  </Button>
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Categorias</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-between ${
                            selectedCategory === category.name ? 'text-brand-red' : 'text-gray-300'
                          }`}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.name ? null : category.name
                          )}
                        >
                          {category.name}
                          <Badge variant="outline" className="ml-2 bg-transparent">
                            {category.count}
                          </Badge>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Popular tags */}
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Tags Populares</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className={`
                          cursor-pointer bg-gray-800 hover:bg-gray-700
                          ${selectedTag === tag ? 'border-brand-red text-brand-red' : 'text-gray-300'}
                        `}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Newsletter */}
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Receba Novidades</CardTitle>
                  <CardDescription className="text-gray-400">
                    Inscreva-se para receber as últimas dicas e notícias
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <form className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Seu e-mail"
                        className="bg-gray-900 border-gray-700"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-brand-red hover:bg-red-900 text-white">
                      Inscrever-se
                    </Button>
                  </form>
                  <p className="text-xs text-gray-400 mt-4">
                    Ao se inscrever, você concorda com nossa política de privacidade. 
                    Prometemos não enviar spam.
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
