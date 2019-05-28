/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AgentesGmmDetailComponent } from 'app/entities/agentes-gmm/agentes-gmm-detail.component';
import { AgentesGmm } from 'app/shared/model/agentes-gmm.model';

describe('Component Tests', () => {
  describe('AgentesGmm Management Detail Component', () => {
    let comp: AgentesGmmDetailComponent;
    let fixture: ComponentFixture<AgentesGmmDetailComponent>;
    const route = ({ data: of({ agentes: new AgentesGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AgentesGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AgentesGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgentesGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agentes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
