"use client";

/**
 * Dashboard - Tela principal de controle de caminhões
 * INTEGRADO COM API
 */

import { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { MoreHorizontal, Filter, X, Loader2, MapPin, Building2, User, Package, Clock } from "lucide-react";
import { AddTruckDialog } from "./addTruckDialog";
import { TRUCK_STATUS, TruckStatus, Truck } from "./types/truck";
import { getTrucks, deleteTruck } from "./api/truck-service";

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

// Formata data para exibição completa (usado no dialog "Ver Mais")
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Formata data e hora de forma compacta para a tabela
const formatDateTimeCompact = (dateString: string | null | undefined): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function Dashboard() {
  // Estados principais
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TruckStatus | null>(null);

  // Estados para edição
  const [editingTruck, setEditingTruck] = useState<Truck | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Estado para "Ver Mais"
  const [viewingTruck, setViewingTruck] = useState<Truck | null>(null);

  // Busca caminhões da API
  const fetchTrucks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrucks();
      setTrucks(data);
    } catch (err) {
      setError("Erro ao carregar caminhões. Verifique se o backend está rodando.");
      console.error("Erro ao buscar caminhões:", err);
    } finally {
      setLoading(false);
    }
  };

  // Carrega dados ao montar o componente
  useEffect(() => {
    fetchTrucks();
  }, []);

  // Aplica filtro
  const filteredTrucks = statusFilter
    ? trucks.filter((truck) => truck.status === statusFilter)
    : trucks;

  const clearFilter = () => setStatusFilter(null);

  // Excluir caminhão
  const handleDelete = async (truck: Truck) => {
    if (!confirm(`Excluir caminhão ${truck.placa}?`)) return;

    try {
      await deleteTruck(truck._id);
      fetchTrucks();
    } catch (err) {
      alert("Erro ao excluir caminhão");
      console.error(err);
    }
  };

  // Abrir edição
  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setEditDialogOpen(true);
  };

  // Fechar edição
  const handleEditDialogClose = (open: boolean) => {
    setEditDialogOpen(open);
    if (!open) {
      setEditingTruck(undefined);
    }
  };

  // Callback após criar/editar
  const handleSuccess = () => {
    fetchTrucks();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Controle de Caminhões</CardTitle>
            <CardDescription>
              Gerencie os caminhões da sua frota.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {/* Filtro */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter ? formatStatus(statusFilter) : "Filtrar"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilter}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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

            {/* Botão de adicionar */}
            <AddTruckDialog onSuccess={handleSuccess} />
          </div>
        </CardHeader>

        <CardContent>
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Carregando...</span>
            </div>
          )}

          {/* Erro */}
          {error && (
            <div className="text-center py-8 text-destructive">
              <p>{error}</p>
              <Button variant="outline" onClick={fetchTrucks} className="mt-4">
                Tentar novamente
              </Button>
            </div>
          )}

          {/* Dados carregados */}
          {!loading && !error && (
            <>
              {statusFilter && (
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    Mostrando {filteredTrucks.length} de {trucks.length} caminhões
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilter} className="h-6 px-2">
                    <X className="h-3 w-3 mr-1" />
                    Limpar
                  </Button>
                </div>
              )}

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
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>
                      <span className="sr-only">Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredTrucks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                        Nenhum caminhão encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrucks.map((truck) => (
                      <TableRow key={truck._id}>
                        <TableCell>
                          <Badge variant={getStatusVariant(truck.status)}>
                            {formatStatus(truck.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{truck.placa}</TableCell>
                        <TableCell className="font-medium">{truck.motorista}</TableCell>
                        <TableCell>{truck.empresa}</TableCell>
                        <TableCell>{truck.carga}</TableCell>
                        <TableCell>{truck.origem.cidade}</TableCell>
                        <TableCell>{truck.destino.cidade}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs">{formatDateTimeCompact(truck.horarioEntrada)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs">{formatDateTimeCompact(truck.horarioSaida)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setViewingTruck(truck)}>
                                Ver Mais
                              </DropdownMenuItem>
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog de edição */}
      {editingTruck && (
        <AddTruckDialog
          truckToEdit={editingTruck}
          open={editDialogOpen}
          onOpenChange={handleEditDialogClose}
          onSuccess={handleSuccess}
        />
      )}

      {/* Dialog "Ver Mais" - Detalhes do caminhão */}
      <Dialog open={!!viewingTruck} onOpenChange={(open) => !open && setViewingTruck(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono">{viewingTruck?.placa}</span>
              {viewingTruck && (
                <Badge variant={getStatusVariant(viewingTruck.status)}>
                  {formatStatus(viewingTruck.status)}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Detalhes completos do caminhão
            </DialogDescription>
          </DialogHeader>

          {viewingTruck && (
            <div className="grid gap-4 py-4">
              {/* Motorista e Empresa */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Motorista</p>
                    <p className="font-medium">{viewingTruck.motorista}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Empresa</p>
                    <p className="font-medium">{viewingTruck.empresa}</p>
                  </div>
                </div>
              </div>

              {/* Carga */}
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Carga</p>
                  <p className="font-medium">{viewingTruck.carga}</p>
                </div>
              </div>

              {/* Origem */}
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-4 w-4 mt-0.5 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Origem</p>
                  <p className="font-medium">{viewingTruck.origem.cidade}</p>
                  <p className="text-sm text-muted-foreground">{viewingTruck.origem.endereco}</p>
                </div>
              </div>

              {/* Destino */}
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-4 w-4 mt-0.5 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Destino</p>
                  <p className="font-medium">{viewingTruck.destino.cidade}</p>
                  <p className="text-sm text-muted-foreground">{viewingTruck.destino.endereco}</p>
                </div>
              </div>

              {/* Horários */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Entrada</p>
                    <p className="text-sm">{formatDate(viewingTruck.horarioEntrada)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Saída</p>
                    <p className="text-sm">{formatDate(viewingTruck.horarioSaida)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
