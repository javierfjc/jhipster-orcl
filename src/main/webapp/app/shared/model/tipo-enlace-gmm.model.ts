import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

export interface ITipoEnlaceGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  tipoTerminals?: ITipoTerminalGmm[];
}

export class TipoEnlaceGmm implements ITipoEnlaceGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public descripcion?: string,
    public tipoTerminals?: ITipoTerminalGmm[]
  ) {}
}
