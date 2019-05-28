import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { TipoAgenteGmmService } from './tipo-agente-gmm.service';
import { TipoAgenteGmmComponent } from './tipo-agente-gmm.component';
import { TipoAgenteGmmDetailComponent } from './tipo-agente-gmm-detail.component';
import { TipoAgenteGmmUpdateComponent } from './tipo-agente-gmm-update.component';
import { TipoAgenteGmmDeletePopupComponent } from './tipo-agente-gmm-delete-dialog.component';
import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

@Injectable({ providedIn: 'root' })
export class TipoAgenteGmmResolve implements Resolve<ITipoAgenteGmm> {
  constructor(private service: TipoAgenteGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoAgenteGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoAgenteGmm>) => response.ok),
        map((tipoAgente: HttpResponse<TipoAgenteGmm>) => tipoAgente.body)
      );
    }
    return of(new TipoAgenteGmm());
  }
}

export const tipoAgenteRoute: Routes = [
  {
    path: '',
    component: TipoAgenteGmmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoAgente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoAgenteGmmDetailComponent,
    resolve: {
      tipoAgente: TipoAgenteGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoAgente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoAgenteGmmUpdateComponent,
    resolve: {
      tipoAgente: TipoAgenteGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoAgente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoAgenteGmmUpdateComponent,
    resolve: {
      tipoAgente: TipoAgenteGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoAgente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoAgentePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoAgenteGmmDeletePopupComponent,
    resolve: {
      tipoAgente: TipoAgenteGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoAgente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
