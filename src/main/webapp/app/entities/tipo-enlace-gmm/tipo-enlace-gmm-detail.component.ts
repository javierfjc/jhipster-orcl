import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoEnlaceGmm } from 'app/shared/model/tipo-enlace-gmm.model';

@Component({
  selector: 'jhi-tipo-enlace-gmm-detail',
  templateUrl: './tipo-enlace-gmm-detail.component.html'
})
export class TipoEnlaceGmmDetailComponent implements OnInit {
  tipoEnlace: ITipoEnlaceGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoEnlace }) => {
      this.tipoEnlace = tipoEnlace;
    });
  }

  previousState() {
    window.history.back();
  }
}
