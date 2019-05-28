import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  TipoAgenteGmmComponent,
  TipoAgenteGmmDetailComponent,
  TipoAgenteGmmUpdateComponent,
  TipoAgenteGmmDeletePopupComponent,
  TipoAgenteGmmDeleteDialogComponent,
  tipoAgenteRoute,
  tipoAgentePopupRoute
} from './';

const ENTITY_STATES = [...tipoAgenteRoute, ...tipoAgentePopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoAgenteGmmComponent,
    TipoAgenteGmmDetailComponent,
    TipoAgenteGmmUpdateComponent,
    TipoAgenteGmmDeleteDialogComponent,
    TipoAgenteGmmDeletePopupComponent
  ],
  entryComponents: [
    TipoAgenteGmmComponent,
    TipoAgenteGmmUpdateComponent,
    TipoAgenteGmmDeleteDialogComponent,
    TipoAgenteGmmDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclTipoAgenteGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
