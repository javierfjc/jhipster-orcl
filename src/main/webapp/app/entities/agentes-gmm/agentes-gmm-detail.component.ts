import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgentesGmm } from 'app/shared/model/agentes-gmm.model';

@Component({
  selector: 'jhi-agentes-gmm-detail',
  templateUrl: './agentes-gmm-detail.component.html'
})
export class AgentesGmmDetailComponent implements OnInit {
  agentes: IAgentesGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ agentes }) => {
      this.agentes = agentes;
    });
  }

  previousState() {
    window.history.back();
  }
}
