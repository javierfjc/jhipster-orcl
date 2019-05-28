export interface ITipoEnlaceGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  tipoTerminalId?: number;
}

export class TipoEnlaceGmm implements ITipoEnlaceGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public descripcion?: string,
    public tipoTerminalId?: number
  ) {}
}
