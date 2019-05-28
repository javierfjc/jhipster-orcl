import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

export interface ITipoAgenteGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  agentes?: IAgentesGmm[];
}

export class TipoAgenteGmm implements ITipoAgenteGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public descripcion?: string,
    public agentes?: IAgentesGmm[]
  ) {}
}
