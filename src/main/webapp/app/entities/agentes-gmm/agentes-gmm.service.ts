import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

type EntityResponseType = HttpResponse<IAgentesGmm>;
type EntityArrayResponseType = HttpResponse<IAgentesGmm[]>;

@Injectable({ providedIn: 'root' })
export class AgentesGmmService {
  public resourceUrl = SERVER_API_URL + 'api/agentes';

  constructor(protected http: HttpClient) {}

  create(agentes: IAgentesGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agentes);
    return this.http
      .post<IAgentesGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(agentes: IAgentesGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agentes);
    return this.http
      .put<IAgentesGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAgentesGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAgentesGmm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(agentes: IAgentesGmm): IAgentesGmm {
    const copy: IAgentesGmm = Object.assign({}, agentes, {
      fechaAlta: agentes.fechaAlta != null && agentes.fechaAlta.isValid() ? agentes.fechaAlta.format(DATE_FORMAT) : null,
      fechaEstado: agentes.fechaEstado != null && agentes.fechaEstado.isValid() ? agentes.fechaEstado.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaAlta = res.body.fechaAlta != null ? moment(res.body.fechaAlta) : null;
      res.body.fechaEstado = res.body.fechaEstado != null ? moment(res.body.fechaEstado) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((agentes: IAgentesGmm) => {
        agentes.fechaAlta = agentes.fechaAlta != null ? moment(agentes.fechaAlta) : null;
        agentes.fechaEstado = agentes.fechaEstado != null ? moment(agentes.fechaEstado) : null;
      });
    }
    return res;
  }
}
