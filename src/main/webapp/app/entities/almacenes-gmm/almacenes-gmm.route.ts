import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AlmacenesGmmService } from './almacenes-gmm.service';
import { AlmacenesGmmComponent } from './almacenes-gmm.component';
import { AlmacenesGmmDetailComponent } from './almacenes-gmm-detail.component';
import { AlmacenesGmmUpdateComponent } from './almacenes-gmm-update.component';
import { AlmacenesGmmDeletePopupComponent } from './almacenes-gmm-delete-dialog.component';
import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

@Injectable({ providedIn: 'root' })
export class AlmacenesGmmResolve implements Resolve<IAlmacenesGmm> {
  constructor(private service: AlmacenesGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlmacenesGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AlmacenesGmm>) => response.ok),
        map((almacenes: HttpResponse<AlmacenesGmm>) => almacenes.body)
      );
    }
    return of(new AlmacenesGmm());
  }
}

export const almacenesRoute: Routes = [
  {
    path: '',
    component: AlmacenesGmmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.almacenes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlmacenesGmmDetailComponent,
    resolve: {
      almacenes: AlmacenesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.almacenes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlmacenesGmmUpdateComponent,
    resolve: {
      almacenes: AlmacenesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.almacenes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlmacenesGmmUpdateComponent,
    resolve: {
      almacenes: AlmacenesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.almacenes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const almacenesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlmacenesGmmDeletePopupComponent,
    resolve: {
      almacenes: AlmacenesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.almacenes.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
