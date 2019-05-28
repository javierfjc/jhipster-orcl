import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmpresasGmm } from 'app/shared/model/empresas-gmm.model';

@Component({
  selector: 'jhi-empresas-gmm-detail',
  templateUrl: './empresas-gmm-detail.component.html'
})
export class EmpresasGmmDetailComponent implements OnInit {
  empresas: IEmpresasGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ empresas }) => {
      this.empresas = empresas;
    });
  }

  previousState() {
    window.history.back();
  }
}
