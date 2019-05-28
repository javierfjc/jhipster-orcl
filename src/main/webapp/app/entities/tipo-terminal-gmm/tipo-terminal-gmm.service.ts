import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

type EntityResponseType = HttpResponse<ITipoTerminalGmm>;
type EntityArrayResponseType = HttpResponse<ITipoTerminalGmm[]>;

@Injectable({ providedIn: 'root' })
export class TipoTerminalGmmService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-terminals';

  constructor(protected http: HttpClient) {}

  create(tipoTerminal: ITipoTerminalGmm): Observable<EntityResponseType> {
    return this.http.post<ITipoTerminalGmm>(this.resourceUrl, tipoTerminal, { observe: 'response' });
  }

  update(tipoTerminal: ITipoTerminalGmm): Observable<EntityResponseType> {
    return this.http.put<ITipoTerminalGmm>(this.resourceUrl, tipoTerminal, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoTerminalGmm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoTerminalGmm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
