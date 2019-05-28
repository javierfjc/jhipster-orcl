/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAgenteGmmUpdateComponent } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm-update.component';
import { TipoAgenteGmmService } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm.service';
import { TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

describe('Component Tests', () => {
  describe('TipoAgenteGmm Management Update Component', () => {
    let comp: TipoAgenteGmmUpdateComponent;
    let fixture: ComponentFixture<TipoAgenteGmmUpdateComponent>;
    let service: TipoAgenteGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAgenteGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoAgenteGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAgenteGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAgenteGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoAgenteGmm(123);
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
        const entity = new TipoAgenteGmm();
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
