import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from './agentes-gmm.service';
import { AgentesGmmComponent } from './agentes-gmm.component';
import { AgentesGmmDetailComponent } from './agentes-gmm-detail.component';
import { AgentesGmmUpdateComponent } from './agentes-gmm-update.component';
import { AgentesGmmDeletePopupComponent } from './agentes-gmm-delete-dialog.component';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

@Injectable({ providedIn: 'root' })
export class AgentesGmmResolve implements Resolve<IAgentesGmm> {
  constructor(private service: AgentesGmmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgentesGmm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AgentesGmm>) => response.ok),
        map((agentes: HttpResponse<AgentesGmm>) => agentes.body)
      );
    }
    return of(new AgentesGmm());
  }
}

export const agentesRoute: Routes = [
  {
    path: '',
    component: AgentesGmmComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterOrclApp.agentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AgentesGmmDetailComponent,
    resolve: {
      agentes: AgentesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.agentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AgentesGmmUpdateComponent,
    resolve: {
      agentes: AgentesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.agentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AgentesGmmUpdateComponent,
    resolve: {
      agentes: AgentesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.agentes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const agentesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AgentesGmmDeletePopupComponent,
    resolve: {
      agentes: AgentesGmmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterOrclApp.agentes.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
