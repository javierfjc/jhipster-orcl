export interface ITipoAreaGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  agentesId?: number;
}

export class TipoAreaGmm implements ITipoAreaGmm {
  constructor(public id?: number, public codigo?: string, public titulo?: string, public descripcion?: string, public agentesId?: number) {}
}
