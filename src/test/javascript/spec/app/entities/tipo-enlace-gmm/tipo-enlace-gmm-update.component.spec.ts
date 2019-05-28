/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoEnlaceGmmUpdateComponent } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm-update.component';
import { TipoEnlaceGmmService } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm.service';
import { TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

describe('Component Tests', () => {
  describe('TipoEnlaceGmm Management Update Component', () => {
    let comp: TipoEnlaceGmmUpdateComponent;
    let fixture: ComponentFixture<TipoEnlaceGmmUpdateComponent>;
    let service: TipoEnlaceGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoEnlaceGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoEnlaceGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoEnlaceGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoEnlaceGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoEnlaceGmm(123);
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
        const entity = new TipoEnlaceGmm();
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
