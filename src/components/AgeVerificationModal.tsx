
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified");
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-verified", "true");
    setIsOpen(false);
    toast.success("Verificação concluída. Bem-vindo!");
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-black border border-brand-red/50 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-brand-red">
            Verificação de Idade
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Este site contém conteúdo para adultos e só pode ser acessado por pessoas com 18 anos ou mais.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="text-gray-300 mb-4">
            Ao clicar em "Confirmar", você declara que:
          </p>
          <ul className="text-left text-gray-300 space-y-2 mb-4">
            <li>• Tem pelo menos 18 anos de idade</li>
            <li>• Está ciente que o site contém material adulto</li>
            <li>• Aceita os termos de uso e políticas do site</li>
            <li>• Acessa este conteúdo por vontade própria</li>
          </ul>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReject} className="w-full sm:w-auto">
            Sair
          </Button>
          <Button onClick={handleConfirm} className="bg-brand-red hover:bg-red-800 w-full sm:w-auto">
            Confirmar (18+)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
