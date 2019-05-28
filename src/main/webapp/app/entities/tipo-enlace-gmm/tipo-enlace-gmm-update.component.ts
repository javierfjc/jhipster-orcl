import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoEnlaceGmm, TipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';
import { TipoEnlaceGmmService } from './tipo-enlace-gmm.service';
import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';
import { TipoTerminalGmmService } from 'app/entities/tipo-terminal-gmm';

@Component({
  selector: 'jhi-tipo-enlace-gmm-update',
  templateUrl: './tipo-enlace-gmm-update.component.html'
})
export class TipoEnlaceGmmUpdateComponent implements OnInit {
  tipoEnlace: ITipoEnlaceGmm;
  isSaving: boolean;

  tipoterminals: ITipoTerminalGmm[];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    titulo: [],
    descripcion: [],
    tipoTerminalId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoEnlaceService: TipoEnlaceGmmService,
    protected tipoTerminalService: TipoTerminalGmmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoEnlace }) => {
      this.updateForm(tipoEnlace);
      this.tipoEnlace = tipoEnlace;
    });
    this.tipoTerminalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoTerminalGmm[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoTerminalGmm[]>) => response.body)
      )
      .subscribe((res: ITipoTerminalGmm[]) => (this.tipoterminals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoEnlace: ITipoEnlaceGmm) {
    this.editForm.patchValue({
      id: tipoEnlace.id,
      codigo: tipoEnlace.codigo,
      titulo: tipoEnlace.titulo,
      descripcion: tipoEnlace.descripcion,
      tipoTerminalId: tipoEnlace.tipoTerminalId
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
      descripcion: this.editForm.get(['descripcion']).value,
      tipoTerminalId: this.editForm.get(['tipoTerminalId']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTipoTerminalById(index: number, item: ITipoTerminalGmm) {
    return item.id;
  }
}
