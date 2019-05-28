import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

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
  tipoEnlaces?: ITipoEnlaceGmm[];
  agentesId?: number;
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
    public tipoEnlaces?: ITipoEnlaceGmm[],
    public agentesId?: number
  ) {}
}
