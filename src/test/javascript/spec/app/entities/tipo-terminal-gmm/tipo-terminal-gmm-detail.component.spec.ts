/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoTerminalGmmDetailComponent } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm-detail.component';
import { TipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

describe('Component Tests', () => {
  describe('TipoTerminalGmm Management Detail Component', () => {
    let comp: TipoTerminalGmmDetailComponent;
    let fixture: ComponentFixture<TipoTerminalGmmDetailComponent>;
    const route = ({ data: of({ tipoTerminal: new TipoTerminalGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoTerminalGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoTerminalGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoTerminalGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoTerminal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
