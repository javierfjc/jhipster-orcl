import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { TipoAreaGmmService } from './tipo-area-gmm.service';
import { TipoAreaGmmComponent } from './tipo-area-gmm.component';
import { TipoAreaGmmDetailComponent } from './tipo-area-gmm-detail.component';
import { TipoAreaGmmUpdateComponent } from './tipo-area-gmm-update.component';
import { TipoAreaGmmDeletePopupComponent } from './tipo-area-gmm-delete-dialog.component';
import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

@Injectable({ providedIn: 'root' })
export class TipoAreaGmmResolve implements Resolve<ITipoAreaGmm> {
  constructor(private service: TipoAreaGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoAreaGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoAreaGmm>) => response.ok),
        map((tipoArea: HttpResponse<TipoAreaGmm>) => tipoArea.body)
      );
    }
    return of(new TipoAreaGmm());
  }
}

export const tipoAreaRoute: Routes = [
  {
    path: '',
    component: TipoAreaGmmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoArea.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoAreaGmmDetailComponent,
    resolve: {
      tipoArea: TipoAreaGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoArea.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoAreaGmmUpdateComponent,
    resolve: {
      tipoArea: TipoAreaGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoArea.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoAreaGmmUpdateComponent,
    resolve: {
      tipoArea: TipoAreaGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoArea.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoAreaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoAreaGmmDeletePopupComponent,
    resolve: {
      tipoArea: TipoAreaGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.tipoArea.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
