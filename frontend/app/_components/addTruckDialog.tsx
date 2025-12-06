"use client";


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
  truckToEdit?: Truck;        // Se passar, entra em modo edição
  open?: boolean;              // Controle externo do dialog
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

// Form inicial vazio
const emptyForm = {
  empresa: "",
  motorista: "",
  placa: "",
  carga: "",
  origemCidade: "",
  origemEndereco: "",
  destinoCidade: "",
  destinoEndereco: "",
  status: TRUCK_STATUS.AGUARDANDO as TruckStatus,
};

export function AddTruckDialog({ onSuccess, truckToEdit, open: externalOpen, onOpenChange }: TruckDialogProps) {
  // Se não tem controle externo, usa estado interno
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Modo de operação
  const isEditMode = !!truckToEdit;

  /**
   * Quando truckToEdit muda, preenche o form
   * Isso acontece quando clica em "Editar" no Dashboard
   */
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
        status: truckToEdit.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [truckToEdit]);

  const handleChange = (field: string, value: string) => {
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

    const truckData = {
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
    };

    try {
      setSaving(true);

      if (isEditMode && truckToEdit) {
        // MODO EDIÇÃO: PUT /api/trucks/:id
        await updateTruck(truckToEdit._id, truckData);
      } else {
        // MODO CRIAÇÃO: POST /api/trucks
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

  // Se é modo edição, não mostra o botão trigger (o Dashboard controla)
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
        {/* Empresa */}
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

        {/* Motorista */}
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

        {/* Placa */}
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

        {/* Carga */}
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

        {/* Origem */}
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

        {/* Destino */}
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

        {/* Status */}
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

  // Se é modo edição, o Dialog é controlado externamente (sem trigger)
  if (isEditMode) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {dialogContent}
      </Dialog>
    );
  }

  // Modo criação: tem o botão trigger
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Caminhão</Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
