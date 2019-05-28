import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoAreaGmm } from 'app/shared/model/tipo-area-gmm.model';

@Component({
  selector: 'jhi-tipo-area-gmm-detail',
  templateUrl: './tipo-area-gmm-detail.component.html'
})
export class TipoAreaGmmDetailComponent implements OnInit {
  tipoArea: ITipoAreaGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoArea }) => {
      this.tipoArea = tipoArea;
    });
  }

  previousState() {
    window.history.back();
  }
}
