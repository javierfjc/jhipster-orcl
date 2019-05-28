/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EmpresasGmmService } from 'app/entities/empresas-gmm/empresas-gmm.service';
import { IEmpresasGmm, EmpresasGmm } from 'app/shared/model/empresas-gmm.model';

describe('Service Tests', () => {
  describe('EmpresasGmm Service', () => {
    let injector: TestBed;
    let service: EmpresasGmmService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmpresasGmm;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EmpresasGmmService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EmpresasGmm(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            fechaAlta: currentDate.format(DATE_FORMAT),
            fechaEstado: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a EmpresasGmm', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaAlta: currentDate.format(DATE_FORMAT),
            fechaEstado: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaAlta: currentDate,
            fechaEstado: currentDate
          },
          returnedFromService
        );
        service
          .create(new EmpresasGmm(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EmpresasGmm', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            descripcion: 'BBBBBB',
            titulo: 'BBBBBB',
            cif: 'BBBBBB',
            fechaAlta: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB',
            fechaEstado: currentDate.format(DATE_FORMAT),
            exclusiva: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaAlta: currentDate,
            fechaEstado: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of EmpresasGmm', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            descripcion: 'BBBBBB',
            titulo: 'BBBBBB',
            cif: 'BBBBBB',
            fechaAlta: currentDate.format(DATE_FORMAT),
            estado: 'BBBBBB',
            fechaEstado: currentDate.format(DATE_FORMAT),
            exclusiva: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaAlta: currentDate,
            fechaEstado: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EmpresasGmm', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
