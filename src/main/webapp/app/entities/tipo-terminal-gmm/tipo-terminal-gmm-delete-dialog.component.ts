import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { TipoTerminalGmmService } from './tipo-terminal-gmm.service';

@Component({
  selector: 'jhi-tipo-terminal-gmm-delete-dialog',
  templateUrl: './tipo-terminal-gmm-delete-dialog.component.html'
})
export class TipoTerminalGmmDeleteDialogComponent {
  tipoTerminal: ITipoTerminalGmm;

  constructor(
    protected tipoTerminalService: TipoTerminalGmmService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoTerminalService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoTerminalListModification',
        content: 'Deleted an tipoTerminal'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-terminal-gmm-delete-popup',
  template: ''
})
export class TipoTerminalGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoTerminal }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoTerminalGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoTerminal = tipoTerminal;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-terminal-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-terminal-gmm', { outlets: { popup: null } }]);
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
