
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Upload, CheckCircle, FileText } from "lucide-react";
import PaymentModal from "@/components/payment/PaymentModal";

const Verification = () => {
  const [documentFront, setDocumentFront] = useState<File | null>(null);
  const [documentBack, setDocumentBack] = useState<File | null>(null);
  const [documentSelfie, setDocumentSelfie] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [planDetails, setPlanDetails] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Fetch the selected plan details from the database
  useEffect(() => {
    const fetchPlanDetails = async () => {
      const planId = localStorage.getItem("selectedPlan");
      const planDuration = localStorage.getItem("selectedDuration");
      
      if (planId) {
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('id', planId)
          .single();
          
        if (error) {
          console.error("Error fetching plan:", error);
          // Fallback to default plan data
          setPlanDetails({
            name: "Plano Premium",
            duration: "3 dias",
            amount: 150
          });
        } else if (data) {
          setPlanDetails({
            id: data.id,
            name: data.name,
            duration: `${data.duration_days} dias`,
            amount: data.price
          });
        }
      } else {
        // Fallback to default plan data if no plan is selected
        setPlanDetails({
          name: "Plano Premium",
          duration: "3 dias",
          amount: 150
        });
      }
    };
    
    fetchPlanDetails();
    
    // Check if the user has already submitted verification documents
    const checkVerificationStatus = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('verification_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (!error && data && data.length > 0) {
        // User has already submitted documents
        setVerificationComplete(true);
      }
    };
    
    checkVerificationStatus();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Você precisa estar logado",
        description: "Por favor, faça login para enviar seus documentos.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    if (!documentFront || !documentBack || !documentSelfie) {
      toast({
        title: "Documentos incompletos",
        description: "Por favor, envie todos os documentos necessários.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload files to storage
      const frontPath = `verification/${user.id}/front_${Date.now()}`;
      const backPath = `verification/${user.id}/back_${Date.now()}`;
      const selfiePath = `verification/${user.id}/selfie_${Date.now()}`;
      
      const frontUpload = await supabase.storage
        .from('verifications')
        .upload(frontPath, documentFront);
        
      const backUpload = await supabase.storage
        .from('verifications')
        .upload(backPath, documentBack);
        
      const selfieUpload = await supabase.storage
        .from('verifications')
        .upload(selfiePath, documentSelfie);
        
      if (frontUpload.error || backUpload.error || selfieUpload.error) {
        throw new Error("Erro ao enviar os arquivos");
      }
      
      // Get public URLs
      const frontUrl = supabase.storage.from('verifications').getPublicUrl(frontPath).data.publicUrl;
      const backUrl = supabase.storage.from('verifications').getPublicUrl(backPath).data.publicUrl;
      const selfieUrl = supabase.storage.from('verifications').getPublicUrl(selfiePath).data.publicUrl;
      
      // Save document references in the database
      const { error } = await supabase
        .from('verification_documents')
        .insert({
          user_id: user.id,
          document_front_url: frontUrl,
          document_back_url: backUrl,
          document_selfie_url: selfieUrl,
          status: 'pending'
        });
        
      if (error) {
        throw error;
      }
      
      setVerificationComplete(true);
      toast({
        title: "Documentos enviados com sucesso",
        description: "Seus documentos foram recebidos e serão analisados em breve.",
      });
    } catch (err) {
      console.error("Error uploading documents:", err);
      toast({
        title: "Erro ao enviar documentos",
        description: "Ocorreu um erro ao enviar seus documentos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinueToPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Pagamento concluído",
      description: "Seu anúncio está sendo processado e em breve estará disponível.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Verificação de <span className="text-red-600">Identidade</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Para garantir a segurança de todos os usuários, precisamos verificar sua identidade.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Envie seus documentos</CardTitle>
              <CardDescription className="text-gray-400">
                Para prosseguir com seu anúncio, precisamos confirmar sua identidade
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!verificationComplete ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                          Documento de Identidade (Frente)
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                          <input
                            type="file"
                            id="document_front"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setDocumentFront)}
                          />
                          <label htmlFor="document_front" className="cursor-pointer flex flex-col items-center">
                            {documentFront ? (
                              <>
                                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                                <span className="text-sm text-gray-300 truncate max-w-full">
                                  {documentFront.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-400">Clique para enviar</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                          Documento de Identidade (Verso)
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                          <input
                            type="file"
                            id="document_back"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setDocumentBack)}
                          />
                          <label htmlFor="document_back" className="cursor-pointer flex flex-col items-center">
                            {documentBack ? (
                              <>
                                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                                <span className="text-sm text-gray-300 truncate max-w-full">
                                  {documentBack.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-400">Clique para enviar</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Selfie com Documento
                      </label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition-colors">
                        <input
                          type="file"
                          id="document_selfie"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setDocumentSelfie)}
                        />
                        <label htmlFor="document_selfie" className="cursor-pointer flex flex-col items-center">
                          {documentSelfie ? (
                            <>
                              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                              <span className="text-sm text-gray-300 truncate max-w-full">
                                {documentSelfie.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-400">Clique para enviar</span>
                              <span className="text-xs text-gray-500 mt-1">
                                Envie uma selfie segurando seu documento de identidade.
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={isUploading}
                    >
                      {isUploading ? "Enviando..." : "Enviar Documentos"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-green-900/20 p-4 rounded-full mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Documentos Enviados com Sucesso!
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Seus documentos foram recebidos e estão sendo analisados. Você receberá uma notificação em breve.
                    </p>
                  </div>
                  
                  {planDetails && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <h4 className="text-lg font-medium text-white">Resumo do Plano</h4>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Plano:</span>
                        <span className="text-white">{planDetails.name}</span>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Duração:</span>
                        <span className="text-white">{planDetails.duration}</span>
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold mt-3">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-red-500">R$ {planDetails.amount}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleContinueToPayment}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Continuar para Pagamento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planName={planDetails?.name || "Plano Premium"}
        planDuration={planDetails?.duration || "3 dias"}
        amount={planDetails?.amount || 150}
        onPaymentComplete={handlePaymentComplete}
        useMercadoPago={true}
      />
      
      <Footer />
    </div>
  );
};

export default Verification;
