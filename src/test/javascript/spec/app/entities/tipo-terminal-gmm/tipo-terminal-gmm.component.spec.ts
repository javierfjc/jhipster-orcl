/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoTerminalGmmComponent } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm.component';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm.service';
import { TipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

describe('Component Tests', () => {
  describe('TipoTerminalGmm Management Component', () => {
    let comp: TipoTerminalGmmComponent;
    let fixture: ComponentFixture<TipoTerminalGmmComponent>;
    let service: TipoTerminalGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoTerminalGmmComponent],
        providers: []
      })
        .overrideTemplate(TipoTerminalGmmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoTerminalGmmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTerminalGmmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoTerminalGmm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoTerminals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
