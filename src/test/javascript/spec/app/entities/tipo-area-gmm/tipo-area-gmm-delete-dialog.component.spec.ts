/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAreaGmmDeleteDialogComponent } from 'app/entities/tipo-area-gmm/tipo-area-gmm-delete-dialog.component';
import { TipoAreaGmmService } from 'app/entities/tipo-area-gmm/tipo-area-gmm.service';

describe('Component Tests', () => {
  describe('TipoAreaGmm Management Delete Component', () => {
    let comp: TipoAreaGmmDeleteDialogComponent;
    let fixture: ComponentFixture<TipoAreaGmmDeleteDialogComponent>;
    let service: TipoAreaGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAreaGmmDeleteDialogComponent]
      })
        .overrideTemplate(TipoAreaGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAreaGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAreaGmmService);
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
