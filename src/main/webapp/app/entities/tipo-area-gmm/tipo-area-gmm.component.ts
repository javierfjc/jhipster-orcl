import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { AccountService } from 'app/core';
import { TipoAreaGmmService } from './tipo-area-gmm.service';

@Component({
  selector: 'jhi-tipo-area-gmm',
  templateUrl: './tipo-area-gmm.component.html'
})
export class TipoAreaGmmComponent implements OnInit, OnDestroy {
  tipoAreas: ITipoAreaGmm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoAreaService: TipoAreaGmmService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoAreaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoAreaGmm[]>) => res.ok),
        map((res: HttpResponse<ITipoAreaGmm[]>) => res.body)
      )
      .subscribe(
        (res: ITipoAreaGmm[]) => {
          this.tipoAreas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoAreas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoAreaGmm) {
    return item.id;
  }

  registerChangeInTipoAreas() {
    this.eventSubscriber = this.eventManager.subscribe('tipoAreaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
