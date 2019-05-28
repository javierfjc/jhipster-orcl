/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAreaGmmUpdateComponent } from 'app/entities/tipo-area-gmm/tipo-area-gmm-update.component';
import { TipoAreaGmmService } from 'app/entities/tipo-area-gmm/tipo-area-gmm.service';
import { TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

describe('Component Tests', () => {
  describe('TipoAreaGmm Management Update Component', () => {
    let comp: TipoAreaGmmUpdateComponent;
    let fixture: ComponentFixture<TipoAreaGmmUpdateComponent>;
    let service: TipoAreaGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAreaGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoAreaGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAreaGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAreaGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoAreaGmm(123);
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
        const entity = new TipoAreaGmm();
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
