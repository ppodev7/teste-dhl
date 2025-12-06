"use client";

/**
 * 
 * Responsabilidades:
 * - Renderizar o formulário
 * - Gerenciar estado dos inputs
 * - Emitir dados quando salvar (futuramente chamar API)
 */

import { useState } from "react";
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

// Importa os types - FONTE ÚNICA DE VERDADE
import { TRUCK_STATUS, TruckStatus } from "./types/truck";

/**
 * Formata o status para exibição amigável
 * "EM_TRANSITO" -> "Em Trânsito"
 */
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


export function AddTruckDialog() {
  // Estado do dialog (aberto/fechado)
  const [open, setOpen] = useState(false);

  // Estado do formulário - cada campo tem seu valor
  const [form, setForm] = useState({
    empresa: "",
    motorista: "",
    placa: "",
    carga: "",
    origemCidade: "",
    origemEndereco: "",
    destinoCidade: "",
    destinoEndereco: "",
    status: TRUCK_STATUS.AGUARDANDO as TruckStatus,
    horarioEntrada: "",
    horarioSaida: "",
  });

  /**
   * Atualiza um campo do formulário
   * Usa o nome do campo para saber qual atualizar
   */
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Limpa o formulário
   * Chamado após salvar ou ao fechar
   */
  const resetForm = () => {
    setForm({
      empresa: "",
      motorista: "",
      placa: "",
      carga: "",
      origemCidade: "",
      origemEndereco: "",
      destinoCidade: "",
      destinoEndereco: "",
      status: TRUCK_STATUS.AGUARDANDO,
      horarioEntrada: "",
      horarioSaida: "",
    });
  };

  /**
   * Monta o objeto no formato que o backend espera
   * E futuramente vai chamar a API
   */
  const handleSave = () => {
    // Monta o objeto conforme TruckInput
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
      horarioEntrada: form.horarioEntrada || undefined,
      horarioSaida: form.horarioSaida || undefined,
    };

    // Por enquanto só mostra no console
    // TODO: Chamar API aqui
    console.log("Dados para salvar:", truckData);

    // Fecha o dialog e limpa o form
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Caminhão</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Caminhão</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para registrar um novo caminhão.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Empresa */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="empresa" className="text-right">Empresa</Label>
            <Input
              id="empresa"
              value={form.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Motorista */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motorista" className="text-right">Motorista</Label>
            <Input
              id="motorista"
              value={form.motorista}
              onChange={(e) => handleChange("motorista", e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Placa */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placa" className="text-right">Placa</Label>
            <Input
              id="placa"
              value={form.placa}
              onChange={(e) => handleChange("placa", e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Carga - CAMPO QUE FALTAVA */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="carga" className="text-right">Carga</Label>
            <Input
              id="carga"
              value={form.carga}
              onChange={(e) => handleChange("carga", e.target.value)}
              placeholder="Tipo de carga"
              className="col-span-3"
            />
          </div>

          {/* Origem - Agora com cidade E endereço */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Origem</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                value={form.origemCidade}
                onChange={(e) => handleChange("origemCidade", e.target.value)}
                placeholder="Cidade"
              />
              <Input
                value={form.origemEndereco}
                onChange={(e) => handleChange("origemEndereco", e.target.value)}
                placeholder="Endereço"
              />
            </div>
          </div>

          {/* Destino - Agora com cidade E endereço */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Destino</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                value={form.destinoCidade}
                onChange={(e) => handleChange("destinoCidade", e.target.value)}
                placeholder="Cidade"
              />
              <Input
                value={form.destinoEndereco}
                onChange={(e) => handleChange("destinoEndereco", e.target.value)}
                placeholder="Endereço"
              />
            </div>
          </div>

          {/* Status - Agora usa TRUCK_STATUS do types */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {/* Loop automático - se adicionar status no types, aparece aqui */}
                {Object.values(TRUCK_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Horário Entrada */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chegada" className="text-right">Chegada</Label>
            <Input
              id="chegada"
              type="datetime-local"
              value={form.horarioEntrada}
              onChange={(e) => handleChange("horarioEntrada", e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Horário Saída */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="saida" className="text-right">Saída</Label>
            <Input
              id="saida"
              type="datetime-local"
              value={form.horarioSaida}
              onChange={(e) => handleChange("horarioSaida", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
