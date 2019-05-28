import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IAlmacenesGmm, AlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';
import { AlmacenesGmmService } from './almacenes-gmm.service';

@Component({
  selector: 'jhi-almacenes-gmm-update',
  templateUrl: './almacenes-gmm-update.component.html'
})
export class AlmacenesGmmUpdateComponent implements OnInit {
  almacenes: IAlmacenesGmm;
  isSaving: boolean;
  fechaAltaDp: any;
  fechaEstadoDp: any;

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    fechaAlta: [],
    estado: [],
    fechaEstado: []
  });

  constructor(protected almacenesService: AlmacenesGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ almacenes }) => {
      this.updateForm(almacenes);
      this.almacenes = almacenes;
    });
  }

  updateForm(almacenes: IAlmacenesGmm) {
    this.editForm.patchValue({
      id: almacenes.id,
      codigo: almacenes.codigo,
      titulo: almacenes.titulo,
      fechaAlta: almacenes.fechaAlta,
      estado: almacenes.estado,
      fechaEstado: almacenes.fechaEstado
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
      fechaEstado: this.editForm.get(['fechaEstado']).value
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
}
