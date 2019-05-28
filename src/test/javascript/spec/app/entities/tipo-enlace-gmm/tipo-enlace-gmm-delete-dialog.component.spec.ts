/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoEnlaceGmmDeleteDialogComponent } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm-delete-dialog.component';
import { TipoEnlaceGmmService } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm.service';

describe('Component Tests', () => {
  describe('TipoEnlaceGmm Management Delete Component', () => {
    let comp: TipoEnlaceGmmDeleteDialogComponent;
    let fixture: ComponentFixture<TipoEnlaceGmmDeleteDialogComponent>;
    let service: TipoEnlaceGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoEnlaceGmmDeleteDialogComponent]
      })
        .overrideTemplate(TipoEnlaceGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoEnlaceGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoEnlaceGmmService);
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
