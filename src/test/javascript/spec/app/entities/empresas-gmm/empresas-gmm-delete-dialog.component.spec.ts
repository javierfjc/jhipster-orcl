/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { EmpresasGmmDeleteDialogComponent } from 'app/entities/empresas-gmm/empresas-gmm-delete-dialog.component';
import { EmpresasGmmService } from 'app/entities/empresas-gmm/empresas-gmm.service';

describe('Component Tests', () => {
  describe('EmpresasGmm Management Delete Component', () => {
    let comp: EmpresasGmmDeleteDialogComponent;
    let fixture: ComponentFixture<EmpresasGmmDeleteDialogComponent>;
    let service: EmpresasGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [EmpresasGmmDeleteDialogComponent]
      })
        .overrideTemplate(EmpresasGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmpresasGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmpresasGmmService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
