import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

type EntityResponseType = HttpResponse<ITipoAreaGmm>;
type EntityArrayResponseType = HttpResponse<ITipoAreaGmm[]>;

@Injectable({ providedIn: 'root' })
export class TipoAreaGmmService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-areas';

  constructor(protected http: HttpClient) {}

  create(tipoArea: ITipoAreaGmm): Observable<EntityResponseType> {
    return this.http.post<ITipoAreaGmm>(this.resourceUrl, tipoArea, { observe: 'response' });
  }

  update(tipoArea: ITipoAreaGmm): Observable<EntityResponseType> {
    return this.http.put<ITipoAreaGmm>(this.resourceUrl, tipoArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoAreaGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAreaGmm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
