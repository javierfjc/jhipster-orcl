import { Moment } from 'moment';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

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
  agentes?: IAgentesGmm[];
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
    public agentes?: IAgentesGmm[]
  ) {}
}
