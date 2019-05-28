/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AlmacenesGmmDetailComponent } from 'app/entities/almacenes-gmm/almacenes-gmm-detail.component';
import { AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

describe('Component Tests', () => {
  describe('AlmacenesGmm Management Detail Component', () => {
    let comp: AlmacenesGmmDetailComponent;
    let fixture: ComponentFixture<AlmacenesGmmDetailComponent>;
    const route = ({ data: of({ almacenes: new AlmacenesGmm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AlmacenesGmmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlmacenesGmmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlmacenesGmmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.almacenes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
