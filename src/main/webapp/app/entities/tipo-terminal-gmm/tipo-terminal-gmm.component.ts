import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { AccountService } from 'app/core';
import { TipoTerminalGmmService } from './tipo-terminal-gmm.service';

@Component({
  selector: 'jhi-tipo-terminal-gmm',
  templateUrl: './tipo-terminal-gmm.component.html'
})
export class TipoTerminalGmmComponent implements OnInit, OnDestroy {
  tipoTerminals: ITipoTerminalGmm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoTerminalService: TipoTerminalGmmService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoTerminalService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoTerminalGmm[]>) => res.ok),
        map((res: HttpResponse<ITipoTerminalGmm[]>) => res.body)
      )
      .subscribe(
        (res: ITipoTerminalGmm[]) => {
          this.tipoTerminals = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoTerminals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoTerminalGmm) {
    return item.id;
  }

  registerChangeInTipoTerminals() {
    this.eventSubscriber = this.eventManager.subscribe('tipoTerminalListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
