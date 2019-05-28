import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IAgentesGmm, AgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from './agentes-gmm.service';

@Component({
  selector: 'jhi-agentes-gmm-update',
  templateUrl: './agentes-gmm-update.component.html'
})
export class AgentesGmmUpdateComponent implements OnInit {
  agentes: IAgentesGmm;
  isSaving: boolean;
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
    tpRegalos: []
  });

  constructor(protected agentesService: AgentesGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ agentes }) => {
      this.updateForm(agentes);
      this.agentes = agentes;
    });
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
      tpRegalos: agentes.tpRegalos
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
      tpRegalos: this.editForm.get(['tpRegalos']).value
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
}
