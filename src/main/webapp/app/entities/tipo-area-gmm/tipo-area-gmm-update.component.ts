import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoAreaGmm, TipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';
import { TipoAreaGmmService } from './tipo-area-gmm.service';

@Component({
  selector: 'jhi-tipo-area-gmm-update',
  templateUrl: './tipo-area-gmm-update.component.html'
})
export class TipoAreaGmmUpdateComponent implements OnInit {
  tipoArea: ITipoAreaGmm;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: []
  });

  constructor(protected tipoAreaService: TipoAreaGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoArea }) => {
      this.updateForm(tipoArea);
      this.tipoArea = tipoArea;
    });
  }

  updateForm(tipoArea: ITipoAreaGmm) {
    this.editForm.patchValue({
      id: tipoArea.id,
      codigo: tipoArea.codigo,
      titulo: tipoArea.titulo,
      descripcion: tipoArea.descripcion
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
      descripcion: this.editForm.get(['descripcion']).value
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
}
