import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from './agentes-gmm.service';

@Component({
  selector: 'jhi-agentes-gmm-delete-dialog',
  templateUrl: './agentes-gmm-delete-dialog.component.html'
})
export class AgentesGmmDeleteDialogComponent {
  agentes: IAgentesGmm;

  constructor(protected agentesService: AgentesGmmService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.agentesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'agentesListModification',
        content: 'Deleted an agentes'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-agentes-gmm-delete-popup',
  template: ''
})
export class AgentesGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ agentes }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AgentesGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.agentes = agentes;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/agentes-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/agentes-gmm', { outlets: { popup: null } }]);
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
