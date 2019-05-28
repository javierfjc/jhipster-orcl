/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoTerminalGmmUpdateComponent } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm-update.component';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm.service';
import { TipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

describe('Component Tests', () => {
  describe('TipoTerminalGmm Management Update Component', () => {
    let comp: TipoTerminalGmmUpdateComponent;
    let fixture: ComponentFixture<TipoTerminalGmmUpdateComponent>;
    let service: TipoTerminalGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoTerminalGmmUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoTerminalGmmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoTerminalGmmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTerminalGmmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoTerminalGmm(123);
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
        const entity = new TipoTerminalGmm();
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
