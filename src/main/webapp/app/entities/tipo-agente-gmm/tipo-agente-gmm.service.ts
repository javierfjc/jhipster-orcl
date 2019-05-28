import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

type EntityResponseType = HttpResponse<ITipoAgenteGmm>;
type EntityArrayResponseType = HttpResponse<ITipoAgenteGmm[]>;

@Injectable({ providedIn: 'root' })
export class TipoAgenteGmmService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-agentes';

  constructor(protected http: HttpClient) {}

  create(tipoAgente: ITipoAgenteGmm): Observable<EntityResponseType> {
    return this.http.post<ITipoAgenteGmm>(this.resourceUrl, tipoAgente, { observe: 'response' });
  }

  update(tipoAgente: ITipoAgenteGmm): Observable<EntityResponseType> {
    return this.http.put<ITipoAgenteGmm>(this.resourceUrl, tipoAgente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoAgenteGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAgenteGmm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
