import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IEmpresasGmm, EmpresasGmm } from 'app/shared/model/empresas-gmm.model';
import { EmpresasGmmService } from './empresas-gmm.service';

@Component({
  selector: 'jhi-empresas-gmm-update',
  templateUrl: './empresas-gmm-update.component.html'
})
export class EmpresasGmmUpdateComponent implements OnInit {
  empresas: IEmpresasGmm;
  isSaving: boolean;
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
    exclusiva: []
  });

  constructor(protected empresasService: EmpresasGmmService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empresas }) => {
      this.updateForm(empresas);
      this.empresas = empresas;
    });
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
      exclusiva: empresas.exclusiva
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
      exclusiva: this.editForm.get(['exclusiva']).value
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
}
