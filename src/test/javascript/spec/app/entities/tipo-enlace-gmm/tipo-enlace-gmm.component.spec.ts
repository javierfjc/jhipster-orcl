/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoEnlaceGmmComponent } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm.component';
import { TipoEnlaceGmmService } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm.service';
import { TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

describe('Component Tests', () => {
  describe('TipoEnlaceGmm Management Component', () => {
    let comp: TipoEnlaceGmmComponent;
    let fixture: ComponentFixture<TipoEnlaceGmmComponent>;
    let service: TipoEnlaceGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoEnlaceGmmComponent],
        providers: []
      })
        .overrideTemplate(TipoEnlaceGmmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoEnlaceGmmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoEnlaceGmmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoEnlaceGmm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoEnlaces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
