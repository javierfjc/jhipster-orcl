/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOrclTestModule } from '../../../test.module';
import { AlmacenesGmmComponent } from 'app/entities/almacenes-gmm/almacenes-gmm.component';
import { AlmacenesGmmService } from 'app/entities/almacenes-gmm/almacenes-gmm.service';
import { AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

describe('Component Tests', () => {
  describe('AlmacenesGmm Management Component', () => {
    let comp: AlmacenesGmmComponent;
    let fixture: ComponentFixture<AlmacenesGmmComponent>;
    let service: AlmacenesGmmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterOrclTestModule],
        declarations: [AlmacenesGmmComponent],
        providers: []
      })
        .overrideTemplate(AlmacenesGmmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlmacenesGmmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlmacenesGmmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AlmacenesGmm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.almacenes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
