import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { AccountService } from 'app/core';
import { TipoAgenteGmmService } from './tipo-agente-gmm.service';

@Component({
  selector: 'jhi-tipo-agente-gmm',
  templateUrl: './tipo-agente-gmm.component.html'
})
export class TipoAgenteGmmComponent implements OnInit, OnDestroy {
  tipoAgentes: ITipoAgenteGmm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoAgenteService: TipoAgenteGmmService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoAgenteService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoAgenteGmm[]>) => res.ok),
        map((res: HttpResponse<ITipoAgenteGmm[]>) => res.body)
      )
      .subscribe(
        (res: ITipoAgenteGmm[]) => {
          this.tipoAgentes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoAgentes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoAgenteGmm) {
    return item.id;
  }

  registerChangeInTipoAgentes() {
    this.eventSubscriber = this.eventManager.subscribe('tipoAgenteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
