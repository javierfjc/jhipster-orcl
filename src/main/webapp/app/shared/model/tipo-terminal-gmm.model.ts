import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

export const enum DominioSiNo {
  SI = 'SI',
  NO = 'NO'
}

export const enum TipoTerminalTipoImporte {
  PORCENTAJE = 'PORCENTAJE',
  IMPORTE = 'IMPORTE'
}

export interface ITipoTerminalGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  descripcion?: string;
  pathEnvio?: string;
  pathRecibir?: string;
  contador?: number;
  controlVisitas?: DominioSiNo;
  controlCobros?: DominioSiNo;
  tipoImporteDto1?: TipoTerminalTipoImporte;
  tipoImporteDto2?: TipoTerminalTipoImporte;
  tipoImporteDto3?: TipoTerminalTipoImporte;
  agentes?: IAgentesGmm[];
  tipoEnlaceId?: number;
}

export class TipoTerminalGmm implements ITipoTerminalGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public descripcion?: string,
    public pathEnvio?: string,
    public pathRecibir?: string,
    public contador?: number,
    public controlVisitas?: DominioSiNo,
    public controlCobros?: DominioSiNo,
    public tipoImporteDto1?: TipoTerminalTipoImporte,
    public tipoImporteDto2?: TipoTerminalTipoImporte,
    public tipoImporteDto3?: TipoTerminalTipoImporte,
    public agentes?: IAgentesGmm[],
    public tipoEnlaceId?: number
  ) {}
}
