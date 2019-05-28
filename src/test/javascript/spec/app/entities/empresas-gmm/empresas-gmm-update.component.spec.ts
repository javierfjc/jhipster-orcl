/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { EmpresasGmmUpdateComponent } from 'app/entities/empresas-gmm/empresas-gmm-update.component';
import { EmpresasGmmService } from 'app/entities/empresas-gmm/empresas-gmm.service';
import { EmpresasGmm } from 'app/shared/model/empresas-gmm.model';

describe('Component Tests', () => {
  describe('EmpresasGmm Management Update Component', () => {
    let comp: EmpresasGmmUpdateComponent;
    let fixture: ComponentFixture<EmpresasGmmUpdateComponent>;
    let service: EmpresasGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [EmpresasGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmpresasGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmpresasGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmpresasGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmpresasGmm(123);
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
        const entity = new EmpresasGmm();
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
