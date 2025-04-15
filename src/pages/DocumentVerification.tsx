import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocumentImage {
  id: string;
  title: string;
  instruction: string;
  file?: File;
  preview: string;
}

const DocumentVerification = () => {
  const [documentImages, setDocumentImages] = useState<DocumentImage[]>([
    {
      id: "front",
      title: "Frente do Documento",
      instruction: "Envie uma foto clara da frente do seu documento de identidade (RG ou CNH)",
      preview: "/placeholder.svg"
    },
    {
      id: "back",
      title: "Verso do Documento",
      instruction: "Envie uma foto clara do verso do seu documento de identidade",
      preview: "/placeholder.svg"
    },
    {
      id: "selfie",
      title: "Selfie com Documento",
      instruction: "Envie uma selfie segurando o documento ao lado do rosto",
      preview: "/placeholder.svg"
    }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setDocumentImages(prev => 
            prev.map(img => 
              img.id === imageId 
                ? { ...img, file, preview: event.target?.result as string } 
                : img
            )
          );
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    // Check if all documents are uploaded
    const allUploaded = documentImages.every(img => img.file);
    
    if (!allUploaded) {
      toast({
        title: "Documentos incompletos",
        description: "Por favor, envie todos os documentos solicitados para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Documentos enviados",
      description: "Seus documentos foram enviados com sucesso. Você pode continuar criando seu anúncio.",
    });
    
    navigate("/anunciar");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Verificação de <span className="text-brand-red">Identidade</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Para garantir a segurança de todos os usuários, precisamos verificar sua identidade
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-secondary border-gray-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-brand-red" />
                Verificação Obrigatória
              </CardTitle>
              <CardDescription className="text-gray-400">
                A verificação de identidade é uma etapa importante para garantir a segurança da plataforma e evitar fraudes
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {documentImages.map((doc) => (
                  <div key={doc.id} className="flex flex-col">
                    <h3 className="text-white font-medium mb-2">{doc.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{doc.instruction}</p>
                    
                    <div 
                      className="aspect-square relative rounded-md overflow-hidden border border-gray-700 bg-gray-900 flex items-center justify-center mb-2"
                    >
                      <img 
                        src={doc.preview} 
                        alt={doc.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition">
                        <label className="cursor-pointer p-4 text-white flex flex-col items-center">
                          <Camera className="w-8 h-8 mb-2 text-brand-red" />
                          <span className="text-xs text-center">Clique para enviar</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, doc.id)} 
                          />
                        </label>
                      </div>
                    </div>
                    
                    {doc.file && (
                      <p className="text-green-500 text-xs text-center">
                        ✓ Imagem carregada: {doc.file.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-900/70 p-4 rounded-md border border-gray-800 mb-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  Informações de Privacidade
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  Seus documentos são utilizados apenas para verificação de identidade e não serão compartilhados com terceiros. 
                  Após a verificação, suas informações ficam armazenadas de forma segura e criptografada.
                </p>
                
                <div className="flex items-center gap-2 text-yellow-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">
                    Seus documentos serão analisados pela nossa equipe em até 24 horas.
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-brand-red hover:bg-red-900 text-white" 
                  size="lg"
                >
                  Enviar Documentos e Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentVerification;
