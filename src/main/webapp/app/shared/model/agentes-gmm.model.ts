import { Moment } from 'moment';
import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

export const enum DominioSiNo {
  SI = 'SI',
  NO = 'NO'
}

export interface IAgentesGmm {
  id?: number;
  codigo?: string;
  descripcion?: string;
  fechaAlta?: Moment;
  estado?: string;
  fechaEstado?: Moment;
  tpNumero?: string;
  tpRegalos?: DominioSiNo;
  tipoTerminals?: ITipoTerminalGmm[];
  tipoAreas?: ITipoAreaGmm[];
  tipoAgentes?: ITipoAgenteGmm[];
  empresas?: IEmpresasGmm[];
  almacens?: IAlmacenesGmm[];
}

export class AgentesGmm implements IAgentesGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public descripcion?: string,
    public fechaAlta?: Moment,
    public estado?: string,
    public fechaEstado?: Moment,
    public tpNumero?: string,
    public tpRegalos?: DominioSiNo,
    public tipoTerminals?: ITipoTerminalGmm[],
    public tipoAreas?: ITipoAreaGmm[],
    public tipoAgentes?: ITipoAgenteGmm[],
    public empresas?: IEmpresasGmm[],
    public almacens?: IAlmacenesGmm[]
  ) {}
}
