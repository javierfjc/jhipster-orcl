import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  TipoEnlaceGmmComponent,
  TipoEnlaceGmmDetailComponent,
  TipoEnlaceGmmUpdateComponent,
  TipoEnlaceGmmDeletePopupComponent,
  TipoEnlaceGmmDeleteDialogComponent,
  tipoEnlaceRoute,
  tipoEnlacePopupRoute
} from './';

const ENTITY_STATES = [...tipoEnlaceRoute, ...tipoEnlacePopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoEnlaceGmmComponent,
    TipoEnlaceGmmDetailComponent,
    TipoEnlaceGmmUpdateComponent,
    TipoEnlaceGmmDeleteDialogComponent,
    TipoEnlaceGmmDeletePopupComponent
  ],
  entryComponents: [
    TipoEnlaceGmmComponent,
    TipoEnlaceGmmUpdateComponent,
    TipoEnlaceGmmDeleteDialogComponent,
    TipoEnlaceGmmDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclTipoEnlaceGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
