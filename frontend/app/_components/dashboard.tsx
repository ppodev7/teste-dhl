// Importa os componentes de UI necessários do shadcn/ui.
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Importa o ícone de reticências para o menu de ações.
import { MoreHorizontal } from "lucide-react";

export function Dashboard() {
  return (
    // Container principal para centralizar o card na página.
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Controle de Caminhões</CardTitle>
          <CardDescription>
            Gerencie os caminhões da sua frota.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}