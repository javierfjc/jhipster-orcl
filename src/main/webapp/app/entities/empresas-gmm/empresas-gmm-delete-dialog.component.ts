import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { EmpresasGmmService } from './empresas-gmm.service';

@Component({
  selector: 'jhi-empresas-gmm-delete-dialog',
  templateUrl: './empresas-gmm-delete-dialog.component.html'
})
export class EmpresasGmmDeleteDialogComponent {
  empresas: IEmpresasGmm;

  constructor(protected empresasService: EmpresasGmmService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.empresasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'empresasListModification',
        content: 'Deleted an empresas'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-empresas-gmm-delete-popup',
  template: ''
})
export class EmpresasGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ empresas }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EmpresasGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.empresas = empresas;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/empresas-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/empresas-gmm', { outlets: { popup: null } }]);
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
