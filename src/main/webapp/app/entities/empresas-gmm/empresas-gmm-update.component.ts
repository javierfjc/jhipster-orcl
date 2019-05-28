import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpresasGmm, EmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { EmpresasGmmService } from './empresas-gmm.service';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from 'app/entities/agentes-gmm';

@Component({
  selector: 'jhi-empresas-gmm-update',
  templateUrl: './empresas-gmm-update.component.html'
})
export class EmpresasGmmUpdateComponent implements OnInit {
  empresas: IEmpresasGmm;
  isSaving: boolean;

  agentes: IAgentesGmm[];
  fechaAltaDp: any;
  fechaEstadoDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    descripcion: [],
    titulo: [],
    cif: [],
    fechaAlta: [],
    estado: [],
    fechaEstado: [],
    exclusiva: [],
    agentesId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected empresasService: EmpresasGmmService,
    protected agentesService: AgentesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empresas }) => {
      this.updateForm(empresas);
      this.empresas = empresas;
    });
    this.agentesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAgentesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAgentesGmm[]>) => response.body)
      )
      .subscribe((res: IAgentesGmm[]) => (this.agentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(empresas: IEmpresasGmm) {
    this.editForm.patchValue({
      id: empresas.id,
      codigo: empresas.codigo,
      descripcion: empresas.descripcion,
      titulo: empresas.titulo,
      cif: empresas.cif,
      fechaAlta: empresas.fechaAlta,
      estado: empresas.estado,
      fechaEstado: empresas.fechaEstado,
      exclusiva: empresas.exclusiva,
      agentesId: empresas.agentesId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const empresas = this.createFromForm();
    if (empresas.id !== undefined) {
      this.subscribeToSaveResponse(this.empresasService.update(empresas));
    } else {
      this.subscribeToSaveResponse(this.empresasService.create(empresas));
    }
  }

  private createFromForm(): IEmpresasGmm {
    const entity = {
      ...new EmpresasGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      titulo: this.editForm.get(['titulo']).value,
      cif: this.editForm.get(['cif']).value,
      fechaAlta: this.editForm.get(['fechaAlta']).value,
      estado: this.editForm.get(['estado']).value,
      fechaEstado: this.editForm.get(['fechaEstado']).value,
      exclusiva: this.editForm.get(['exclusiva']).value,
      agentesId: this.editForm.get(['agentesId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresasGmm>>) {
    result.subscribe((res: HttpResponse<IEmpresasGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackAgentesById(index: number, item: IAgentesGmm) {
    return item.id;
  }
}
