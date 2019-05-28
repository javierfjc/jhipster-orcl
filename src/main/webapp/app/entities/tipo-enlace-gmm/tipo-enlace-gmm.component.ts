import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';
import { AccountService } from 'app/core';
import { TipoEnlaceGmmService } from './tipo-enlace-gmm.service';

@Component({
  selector: 'jhi-tipo-enlace-gmm',
  templateUrl: './tipo-enlace-gmm.component.html'
})
export class TipoEnlaceGmmComponent implements OnInit, OnDestroy {
  tipoEnlaces: ITipoEnlaceGmm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoEnlaceService: TipoEnlaceGmmService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoEnlaceService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoEnlaceGmm[]>) => res.ok),
        map((res: HttpResponse<ITipoEnlaceGmm[]>) => res.body)
      )
      .subscribe(
        (res: ITipoEnlaceGmm[]) => {
          this.tipoEnlaces = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoEnlaces();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoEnlaceGmm) {
    return item.id;
  }

  registerChangeInTipoEnlaces() {
    this.eventSubscriber = this.eventManager.subscribe('tipoEnlaceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
