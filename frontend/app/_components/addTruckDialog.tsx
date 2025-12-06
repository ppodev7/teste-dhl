// Componente dedicado para o modal de adição de um novo caminhão.
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

export function AddTruckDialog() {
  return (
    <Dialog>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="empresa" className="text-right">Empresa</Label>
            <Input id="empresa" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motorista" className="text-right">Motorista</Label>
            <Input id="motorista" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placa" className="text-right">Placa</Label>
            <Input id="placa" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origem" className="text-right">Origem</Label>
            <Input id="origem" placeholder="Cidade, Estado" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destino" className="text-right">Destino</Label>
            <Input id="destino" placeholder="Cidade, Estado" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              
                <SelectContent>
                  <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
                  <SelectItem value="NO_PATIO">No Pátio</SelectItem>
                  <SelectItem value="EM_TRANSITO">Em Trânsito</SelectItem>
                  <SelectItem value="ENTREGUE">Entregue</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chegada" className="text-right">Chegada</Label>
            <Input id="chegada" type="datetime-local" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="saida" className="text-right">Saída</Label>
            <Input id="saida" type="datetime-local" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}