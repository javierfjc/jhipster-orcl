/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AlmacenesGmmUpdateComponent } from 'app/entities/almacenes-gmm/almacenes-gmm-update.component';
import { AlmacenesGmmService } from 'app/entities/almacenes-gmm/almacenes-gmm.service';
import { AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

describe('Component Tests', () => {
  describe('AlmacenesGmm Management Update Component', () => {
    let comp: AlmacenesGmmUpdateComponent;
    let fixture: ComponentFixture<AlmacenesGmmUpdateComponent>;
    let service: AlmacenesGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AlmacenesGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlmacenesGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlmacenesGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlmacenesGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlmacenesGmm(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlmacenesGmm();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
