import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoAgenteGmm, TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { TipoAgenteGmmService } from './tipo-agente-gmm.service';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from 'app/entities/agentes-gmm';

@Component({
  selector: 'jhi-tipo-agente-gmm-update',
  templateUrl: './tipo-agente-gmm-update.component.html'
})
export class TipoAgenteGmmUpdateComponent implements OnInit {
  tipoAgente: ITipoAgenteGmm;
  isSaving: boolean;

  agentes: IAgentesGmm[];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: [],
    agentesId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoAgenteService: TipoAgenteGmmService,
    protected agentesService: AgentesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoAgente }) => {
      this.updateForm(tipoAgente);
      this.tipoAgente = tipoAgente;
    });
    this.agentesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAgentesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAgentesGmm[]>) => response.body)
      )
      .subscribe((res: IAgentesGmm[]) => (this.agentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoAgente: ITipoAgenteGmm) {
    this.editForm.patchValue({
      id: tipoAgente.id,
      codigo: tipoAgente.codigo,
      titulo: tipoAgente.titulo,
      descripcion: tipoAgente.descripcion,
      agentesId: tipoAgente.agentesId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoAgente = this.createFromForm();
    if (tipoAgente.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoAgenteService.update(tipoAgente));
    } else {
      this.subscribeToSaveResponse(this.tipoAgenteService.create(tipoAgente));
    }
  }

  private createFromForm(): ITipoAgenteGmm {
    const entity = {
      ...new TipoAgenteGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      titulo: this.editForm.get(['titulo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      agentesId: this.editForm.get(['agentesId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoAgenteGmm>>) {
    result.subscribe((res: HttpResponse<ITipoAgenteGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
