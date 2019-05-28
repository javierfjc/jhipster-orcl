/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm/tipo-terminal-gmm.service';
import { ITipoTerminalGmm, TipoTerminalGmm, DominioSiNo, TipoTerminalTipoImporte } from 'app/shared/model/tipo-terminal-gmm.model';

describe('Service Tests', () => {
  describe('TipoTerminalGmm Service', () => {
    let injector: TestBed;
    let service: TipoTerminalGmmService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoTerminalGmm;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TipoTerminalGmmService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TipoTerminalGmm(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        DominioSiNo.SI,
        DominioSiNo.SI,
        TipoTerminalTipoImporte.PORCENTAJE,
        TipoTerminalTipoImporte.PORCENTAJE,
        TipoTerminalTipoImporte.PORCENTAJE
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a TipoTerminalGmm', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new TipoTerminalGmm(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a TipoTerminalGmm', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            titulo: 'BBBBBB',
            descripcion: 'BBBBBB',
            pathEnvio: 'BBBBBB',
            pathRecibir: 'BBBBBB',
            contador: 1,
            controlVisitas: 'BBBBBB',
            controlCobros: 'BBBBBB',
            tipoImporteDto1: 'BBBBBB',
            tipoImporteDto2: 'BBBBBB',
            tipoImporteDto3: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of TipoTerminalGmm', async () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            titulo: 'BBBBBB',
            descripcion: 'BBBBBB',
            pathEnvio: 'BBBBBB',
            pathRecibir: 'BBBBBB',
            contador: 1,
            controlVisitas: 'BBBBBB',
            controlCobros: 'BBBBBB',
            tipoImporteDto1: 'BBBBBB',
            tipoImporteDto2: 'BBBBBB',
            tipoImporteDto3: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a TipoTerminalGmm', async () => {
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
