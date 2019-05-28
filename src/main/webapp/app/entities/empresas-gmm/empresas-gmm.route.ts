import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { EmpresasGmmService } from './empresas-gmm.service';
import { EmpresasGmmComponent } from './empresas-gmm.component';
import { EmpresasGmmDetailComponent } from './empresas-gmm-detail.component';
import { EmpresasGmmUpdateComponent } from './empresas-gmm-update.component';
import { EmpresasGmmDeletePopupComponent } from './empresas-gmm-delete-dialog.component';
import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';

@Injectable({ providedIn: 'root' })
export class EmpresasGmmResolve implements Resolve<IEmpresasGmm> {
  constructor(private service: EmpresasGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmpresasGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EmpresasGmm>) => response.ok),
        map((empresas: HttpResponse<EmpresasGmm>) => empresas.body)
      );
    }
    return of(new EmpresasGmm());
  }
}

export const empresasRoute: Routes = [
  {
    path: '',
    component: EmpresasGmmComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterOrclApp.empresas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmpresasGmmDetailComponent,
    resolve: {
      empresas: EmpresasGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.empresas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmpresasGmmUpdateComponent,
    resolve: {
      empresas: EmpresasGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.empresas.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmpresasGmmUpdateComponent,
    resolve: {
      empresas: EmpresasGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.empresas.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const empresasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmpresasGmmDeletePopupComponent,
    resolve: {
      empresas: EmpresasGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.empresas.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
