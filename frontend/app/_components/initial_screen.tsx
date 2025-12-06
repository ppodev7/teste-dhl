"use client";


import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function InitialScreen() {
  const router = useRouter();

  /**
   * router.push para navegação client-side
   */
  const handleAccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
      {/* Container central */}
      <div className="text-center space-y-8">
        
        {/* Logo / Nome da aplicação */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-zinc-100 tracking-tight">
            ZYX
          </h1>
          <p className="text-zinc-500 text-lg">
            Supply Chain Control
          </p>
        </div>

        {/* Linha decorativa */}
        <div className="w-16 h-px bg-zinc-800 mx-auto" />

        {/* Descrição */}
        <p className="text-zinc-400 max-w-md mx-auto">
          Sistema de controle e gerenciamento de caminhões
        </p>

        {/* Botão de acesso */}
        <Button
          onClick={handleAccess}
          size="lg"
          className="bg-zinc-100 text-zinc-900 hover:bg-white px-8 py-6 text-lg font-medium"
        >
          Acessar Sistema
        </Button>
      </div>

      {/* Footer minimalista */}
      <footer className="absolute bottom-8 text-zinc-600 text-sm">
        © 2025 ZYX Logistics
      </footer>
    </div>
  );
}

