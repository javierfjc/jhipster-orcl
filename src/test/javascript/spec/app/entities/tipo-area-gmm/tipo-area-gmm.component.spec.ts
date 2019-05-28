/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAreaGmmComponent } from 'app/entities/tipo-area-gmm/tipo-area-gmm.component';
import { TipoAreaGmmService } from 'app/entities/tipo-area-gmm/tipo-area-gmm.service';
import { TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

describe('Component Tests', () => {
  describe('TipoAreaGmm Management Component', () => {
    let comp: TipoAreaGmmComponent;
    let fixture: ComponentFixture<TipoAreaGmmComponent>;
    let service: TipoAreaGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAreaGmmComponent],
        providers: []
      })
        .overrideTemplate(TipoAreaGmmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAreaGmmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAreaGmmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoAreaGmm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoAreas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
