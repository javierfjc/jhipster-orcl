import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlmacenesGmm } from 'app/shared/model/almacenes-gmm.model';

@Component({
  selector: 'jhi-almacenes-gmm-detail',
  templateUrl: './almacenes-gmm-detail.component.html'
})
export class AlmacenesGmmDetailComponent implements OnInit {
  almacenes: IAlmacenesGmm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ almacenes }) => {
      this.almacenes = almacenes;
    });
  }

  previousState() {
    window.history.back();
  }
}
