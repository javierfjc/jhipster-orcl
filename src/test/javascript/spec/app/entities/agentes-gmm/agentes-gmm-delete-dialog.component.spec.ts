/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AgentesGmmDeleteDialogComponent } from 'app/entities/agentes-gmm/agentes-gmm-delete-dialog.component';
import { AgentesGmmService } from 'app/entities/agentes-gmm/agentes-gmm.service';

describe('Component Tests', () => {
  describe('AgentesGmm Management Delete Component', () => {
    let comp: AgentesGmmDeleteDialogComponent;
    let fixture: ComponentFixture<AgentesGmmDeleteDialogComponent>;
    let service: AgentesGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AgentesGmmDeleteDialogComponent]
      })
        .overrideTemplate(AgentesGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgentesGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgentesGmmService);
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
