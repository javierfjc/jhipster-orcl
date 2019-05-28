/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { TipoEnlaceGmmDetailComponent } from 'app/entities/tipo-enlace-gmm/tipo-enlace-gmm-detail.component';
import { TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

describe('Component Tests', () => {
  describe('TipoEnlaceGmm Management Detail Component', () => {
    let comp: TipoEnlaceGmmDetailComponent;
    let fixture: ComponentFixture<TipoEnlaceGmmDetailComponent>;
    const route = ({ data: of({ tipoEnlace: new TipoEnlaceGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [TipoEnlaceGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoEnlaceGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoEnlaceGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoEnlace).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
