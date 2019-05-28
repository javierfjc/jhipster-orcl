import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

export interface ITipoAreaGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  agentes?: IAgentesGmm[];
}

export class TipoAreaGmm implements ITipoAreaGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public descripcion?: string,
    public agentes?: IAgentesGmm[]
  ) {}
}
