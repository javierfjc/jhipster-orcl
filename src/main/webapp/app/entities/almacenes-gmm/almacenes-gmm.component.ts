import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AccountService } from 'app/core';
import { AlmacenesGmmService } from './almacenes-gmm.service';

@Component({
  selector: 'jhi-almacenes-gmm',
  templateUrl: './almacenes-gmm.component.html'
})
export class AlmacenesGmmComponent implements OnInit, OnDestroy {
  almacenes: IAlmacenesGmm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected almacenesService: AlmacenesGmmService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.almacenesService
      .query()
      .pipe(
        filter((res: HttpResponse<IAlmacenesGmm[]>) => res.ok),
        map((res: HttpResponse<IAlmacenesGmm[]>) => res.body)
      )
      .subscribe(
        (res: IAlmacenesGmm[]) => {
          this.almacenes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAlmacenes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAlmacenesGmm) {
    return item.id;
  }

  registerChangeInAlmacenes() {
    this.eventSubscriber = this.eventManager.subscribe('almacenesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
