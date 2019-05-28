/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { EmpresasGmmDetailComponent } from 'app/entities/empresas-gmm/empresas-gmm-detail.component';
import { EmpresasGmm } from 'app/shared/model/empresas-gmm.model';

describe('Component Tests', () => {
  describe('EmpresasGmm Management Detail Component', () => {
    let comp: EmpresasGmmDetailComponent;
    let fixture: ComponentFixture<EmpresasGmmDetailComponent>;
    const route = ({ data: of({ empresas: new EmpresasGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [EmpresasGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmpresasGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmpresasGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.empresas).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
