/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoTerminalGmmDeleteDialogComponent } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm-delete-dialog.component';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm.service';

describe('Component Tests', () => {
  describe('TipoTerminalGmm Management Delete Component', () => {
    let comp: TipoTerminalGmmDeleteDialogComponent;
    let fixture: ComponentFixture<TipoTerminalGmmDeleteDialogComponent>;
    let service: TipoTerminalGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoTerminalGmmDeleteDialogComponent]
      })
        .overrideTemplate(TipoTerminalGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoTerminalGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTerminalGmmService);
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
