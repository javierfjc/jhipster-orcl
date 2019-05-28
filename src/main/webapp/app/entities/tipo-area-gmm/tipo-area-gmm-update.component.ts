import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoAreaGmm, TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { TipoAreaGmmService } from './tipo-area-gmm.service';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from 'app/entities/agentes-gmm';

@Component({
  selector: 'jhi-tipo-area-gmm-update',
  templateUrl: './tipo-area-gmm-update.component.html'
})
export class TipoAreaGmmUpdateComponent implements OnInit {
  tipoArea: ITipoAreaGmm;
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
    protected tipoAreaService: TipoAreaGmmService,
    protected agentesService: AgentesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoArea }) => {
      this.updateForm(tipoArea);
      this.tipoArea = tipoArea;
    });
    this.agentesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAgentesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAgentesGmm[]>) => response.body)
      )
      .subscribe((res: IAgentesGmm[]) => (this.agentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoArea: ITipoAreaGmm) {
    this.editForm.patchValue({
      id: tipoArea.id,
      codigo: tipoArea.codigo,
      titulo: tipoArea.titulo,
      descripcion: tipoArea.descripcion,
      agentesId: tipoArea.agentesId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoArea = this.createFromForm();
    if (tipoArea.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoAreaService.update(tipoArea));
    } else {
      this.subscribeToSaveResponse(this.tipoAreaService.create(tipoArea));
    }
  }

  private createFromForm(): ITipoAreaGmm {
    const entity = {
      ...new TipoAreaGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      titulo: this.editForm.get(['titulo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      agentesId: this.editForm.get(['agentesId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoAreaGmm>>) {
    result.subscribe((res: HttpResponse<ITipoAreaGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
