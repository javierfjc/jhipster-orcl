import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';

type EntityResponseType = HttpResponse<IEmpresasGmm>;
type EntityArrayResponseType = HttpResponse<IEmpresasGmm[]>;

@Injectable({ providedIn: 'root' })
export class EmpresasGmmService {
  public resourceUrl = SERVER_API_URL + 'api/empresas';

  constructor(protected http: HttpClient) {}

  create(empresas: IEmpresasGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empresas);
    return this.http
      .post<IEmpresasGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(empresas: IEmpresasGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empresas);
    return this.http
      .put<IEmpresasGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmpresasGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmpresasGmm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(empresas: IEmpresasGmm): IEmpresasGmm {
    const copy: IEmpresasGmm = Object.assign({}, empresas, {
      fechaAlta: empresas.fechaAlta != null && empresas.fechaAlta.isValid() ? empresas.fechaAlta.format(DATE_FORMAT) : null,
      fechaEstado: empresas.fechaEstado != null && empresas.fechaEstado.isValid() ? empresas.fechaEstado.format(DATE_FORMAT) : null
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
      res.body.forEach((empresas: IEmpresasGmm) => {
        empresas.fechaAlta = empresas.fechaAlta != null ? moment(empresas.fechaAlta) : null;
        empresas.fechaEstado = empresas.fechaEstado != null ? moment(empresas.fechaEstado) : null;
      });
    }
    return res;
  }
}
