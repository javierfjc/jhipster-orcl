import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoTerminalGmm, TipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { TipoTerminalGmmService } from './tipo-terminal-gmm.service';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from 'app/entities/agentes-gmm';

@Component({
  selector: 'jhi-tipo-terminal-gmm-update',
  templateUrl: './tipo-terminal-gmm-update.component.html'
})
export class TipoTerminalGmmUpdateComponent implements OnInit {
  tipoTerminal: ITipoTerminalGmm;
  isSaving: boolean;

  agentes: IAgentesGmm[];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: [],
    pathEnvio: [],
    pathRecibir: [],
    contador: [],
    controlVisitas: [],
    controlCobros: [],
    tipoImporteDto1: [],
    tipoImporteDto2: [],
    tipoImporteDto3: [],
    agentesId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoTerminalService: TipoTerminalGmmService,
    protected agentesService: AgentesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoTerminal }) => {
      this.updateForm(tipoTerminal);
      this.tipoTerminal = tipoTerminal;
    });
    this.agentesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAgentesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAgentesGmm[]>) => response.body)
      )
      .subscribe((res: IAgentesGmm[]) => (this.agentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoTerminal: ITipoTerminalGmm) {
    this.editForm.patchValue({
      id: tipoTerminal.id,
      codigo: tipoTerminal.codigo,
      titulo: tipoTerminal.titulo,
      descripcion: tipoTerminal.descripcion,
      pathEnvio: tipoTerminal.pathEnvio,
      pathRecibir: tipoTerminal.pathRecibir,
      contador: tipoTerminal.contador,
      controlVisitas: tipoTerminal.controlVisitas,
      controlCobros: tipoTerminal.controlCobros,
      tipoImporteDto1: tipoTerminal.tipoImporteDto1,
      tipoImporteDto2: tipoTerminal.tipoImporteDto2,
      tipoImporteDto3: tipoTerminal.tipoImporteDto3,
      agentesId: tipoTerminal.agentesId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoTerminal = this.createFromForm();
    if (tipoTerminal.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoTerminalService.update(tipoTerminal));
    } else {
      this.subscribeToSaveResponse(this.tipoTerminalService.create(tipoTerminal));
    }
  }

  private createFromForm(): ITipoTerminalGmm {
    const entity = {
      ...new TipoTerminalGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      titulo: this.editForm.get(['titulo']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      pathEnvio: this.editForm.get(['pathEnvio']).value,
      pathRecibir: this.editForm.get(['pathRecibir']).value,
      contador: this.editForm.get(['contador']).value,
      controlVisitas: this.editForm.get(['controlVisitas']).value,
      controlCobros: this.editForm.get(['controlCobros']).value,
      tipoImporteDto1: this.editForm.get(['tipoImporteDto1']).value,
      tipoImporteDto2: this.editForm.get(['tipoImporteDto2']).value,
      tipoImporteDto3: this.editForm.get(['tipoImporteDto3']).value,
      agentesId: this.editForm.get(['agentesId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoTerminalGmm>>) {
    result.subscribe((res: HttpResponse<ITipoTerminalGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
