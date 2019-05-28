import { Moment } from 'moment';

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
  tipoTerminalId?: number;
  tipoAreaId?: number;
  tipoAgenteId?: number;
  empresaId?: number;
  almacenId?: number;
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
    public tipoTerminalId?: number,
    public tipoAreaId?: number,
    public tipoAgenteId?: number,
    public empresaId?: number,
    public almacenId?: number
  ) {}
}
