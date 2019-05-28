import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { TipoAreaGmmService } from './tipo-area-gmm.service';

@Component({
  selector: 'jhi-tipo-area-gmm-delete-dialog',
  templateUrl: './tipo-area-gmm-delete-dialog.component.html'
})
export class TipoAreaGmmDeleteDialogComponent {
  tipoArea: ITipoAreaGmm;

  constructor(protected tipoAreaService: TipoAreaGmmService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoAreaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoAreaListModification',
        content: 'Deleted an tipoArea'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-area-gmm-delete-popup',
  template: ''
})
export class TipoAreaGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoArea }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoAreaGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoArea = tipoArea;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-area-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-area-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
