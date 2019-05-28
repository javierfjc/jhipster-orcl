import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoTerminalGmm } from 'app/shared/model/tipo-terminal-gmm.model';

@Component({
  selector: 'jhi-tipo-terminal-gmm-detail',
  templateUrl: './tipo-terminal-gmm-detail.component.html'
})
export class TipoTerminalGmmDetailComponent implements OnInit {
  tipoTerminal: ITipoTerminalGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoTerminal }) => {
      this.tipoTerminal = tipoTerminal;
    });
  }

  previousState() {
    window.history.back();
  }
}
