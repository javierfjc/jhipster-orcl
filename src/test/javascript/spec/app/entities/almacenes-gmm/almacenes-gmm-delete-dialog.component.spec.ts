/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AlmacenesGmmDeleteDialogComponent } from 'app/entities/almacenes-gmm/almacenes-gmm-delete-dialog.component';
import { AlmacenesGmmService } from 'app/entities/almacenes-gmm/almacenes-gmm.service';

describe('Component Tests', () => {
  describe('AlmacenesGmm Management Delete Component', () => {
    let comp: AlmacenesGmmDeleteDialogComponent;
    let fixture: ComponentFixture<AlmacenesGmmDeleteDialogComponent>;
    let service: AlmacenesGmmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AlmacenesGmmDeleteDialogComponent]
      })
        .overrideTemplate(AlmacenesGmmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlmacenesGmmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlmacenesGmmService);
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
