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
        <CardContent>
          <Table>
            <TableHeader>
              {/* Cabeçalho da tabela com as colunas definidas. */}
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Exemplo de uma linha da tabela. */}
              <TableRow>
                <TableCell>
                  <Badge variant="outline">Em Trânsito</Badge>
                </TableCell>
                <TableCell className="font-medium">João da Silva</TableCell>
                <TableCell>ABC-1234</TableCell>
                <TableCell>Transportadora Veloz</TableCell>
                <TableCell>São Paulo, SP</TableCell>
                <TableCell>Rio de Janeiro, RJ</TableCell>
                <TableCell>
                  {/* Menu de ações para cada linha (editar, excluir). */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}