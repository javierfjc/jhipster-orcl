import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAlmacenesGmm, AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AlmacenesGmmService } from './almacenes-gmm.service';
import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';
import { AgentesGmmService } from 'app/entities/agentes-gmm';

@Component({
  selector: 'jhi-almacenes-gmm-update',
  templateUrl: './almacenes-gmm-update.component.html'
})
export class AlmacenesGmmUpdateComponent implements OnInit {
  almacenes: IAlmacenesGmm;
  isSaving: boolean;

  agentes: IAgentesGmm[];
  fechaAltaDp: any;
  fechaEstadoDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    fechaAlta: [],
    estado: [],
    fechaEstado: [],
    agentesId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected almacenesService: AlmacenesGmmService,
    protected agentesService: AgentesGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ almacenes }) => {
      this.updateForm(almacenes);
      this.almacenes = almacenes;
    });
    this.agentesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAgentesGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAgentesGmm[]>) => response.body)
      )
      .subscribe((res: IAgentesGmm[]) => (this.agentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(almacenes: IAlmacenesGmm) {
    this.editForm.patchValue({
      id: almacenes.id,
      codigo: almacenes.codigo,
      titulo: almacenes.titulo,
      fechaAlta: almacenes.fechaAlta,
      estado: almacenes.estado,
      fechaEstado: almacenes.fechaEstado,
      agentesId: almacenes.agentesId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const almacenes = this.createFromForm();
    if (almacenes.id !== undefined) {
      this.subscribeToSaveResponse(this.almacenesService.update(almacenes));
    } else {
      this.subscribeToSaveResponse(this.almacenesService.create(almacenes));
    }
  }

  private createFromForm(): IAlmacenesGmm {
    const entity = {
      ...new AlmacenesGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      titulo: this.editForm.get(['titulo']).value,
      fechaAlta: this.editForm.get(['fechaAlta']).value,
      estado: this.editForm.get(['estado']).value,
      fechaEstado: this.editForm.get(['fechaEstado']).value,
      agentesId: this.editForm.get(['agentesId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlmacenesGmm>>) {
    result.subscribe((res: HttpResponse<IAlmacenesGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
