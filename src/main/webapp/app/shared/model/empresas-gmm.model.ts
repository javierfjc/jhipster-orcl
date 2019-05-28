import { Moment } from 'moment';

export interface IEmpresasGmm {
  id?: number;
  codigo?: string;
  descripcion?: string;
  titulo?: string;
  cif?: string;
  fechaAlta?: Moment;
  estado?: string;
  fechaEstado?: Moment;
  exclusiva?: string;
  agentesId?: number;
}

export class EmpresasGmm implements IEmpresasGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public descripcion?: string,
    public titulo?: string,
    public cif?: string,
    public fechaAlta?: Moment,
    public estado?: string,
    public fechaEstado?: Moment,
    public exclusiva?: string,
    public agentesId?: number
  ) {}
}
