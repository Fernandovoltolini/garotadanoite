
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-brand-red p-0 h-auto">
          Termos e Condições
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Termos e Condições de Uso</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-4 text-sm">
            <p>1. ACEITAÇÃO DOS TERMOS</p>
            <p>
              Ao acessar e usar este site, você confirma que tem mais de 18 anos e concorda
              em cumprir estes Termos e Condições de uso.
            </p>
            
            <p>2. DESCRIÇÃO DO SERVIÇO</p>
            <p>
              Nossa plataforma oferece um espaço para anúncios de acompanhantes. Não nos
              responsabilizamos pelo conteúdo dos anúncios ou pelas ações dos usuários.
            </p>
            
            <p>3. REGRAS DE CONDUTA</p>
            <p>
              Os usuários devem:
              - Ter mais de 18 anos
              - Fornecer informações verdadeiras
              - Não publicar conteúdo ilegal ou ofensivo
              - Respeitar outros usuários
            </p>
            
            <p>4. PRIVACIDADE</p>
            <p>
              Suas informações pessoais serão tratadas conforme nossa Política de
              Privacidade. Mantemos seus dados seguros e não compartilhamos com terceiros.
            </p>
            
            <p>5. RESPONSABILIDADES</p>
            <p>
              Não nos responsabilizamos por:
              - Condutas dos usuários
              - Veracidade dos anúncios
              - Transações entre usuários
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
