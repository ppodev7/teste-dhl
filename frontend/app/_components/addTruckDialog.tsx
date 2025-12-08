"use client";

/**
 * TruckDialog - Formulário para criar OU editar caminhão
 * INTEGRADO COM API
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { TRUCK_STATUS, TruckStatus, Truck } from "./types/truck";
import { createTruck, updateTruck } from "./api/truck-service";

interface TruckDialogProps {
  onSuccess?: () => void;
  truckToEdit?: Truck;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const formatStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    AGUARDANDO: "Aguardando",
    EM_TRANSITO: "Em Trânsito",
    ENTREGUE: "Entregue",
    CANCELADO: "Cancelado",
    NO_PATIO: "No Pátio",
    FINALIZADO: "Finalizado",
  };
  return labels[status] || status;
};

const emptyForm = {
  empresa: "",
  motorista: "",
  placa: "",
  carga: "",
  origemCidade: "",
  origemEndereco: "",
  destinoCidade: "",
  destinoEndereco: "",
  dataEntrada: "",
  horaEntrada: "",
  dataSaida: "",
  horaSaida: "",
  status: TRUCK_STATUS.AGUARDANDO as TruckStatus,
};

export function AddTruckDialog({ onSuccess, truckToEdit, open: externalOpen, onOpenChange }: TruckDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const isEditMode = !!truckToEdit;

  // Função auxiliar para converter Date para string de data (YYYY-MM-DD)
  const dateToString = (date: Date | string | null | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  // Função auxiliar para converter Date para string de hora (HH:mm)
  const timeToString = (date: Date | string | null | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toTimeString().slice(0, 5);
  };

  // Preenche form quando editar
  useEffect(() => {
    if (truckToEdit) {
      setForm({
        empresa: truckToEdit.empresa,
        motorista: truckToEdit.motorista,
        placa: truckToEdit.placa,
        carga: truckToEdit.carga,
        origemCidade: truckToEdit.origem.cidade,
        origemEndereco: truckToEdit.origem.endereco,
        destinoCidade: truckToEdit.destino.cidade,
        destinoEndereco: truckToEdit.destino.endereco,
        dataEntrada: dateToString(truckToEdit.horarioEntrada),
        horaEntrada: timeToString(truckToEdit.horarioEntrada),
        dataSaida: dateToString(truckToEdit.horarioSaida),
        horaSaida: timeToString(truckToEdit.horarioSaida),
        status: truckToEdit.status,
      });
    } else {
      // Define data e hora atual como padrão para novo caminhão
      const now = new Date();
      setForm({
        ...emptyForm,
        dataEntrada: dateToString(now),
        horaEntrada: timeToString(now),
      });
    }
  }, [truckToEdit]);

  const handleChange = (field: string, value: string) => {
    // Validação para campos de data - garante que o ano tenha 4 dígitos
    if (field === "dataEntrada" || field === "dataSaida") {
      if (value) {
        const year = value.split("-")[0];
        if (year && year.length !== 4) {
          alert("O ano deve ter 4 dígitos (ex: 2024)");
          return;
        }
      }
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.placa || !form.motorista || !form.empresa || !form.carga) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    // Validação do ano - garante que tenha 4 dígitos
    if (form.dataEntrada) {
      const year = form.dataEntrada.split("-")[0];
      if (year.length !== 4) {
        alert("A data de entrada deve ter um ano com 4 dígitos (ex: 2024)");
        return;
      }
    }

    if (form.dataSaida) {
      const year = form.dataSaida.split("-")[0];
      if (year.length !== 4) {
        alert("A data de saída deve ter um ano com 4 dígitos (ex: 2024)");
        return;
      }
    }

    // Converte data e hora para Date
    let horarioEntrada: Date | undefined;
    if (form.dataEntrada && form.horaEntrada) {
      const [year, month, day] = form.dataEntrada.split("-");
      if (year.length !== 4) {
        alert("O ano deve ter 4 dígitos");
        return;
      }
      const [hour, minute] = form.horaEntrada.split(":");
      horarioEntrada = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    } else {
      // Se não preenchido, usa data/hora atual
      horarioEntrada = new Date();
    }

    let horarioSaida: Date | null = null;
    if (form.dataSaida && form.horaSaida) {
      const [year, month, day] = form.dataSaida.split("-");
      if (year.length !== 4) {
        alert("O ano deve ter 4 dígitos");
        return;
      }
      const [hour, minute] = form.horaSaida.split(":");
      horarioSaida = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    }

    const truckData: any = {
      empresa: form.empresa,
      motorista: form.motorista,
      placa: form.placa,
      carga: form.carga,
      origem: {
        cidade: form.origemCidade,
        endereco: form.origemEndereco,
      },
      destino: {
        cidade: form.destinoCidade,
        endereco: form.destinoEndereco,
      },
      status: form.status,
      horarioEntrada: horarioEntrada.toISOString(),
    };

    // Adiciona horário de saída apenas se foi preenchido
    if (horarioSaida) {
      truckData.horarioSaida = horarioSaida.toISOString();
    } else {
      truckData.horarioSaida = null;
    }

    try {
      setSaving(true);

      if (isEditMode && truckToEdit) {
        await updateTruck(truckToEdit._id, truckData);
      } else {
        await createTruck(truckData);
      }

      resetForm();
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      alert(isEditMode ? "Erro ao atualizar caminhão" : "Erro ao criar caminhão");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const dialogContent = (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? "Editar Caminhão" : "Adicionar Novo Caminhão"}
        </DialogTitle>
        <DialogDescription>
          {isEditMode
            ? "Altere as informações do caminhão."
            : "Preencha as informações abaixo para registrar um novo caminhão."}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="empresa" className="text-right">Empresa *</Label>
          <Input
            id="empresa"
            value={form.empresa}
            onChange={(e) => handleChange("empresa", e.target.value)}
            className="col-span-3"
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="motorista" className="text-right">Motorista *</Label>
          <Input
            id="motorista"
            value={form.motorista}
            onChange={(e) => handleChange("motorista", e.target.value)}
            className="col-span-3"
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="placa" className="text-right">Placa *</Label>
          <Input
            id="placa"
            value={form.placa}
            onChange={(e) => handleChange("placa", e.target.value)}
            className="col-span-3"
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="carga" className="text-right">Carga *</Label>
          <Input
            id="carga"
            value={form.carga}
            onChange={(e) => handleChange("carga", e.target.value)}
            placeholder="Tipo de carga"
            className="col-span-3"
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Origem</Label>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <Input
              value={form.origemCidade}
              onChange={(e) => handleChange("origemCidade", e.target.value)}
              placeholder="Cidade"
              disabled={saving}
            />
            <Input
              value={form.origemEndereco}
              onChange={(e) => handleChange("origemEndereco", e.target.value)}
              placeholder="Endereço"
              disabled={saving}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Destino</Label>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <Input
              value={form.destinoCidade}
              onChange={(e) => handleChange("destinoCidade", e.target.value)}
              placeholder="Cidade"
              disabled={saving}
            />
            <Input
              value={form.destinoEndereco}
              onChange={(e) => handleChange("destinoEndereco", e.target.value)}
              placeholder="Endereço"
              disabled={saving}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Data/Horário de Entrada</Label>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={form.dataEntrada}
              onChange={(e) => {
                const value = e.target.value;
                // Valida se o ano tem 4 dígitos
                if (value) {
                  const year = value.split("-")[0];
                  if (year && year.length === 4) {
                    handleChange("dataEntrada", value);
                  } else if (year && year.length > 0) {
                    alert("O ano deve ter exatamente 4 dígitos (ex: 2024)");
                  }
                } else {
                  handleChange("dataEntrada", value);
                }
              }}
              disabled={saving}
              min="1900-01-01"
              max="9999-12-31"
            />
            <Input
              type="time"
              value={form.horaEntrada}
              onChange={(e) => handleChange("horaEntrada", e.target.value)}
              disabled={saving}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Data/Horário de Saída</Label>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={form.dataSaida}
              onChange={(e) => {
                const value = e.target.value;
                // Valida se o ano tem 4 dígitos
                if (value) {
                  const year = value.split("-")[0];
                  if (year && year.length === 4) {
                    handleChange("dataSaida", value);
                  } else if (year && year.length > 0) {
                    alert("O ano deve ter exatamente 4 dígitos (ex: 2024)");
                  }
                } else {
                  handleChange("dataSaida", value);
                }
              }}
              disabled={saving}
              placeholder="Opcional"
              min="1900-01-01"
              max="9999-12-31"
            />
            <Input
              type="time"
              value={form.horaSaida}
              onChange={(e) => handleChange("horaSaida", e.target.value)}
              disabled={saving}
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Status</Label>
          <Select
            value={form.status}
            onValueChange={(value) => handleChange("status", value)}
            disabled={saving}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TRUCK_STATUS).map((status) => (
                <SelectItem key={status} value={status}>
                  {formatStatusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {saving ? "Salvando..." : isEditMode ? "Atualizar" : "Salvar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  if (isEditMode) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Caminhão</Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
