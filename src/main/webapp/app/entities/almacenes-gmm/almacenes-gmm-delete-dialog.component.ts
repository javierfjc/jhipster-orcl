import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AlmacenesGmmService } from './almacenes-gmm.service';

@Component({
  selector: 'jhi-almacenes-gmm-delete-dialog',
  templateUrl: './almacenes-gmm-delete-dialog.component.html'
})
export class AlmacenesGmmDeleteDialogComponent {
  almacenes: IAlmacenesGmm;

  constructor(
    protected almacenesService: AlmacenesGmmService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.almacenesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'almacenesListModification',
        content: 'Deleted an almacenes'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-almacenes-gmm-delete-popup',
  template: ''
})
export class AlmacenesGmmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ almacenes }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlmacenesGmmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.almacenes = almacenes;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/almacenes-gmm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/almacenes-gmm', { outlets: { popup: null } }]);
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
