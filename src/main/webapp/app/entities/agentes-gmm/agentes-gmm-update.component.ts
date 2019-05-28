import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAgentesGmm, AgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from './agentes-gmm.service';
import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm';
import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { TipoAreaGmmService } from 'app/entities/tipo-area-gmm';
import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { TipoAgenteGmmService } from 'app/entities/tipo-agente-gmm';
import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { EmpresasGmmService } from 'app/entities/empresas-gmm';
import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AlmacenesGmmService } from 'app/entities/almacenes-gmm';

@Component({
  selector: 'jhi-agentes-gmm-update',
  templateUrl: './agentes-gmm-update.component.html'
})
export class AgentesGmmUpdateComponent implements OnInit {
  agentes: IAgentesGmm;
  isSaving: boolean;

  tipoterminals: ITipoTerminalGmm[];

  tipoareas: ITipoAreaGmm[];

  tipoagentes: ITipoAgenteGmm[];

  empresas: IEmpresasGmm[];

  almacenes: IAlmacenesGmm[];
  fechaAltaDp: any;
  fechaEstadoDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    descripcion: [],
    fechaAlta: [],
    estado: [],
    fechaEstado: [],
    tpNumero: [],
    tpRegalos: [],
    tipoTerminalId: [],
    tipoAreaId: [],
    tipoAgenteId: [],
    empresaId: [],
    almacenId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected agentesService: AgentesGmmService,
    protected tipoTerminalService: TipoTerminalGmmService,
    protected tipoAreaService: TipoAreaGmmService,
    protected tipoAgenteService: TipoAgenteGmmService,
    protected empresasService: EmpresasGmmService,
    protected almacenesService: AlmacenesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ agentes }) => {
      this.updateForm(agentes);
      this.agentes = agentes;
    });
    this.tipoTerminalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoTerminalGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoTerminalGmm[]>) => response.body)
      )
      .subscribe((res: ITipoTerminalGmm[]) => (this.tipoterminals = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoAreaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoAreaGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoAreaGmm[]>) => response.body)
      )
      .subscribe((res: ITipoAreaGmm[]) => (this.tipoareas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoAgenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoAgenteGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoAgenteGmm[]>) => response.body)
      )
      .subscribe((res: ITipoAgenteGmm[]) => (this.tipoagentes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.empresasService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpresasGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpresasGmm[]>) => response.body)
      )
      .subscribe((res: IEmpresasGmm[]) => (this.empresas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.almacenesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlmacenesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlmacenesGmm[]>) => response.body)
      )
      .subscribe((res: IAlmacenesGmm[]) => (this.almacenes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(agentes: IAgentesGmm) {
    this.editForm.patchValue({
      id: agentes.id,
      codigo: agentes.codigo,
      descripcion: agentes.descripcion,
      fechaAlta: agentes.fechaAlta,
      estado: agentes.estado,
      fechaEstado: agentes.fechaEstado,
      tpNumero: agentes.tpNumero,
      tpRegalos: agentes.tpRegalos,
      tipoTerminalId: agentes.tipoTerminalId,
      tipoAreaId: agentes.tipoAreaId,
      tipoAgenteId: agentes.tipoAgenteId,
      empresaId: agentes.empresaId,
      almacenId: agentes.almacenId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const agentes = this.createFromForm();
    if (agentes.id !== undefined) {
      this.subscribeToSaveResponse(this.agentesService.update(agentes));
    } else {
      this.subscribeToSaveResponse(this.agentesService.create(agentes));
    }
  }

  private createFromForm(): IAgentesGmm {
    const entity = {
      ...new AgentesGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      fechaAlta: this.editForm.get(['fechaAlta']).value,
      estado: this.editForm.get(['estado']).value,
      fechaEstado: this.editForm.get(['fechaEstado']).value,
      tpNumero: this.editForm.get(['tpNumero']).value,
      tpRegalos: this.editForm.get(['tpRegalos']).value,
      tipoTerminalId: this.editForm.get(['tipoTerminalId']).value,
      tipoAreaId: this.editForm.get(['tipoAreaId']).value,
      tipoAgenteId: this.editForm.get(['tipoAgenteId']).value,
      empresaId: this.editForm.get(['empresaId']).value,
      almacenId: this.editForm.get(['almacenId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgentesGmm>>) {
    result.subscribe((res: HttpResponse<IAgentesGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTipoTerminalById(index: number, item: ITipoTerminalGmm) {
    return item.id;
  }

  trackTipoAreaById(index: number, item: ITipoAreaGmm) {
    return item.id;
  }

  trackTipoAgenteById(index: number, item: ITipoAgenteGmm) {
    return item.id;
  }

  trackEmpresasById(index: number, item: IEmpresasGmm) {
    return item.id;
  }

  trackAlmacenesById(index: number, item: IAlmacenesGmm) {
    return item.id;
  }
}
