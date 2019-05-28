/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAgenteGmmDeleteDialogComponent } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm-delete-dialog.component';
import { TipoAgenteGmmService } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm.service';

describe('Component Tests', () => {
  describe('TipoAgenteGmm Management Delete Component', () => {
    let comp: TipoAgenteGmmDeleteDialogComponent;
    let fixture: ComponentFixture<TipoAgenteGmmDeleteDialogComponent>;
    let service: TipoAgenteGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAgenteGmmDeleteDialogComponent]
      })
        .overrideTemplate(TipoAgenteGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAgenteGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAgenteGmmService);
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
