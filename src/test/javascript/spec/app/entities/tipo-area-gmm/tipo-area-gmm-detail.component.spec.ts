/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoAreaGmmDetailComponent } from 'app/entities/tipo-area-gmm/tipo-area-gmm-detail.component';
import { TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

describe('Component Tests', () => {
  describe('TipoAreaGmm Management Detail Component', () => {
    let comp: TipoAreaGmmDetailComponent;
    let fixture: ComponentFixture<TipoAreaGmmDetailComponent>;
    const route = ({ data: of({ tipoArea: new TipoAreaGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoAreaGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoAreaGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAreaGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoArea).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
