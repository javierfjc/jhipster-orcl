export interface ITipoAgenteGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  agentesId?: number;
}

export class TipoAgenteGmm implements ITipoAgenteGmm {
  constructor(public id?: number, public codigo?: string, public titulo?: string, public descripcion?: string, public agentesId?: number) {}
}
