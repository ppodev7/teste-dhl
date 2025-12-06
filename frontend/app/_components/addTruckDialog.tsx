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
  status: TRUCK_STATUS.AGUARDANDO as TruckStatus,
};

export function AddTruckDialog({ onSuccess, truckToEdit, open: externalOpen, onOpenChange }: TruckDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const isEditMode = !!truckToEdit;

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
