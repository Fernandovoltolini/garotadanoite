
import { useState } from "react";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Edit, Image, Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for blog posts
const initialBlogPosts = [
  { 
    id: 1, 
    title: "Como escolher o melhor plano de anúncio", 
    category: "Dicas",
    author: "Admin",
    date: "2025-04-10",
    slug: "como-escolher-melhor-plano-anuncio",
    published: true,
    excerpt: "Aprenda como escolher o plano de anúncio ideal para suas necessidades...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl."
  },
  { 
    id: 2, 
    title: "5 dicas para destacar seu anúncio", 
    category: "Marketing",
    author: "Editor",
    date: "2025-04-08",
    slug: "5-dicas-para-destacar-seu-anuncio",
    published: true,
    excerpt: "Descubra como fazer seu anúncio se destacar entre os demais...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl."
  },
  { 
    id: 3, 
    title: "Novas funcionalidades na plataforma", 
    category: "Novidades",
    author: "Admin",
    date: "2025-04-05",
    slug: "novas-funcionalidades-na-plataforma",
    published: false,
    excerpt: "Conheça as novas funcionalidades que acabamos de implementar...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nunc eu nisl."
  },
];

// Form schema for blog posts
const blogPostFormSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  slug: z.string().min(5, "Slug deve ter pelo menos 5 caracteres"),
  category: z.string().min(3, "Categoria deve ter pelo menos 3 caracteres"),
  author: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  date: z.string(),
  published: z.boolean().default(false),
  excerpt: z.string().min(10, "Resumo deve ter pelo menos 10 caracteres"),
  content: z.string().min(50, "Conteúdo deve ter pelo menos 50 caracteres"),
});

const AdminBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [editingPost, setEditingPost] = useState<number | null>(null);

  // Form for blog posts
  const blogPostForm = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      author: "Admin",
      date: new Date().toISOString().split('T')[0],
      published: false,
      excerpt: "",
      content: ""
    }
  });

  const handleAddPost = (data: z.infer<typeof blogPostFormSchema>) => {
    if (editingPost) {
      setBlogPosts(blogPosts.map(post => 
        post.id === editingPost ? { ...data, id: post.id } : post
      ));
      setEditingPost(null);
    } else {
      setBlogPosts([...blogPosts, { ...data, id: Date.now() }]);
    }
    blogPostForm.reset();
  };

  const handleEditPost = (id: number) => {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      blogPostForm.reset(post);
      setEditingPost(id);
    }
  };

  const handleDeletePost = (id: number) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  // Generate slug from title
  const generateSlug = () => {
    const title = blogPostForm.getValues("title");
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    blogPostForm.setValue("slug", slug);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Gerenciamento do Blog</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Postagens do Blog</CardTitle>
                <CardDescription>Gerencie todas as postagens do blog</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Lista de postagens do blog</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{new Date(post.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {post.published ? "Publicado" : "Rascunho"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEditPost(post.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {editingPost ? "Editar Postagem" : "Adicionar Postagem"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...blogPostForm}>
                  <form onSubmit={blogPostForm.handleSubmit(handleAddPost)} className="space-y-4">
                    <FormField
                      control={blogPostForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Título da postagem..." {...field} />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={generateSlug}
                              className="shrink-0"
                            >
                              Gerar Slug
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={blogPostForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="titulo-da-postagem" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL amigável para a postagem (sem espaços ou caracteres especiais)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={blogPostForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Dicas, Novidades..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={blogPostForm.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Autor</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do autor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={blogPostForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <Input type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={blogPostForm.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <select
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                                value={field.value ? "published" : "draft"}
                                onChange={(e) => field.onChange(e.target.value === "published")}
                              >
                                <option value="published">Publicado</option>
                                <option value="draft">Rascunho</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={blogPostForm.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resumo</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Um breve resumo da postagem..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Este texto será exibido na listagem de postagens
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={blogPostForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conteúdo</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Escreva o conteúdo completo da postagem aqui..."
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2 mb-8"
                      >
                        <Image className="h-4 w-4" />
                        Adicionar Imagem de Destaque
                      </Button>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {editingPost ? "Atualizar Postagem" : "Adicionar Postagem"}
                    </Button>
                    
                    {editingPost && (
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          blogPostForm.reset();
                          setEditingPost(null);
                        }}
                      >
                        Cancelar
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPosts;
