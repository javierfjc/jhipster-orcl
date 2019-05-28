/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAgenteGmmDetailComponent } from 'app/entities/tipo-agente-gmm/tipo-agente-gmm-detail.component';
import { TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

describe('Component Tests', () => {
  describe('TipoAgenteGmm Management Detail Component', () => {
    let comp: TipoAgenteGmmDetailComponent;
    let fixture: ComponentFixture<TipoAgenteGmmDetailComponent>;
    const route = ({ data: of({ tipoAgente: new TipoAgenteGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAgenteGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoAgenteGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAgenteGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoAgente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
