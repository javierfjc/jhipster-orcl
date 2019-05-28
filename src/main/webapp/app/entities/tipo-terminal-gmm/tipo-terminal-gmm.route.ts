import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { TipoTerminalGmmService } from './tipo-terminal-gmm.service';
import { TipoTerminalGmmComponent } from './tipo-terminal-gmm.component';
import { TipoTerminalGmmDetailComponent } from './tipo-terminal-gmm-detail.component';
import { TipoTerminalGmmUpdateComponent } from './tipo-terminal-gmm-update.component';
import { TipoTerminalGmmDeletePopupComponent } from './tipo-terminal-gmm-delete-dialog.component';
import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

@Injectable({ providedIn: 'root' })
export class TipoTerminalGmmResolve implements Resolve<ITipoTerminalGmm> {
  constructor(private service: TipoTerminalGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoTerminalGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoTerminalGmm>) => response.ok),
        map((tipoTerminal: HttpResponse<TipoTerminalGmm>) => tipoTerminal.body)
      );
    }
    return of(new TipoTerminalGmm());
  }
}

export const tipoTerminalRoute: Routes = [
  {
    path: '',
    component: TipoTerminalGmmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoTerminal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoTerminalGmmDetailComponent,
    resolve: {
      tipoTerminal: TipoTerminalGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoTerminal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoTerminalGmmUpdateComponent,
    resolve: {
      tipoTerminal: TipoTerminalGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoTerminal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoTerminalGmmUpdateComponent,
    resolve: {
      tipoTerminal: TipoTerminalGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoTerminal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoTerminalPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoTerminalGmmDeletePopupComponent,
    resolve: {
      tipoTerminal: TipoTerminalGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoTerminal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
