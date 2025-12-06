"use client";

/**
 * 
 * Funcionalidades:
 * - Exibe lista de caminhões em tabela
 * - Filtro por status
 * - Ações por linha (editar/excluir)
 * 
 * Usando Mockdata para o desenvolvimento
 */

import { useState } from "react";
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
  DropdownMenuSeparator,
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
import { MoreHorizontal, Filter, X } from "lucide-react";
import { AddTruckDialog } from "./addTruckDialog";
import { TRUCK_STATUS, TruckStatus, Truck } from "./types/truck";

/**
 * Mock data para desenvolvimento
 * Simula resposta da API GET /api/trucks
 * 
 * IMPORTANTE: Remover quando integrar com backend
 */
const mockTrucks: Truck[] = [
  {
    _id: "1",
    placa: "ABC-1234",
    motorista: "João da Silva",
    carga: "Eletrônicos",
    empresa: "Transportadora Veloz",
    origem: { cidade: "São Paulo", endereco: "Av. Paulista, 1000" },
    destino: { cidade: "Rio de Janeiro", endereco: "Av. Brasil, 500" },
    horarioEntrada: "2025-12-06T08:00:00",
    horarioSaida: null,
    status: TRUCK_STATUS.EM_TRANSITO,
  },
  {
    _id: "2",
    placa: "DEF-5678",
    motorista: "Maria Santos",
    carga: "Alimentos",
    empresa: "LogExpress",
    origem: { cidade: "Campinas", endereco: "Rua das Flores, 200" },
    destino: { cidade: "Curitiba", endereco: "Av. Paraná, 300" },
    horarioEntrada: "2025-12-06T09:30:00",
    horarioSaida: null,
    status: TRUCK_STATUS.AGUARDANDO,
  },
  {
    _id: "3",
    placa: "GHI-9012",
    motorista: "Carlos Oliveira",
    carga: "Peças Automotivas",
    empresa: "FastCargo",
    origem: { cidade: "Belo Horizonte", endereco: "Rua Minas, 150" },
    destino: { cidade: "Salvador", endereco: "Av. Bahia, 800" },
    horarioEntrada: "2025-12-06T07:00:00",
    horarioSaida: null,
    status: TRUCK_STATUS.NO_PATIO,
  },
  {
    _id: "4",
    placa: "JKL-3456",
    motorista: "Ana Costa",
    carga: "Móveis",
    empresa: "TransBrasil",
    origem: { cidade: "Recife", endereco: "Rua do Sol, 50" },
    destino: { cidade: "Fortaleza", endereco: "Av. Beira Mar, 1200" },
    horarioEntrada: "2025-12-05T14:00:00",
    horarioSaida: "2025-12-06T10:00:00",
    status: TRUCK_STATUS.FINALIZADO,
  },
  {
    _id: "5",
    placa: "MNO-7890",
    motorista: "Pedro Lima",
    carga: "Medicamentos",
    empresa: "FarmLog",
    origem: { cidade: "Porto Alegre", endereco: "Av. Central, 700" },
    destino: { cidade: "Florianópolis", endereco: "Rua das Palmeiras, 100" },
    horarioEntrada: "2025-12-06T06:00:00",
    horarioSaida: null,
    status: TRUCK_STATUS.CANCELADO,
  },
];

/**
 * Converte status do banco para texto amigável
 * Usado na tabela e no filtro
 */
const formatStatus = (status: string): string => {
  const labels: Record<string, string> = {
    [TRUCK_STATUS.AGUARDANDO]: "Aguardando",
    [TRUCK_STATUS.EM_TRANSITO]: "Em Trânsito",
    [TRUCK_STATUS.ENTREGUE]: "Entregue",
    [TRUCK_STATUS.CANCELADO]: "Cancelado",
    [TRUCK_STATUS.NO_PATIO]: "No Pátio",
    [TRUCK_STATUS.FINALIZADO]: "Finalizado",
  };
  return labels[status] || status;
};

