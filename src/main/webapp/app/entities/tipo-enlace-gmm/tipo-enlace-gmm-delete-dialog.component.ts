import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';
import { TipoEnlaceGmmService } from './tipo-enlace-gmm.service';

@Component({
  selector: 'jhi-tipo-enlace-gmm-delete-dialog',
  templateUrl: './tipo-enlace-gmm-delete-dialog.component.html'
})
export class TipoEnlaceGmmDeleteDialogComponent {
  tipoEnlace: ITipoEnlaceGmm;

  constructor(
    protected tipoEnlaceService: TipoEnlaceGmmService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoEnlaceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoEnlaceListModification',
        content: 'Deleted an tipoEnlace'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-enlace-gmm-delete-popup',
  template: ''
})
export class TipoEnlaceGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoEnlace }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoEnlaceGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoEnlace = tipoEnlace;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-enlace-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-enlace-gmm', { outlets: { popup: null } }]);
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
