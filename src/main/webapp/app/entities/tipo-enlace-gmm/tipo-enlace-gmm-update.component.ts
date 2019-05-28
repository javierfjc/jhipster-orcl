import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoEnlaceGmm, TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';
import { TipoEnlaceGmmService } from './tipo-enlace-gmm.service';

@Component({
  selector: 'jhi-tipo-enlace-gmm-update',
  templateUrl: './tipo-enlace-gmm-update.component.html'
})
export class TipoEnlaceGmmUpdateComponent implements OnInit {
  tipoEnlace: ITipoEnlaceGmm;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: []
  });

  constructor(protected tipoEnlaceService: TipoEnlaceGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoEnlace }) => {
      this.updateForm(tipoEnlace);
      this.tipoEnlace = tipoEnlace;
    });
  }

  updateForm(tipoEnlace: ITipoEnlaceGmm) {
    this.editForm.patchValue({
      id: tipoEnlace.id,
      codigo: tipoEnlace.codigo,
      titulo: tipoEnlace.titulo,
      descripcion: tipoEnlace.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoEnlace = this.createFromForm();
    if (tipoEnlace.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoEnlaceService.update(tipoEnlace));
    } else {
      this.subscribeToSaveResponse(this.tipoEnlaceService.create(tipoEnlace));
    }
  }

  private createFromForm(): ITipoEnlaceGmm {
    const entity = {
      ...new TipoEnlaceGmm(),
      id: this.editForm.get(['id']).value,
      codigo: this.editForm.get(['codigo']).value,
      titulo: this.editForm.get(['titulo']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoEnlaceGmm>>) {
    result.subscribe((res: HttpResponse<ITipoEnlaceGmm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
