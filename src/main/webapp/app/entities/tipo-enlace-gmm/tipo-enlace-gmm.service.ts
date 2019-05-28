import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

type EntityResponseType = HttpResponse<ITipoEnlaceGmm>;
type EntityArrayResponseType = HttpResponse<ITipoEnlaceGmm[]>;

@Injectable({ providedIn: 'root' })
export class TipoEnlaceGmmService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-enlaces';

  constructor(protected http: HttpClient) {}

  create(tipoEnlace: ITipoEnlaceGmm): Observable<EntityResponseType> {
    return this.http.post<ITipoEnlaceGmm>(this.resourceUrl, tipoEnlace, { observe: 'response' });
  }

  update(tipoEnlace: ITipoEnlaceGmm): Observable<EntityResponseType> {
    return this.http.put<ITipoEnlaceGmm>(this.resourceUrl, tipoEnlace, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoEnlaceGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoEnlaceGmm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
