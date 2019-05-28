import { Moment } from 'moment';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

export interface IAlmacenesGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  fechaAlta?: Moment;
  estado?: string;
  fechaEstado?: Moment;
  agentes?: IAgentesGmm[];
}

export class AlmacenesGmm implements IAlmacenesGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public fechaAlta?: Moment,
    public estado?: string,
    public fechaEstado?: Moment,
    public agentes?: IAgentesGmm[]
  ) {}
}