/**
 * Define a cor do Badge baseado no status
 * Facilita identificação visual rápida
 */
const getStatusVariant = (status: TruckStatus): "default" | "secondary" | "destructive" | "outline" => {
  const variants: Record<TruckStatus, "default" | "secondary" | "destructive" | "outline"> = {
    [TRUCK_STATUS.AGUARDANDO]: "outline",
    [TRUCK_STATUS.EM_TRANSITO]: "default",
    [TRUCK_STATUS.ENTREGUE]: "secondary",
    [TRUCK_STATUS.CANCELADO]: "destructive",
    [TRUCK_STATUS.NO_PATIO]: "outline",
    [TRUCK_STATUS.FINALIZADO]: "secondary",
  };
  return variants[status];
};

export function Dashboard() {
  /**
   * Estado do filtro de status
   * null = mostra todos os caminhões
   * TruckStatus = mostra apenas caminhões com esse status
   */
  const [statusFilter, setStatusFilter] = useState<TruckStatus | null>(null);

  /**
   * Aplica o filtro na lista de caminhões
   * Se não tem filtro ativo, retorna todos
   */
  const filteredTrucks = statusFilter
    ? mockTrucks.filter((truck) => truck.status === statusFilter)
    : mockTrucks;

  /**
   * Limpa o filtro e volta a mostrar todos
   */
  const clearFilter = () => setStatusFilter(null);

  /**
   * Handlers de ações (TODO: implementar com API)
   */
  const handleEdit = (truck: Truck) => {
    console.log("Editar caminhão:", truck);
    // TODO: Abrir modal de edição
  };

  const handleDelete = (truck: Truck) => {
    console.log("Excluir caminhão:", truck);
    // TODO: Confirmar e chamar DELETE /api/trucks/:id
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        {/* Header do Card: Título + Ações */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Controle de Caminhões</CardTitle>
            <CardDescription>
              Gerencie os caminhões da sua frota.
            </CardDescription>
          </div>

          {/* Área de ações: Filtro + Novo Caminhão */}
          <div className="flex items-center gap-2">
            
            {/* Botão de Filtro */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {/* Mostra o status selecionado ou "Filtrar" */}
                  {statusFilter ? formatStatus(statusFilter) : "Filtrar"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Opção para mostrar todos */}
                <DropdownMenuItem onClick={clearFilter}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Lista dinâmica de status - vem do TRUCK_STATUS */}
                {Object.values(TRUCK_STATUS).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {formatStatus(status)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botão de adicionar - abre o dialog */}
            <AddTruckDialog />
          </div>
        </CardHeader>

        <CardContent>
          {/* Indicador de filtro ativo */}
          {statusFilter && (
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Mostrando {filteredTrucks.length} de {mockTrucks.length} caminhões
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilter}
                className="h-6 px-2"
              >
                <X className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            </div>
          )}

          {/* Tabela de caminhões */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Carga</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Mensagem quando não há resultados */}
              {filteredTrucks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                  >
                    Nenhum caminhão encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                /* Renderiza cada caminhão */
                filteredTrucks.map((truck) => (
                  <TableRow key={truck._id}>
                    {/* Status com Badge colorido */}
                    <TableCell>
                      <Badge variant={getStatusVariant(truck.status)}>
                        {formatStatus(truck.status)}
                      </Badge>
                    </TableCell>

                    {/* Dados do caminhão */}
                    <TableCell className="font-mono">{truck.placa}</TableCell>
                    <TableCell className="font-medium">{truck.motorista}</TableCell>
                    <TableCell>{truck.empresa}</TableCell>
                    <TableCell>{truck.carga}</TableCell>
                    <TableCell>{truck.origem.cidade}</TableCell>
                    <TableCell>{truck.destino.cidade}</TableCell>

                    {/* Menu de ações */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(truck)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(truck)}
                            className="text-destructive"
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

