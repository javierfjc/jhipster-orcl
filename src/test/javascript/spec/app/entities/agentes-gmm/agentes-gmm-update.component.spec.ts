/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AgentesGmmUpdateComponent } from 'app/entities/agentes-gmm/agentes-gmm-update.component';
import { AgentesGmmService } from 'app/entities/agentes-gmm/agentes-gmm.service';
import { AgentesGmm } from 'app/shared/model/agentes-gmm.model';

describe('Component Tests', () => {
  describe('AgentesGmm Management Update Component', () => {
    let comp: AgentesGmmUpdateComponent;
    let fixture: ComponentFixture<AgentesGmmUpdateComponent>;
    let service: AgentesGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AgentesGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AgentesGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgentesGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgentesGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgentesGmm(123);
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
        const entity = new AgentesGmm();
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
