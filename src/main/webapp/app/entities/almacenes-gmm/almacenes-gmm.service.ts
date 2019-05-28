import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

type EntityResponseType = HttpResponse<IAlmacenesGmm>;
type EntityArrayResponseType = HttpResponse<IAlmacenesGmm[]>;

@Injectable({ providedIn: 'root' })
export class AlmacenesGmmService {
  public resourceUrl = SERVER_API_URL + 'api/almacenes';

  constructor(protected http: HttpClient) {}

  create(almacenes: IAlmacenesGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(almacenes);
    return this.http
      .post<IAlmacenesGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(almacenes: IAlmacenesGmm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(almacenes);
    return this.http
      .put<IAlmacenesGmm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlmacenesGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlmacenesGmm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(almacenes: IAlmacenesGmm): IAlmacenesGmm {
    const copy: IAlmacenesGmm = Object.assign({}, almacenes, {
      fechaAlta: almacenes.fechaAlta != null && almacenes.fechaAlta.isValid() ? almacenes.fechaAlta.format(DATE_FORMAT) : null,
      fechaEstado: almacenes.fechaEstado != null && almacenes.fechaEstado.isValid() ? almacenes.fechaEstado.format(DATE_FORMAT) : null
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
      res.body.forEach((almacenes: IAlmacenesGmm) => {
        almacenes.fechaAlta = almacenes.fechaAlta != null ? moment(almacenes.fechaAlta) : null;
        almacenes.fechaEstado = almacenes.fechaEstado != null ? moment(almacenes.fechaEstado) : null;
      });
    }
    return res;
  }
}
