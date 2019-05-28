import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { TipoAgenteGmmService } from './tipo-agente-gmm.service';

@Component({
  selector: 'jhi-tipo-agente-gmm-delete-dialog',
  templateUrl: './tipo-agente-gmm-delete-dialog.component.html'
})
export class TipoAgenteGmmDeleteDialogComponent {
  tipoAgente: ITipoAgenteGmm;

  constructor(
    protected tipoAgenteService: TipoAgenteGmmService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoAgenteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoAgenteListModification',
        content: 'Deleted an tipoAgente'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-agente-gmm-delete-popup',
  template: ''
})
export class TipoAgenteGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoAgente }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoAgenteGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoAgente = tipoAgente;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-agente-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-agente-gmm', { outlets: { popup: null } }]);
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
