import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoAgenteGmm } from 'app/shared/model/tipo-agente-gmm.model';

@Component({
  selector: 'jhi-tipo-agente-gmm-detail',
  templateUrl: './tipo-agente-gmm-detail.component.html'
})
export class TipoAgenteGmmDetailComponent implements OnInit {
  tipoAgente: ITipoAgenteGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoAgente }) => {
      this.tipoAgente = tipoAgente;
    });
  }

  previousState() {
    window.history.back();
  }
}
