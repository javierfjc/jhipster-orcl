import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoAgenteGmm, TipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';
import { TipoAgenteGmmService } from './tipo-agente-gmm.service';

@Component({
  selector: 'jhi-tipo-agente-gmm-update',
  templateUrl: './tipo-agente-gmm-update.component.html'
})
export class TipoAgenteGmmUpdateComponent implements OnInit {
  tipoAgente: ITipoAgenteGmm;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: []
  });

  constructor(protected tipoAgenteService: TipoAgenteGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoAgente }) => {
      this.updateForm(tipoAgente);
      this.tipoAgente = tipoAgente;
    });
  }

  updateForm(tipoAgente: ITipoAgenteGmm) {
    this.editForm.patchValue({
      id: tipoAgente.id,
      codigo: tipoAgente.codigo,
      titulo: tipoAgente.titulo,
      descripcion: tipoAgente.descripcion
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
      descripcion: this.editForm.get(['descripcion']).value
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
}
