import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';
import { TipoEnlaceGmmService } from './tipo-enlace-gmm.service';
import { TipoEnlaceGmmComponent } from './tipo-enlace-gmm.component';
import { TipoEnlaceGmmDetailComponent } from './tipo-enlace-gmm-detail.component';
import { TipoEnlaceGmmUpdateComponent } from './tipo-enlace-gmm-update.component';
import { TipoEnlaceGmmDeletePopupComponent } from './tipo-enlace-gmm-delete-dialog.component';
import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

@Injectable({ providedIn: 'root' })
export class TipoEnlaceGmmResolve implements Resolve<ITipoEnlaceGmm> {
  constructor(private service: TipoEnlaceGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoEnlaceGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoEnlaceGmm>) => response.ok),
        map((tipoEnlace: HttpResponse<TipoEnlaceGmm>) => tipoEnlace.body)
      );
    }
    return of(new TipoEnlaceGmm());
  }
}

export const tipoEnlaceRoute: Routes = [
  {
    path: '',
    component: TipoEnlaceGmmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoEnlace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoEnlaceGmmDetailComponent,
    resolve: {
      tipoEnlace: TipoEnlaceGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoEnlace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoEnlaceGmmUpdateComponent,
    resolve: {
      tipoEnlace: TipoEnlaceGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoEnlace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoEnlaceGmmUpdateComponent,
    resolve: {
      tipoEnlace: TipoEnlaceGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoEnlace.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoEnlacePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoEnlaceGmmDeletePopupComponent,
    resolve: {
      tipoEnlace: TipoEnlaceGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoEnlace.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
