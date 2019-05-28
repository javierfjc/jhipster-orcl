import { Moment } from 'moment';

export interface IAlmacenesGmm {
  id?: number;
  codigo?: string;
  titulo?: string;
  fechaAlta?: Moment;
  estado?: string;
  fechaEstado?: Moment;
  agentesId?: number;
}

export class AlmacenesGmm implements IAlmacenesGmm {
  constructor(
    public id?: number,
    public codigo?: string,
    public titulo?: string,
    public fechaAlta?: Moment,
    public estado?: string,
    public fechaEstado?: Moment,
    public agentesId?: number
  ) {}
}
