/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAgenteGmmComponent } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm.component';
import { TipoAgenteGmmService } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm.service';
import { TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

describe('Component Tests', () => {
  describe('TipoAgenteGmm Management Component', () => {
    let comp: TipoAgenteGmmComponent;
    let fixture: ComponentFixture<TipoAgenteGmmComponent>;
    let service: TipoAgenteGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAgenteGmmComponent],
        providers: []
      })
        .overrideTemplate(TipoAgenteGmmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAgenteGmmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAgenteGmmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoAgenteGmm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoAgentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
