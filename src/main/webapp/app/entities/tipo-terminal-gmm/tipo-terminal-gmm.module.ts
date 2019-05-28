import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  TipoTerminalGmmComponent,
  TipoTerminalGmmDetailComponent,
  TipoTerminalGmmUpdateComponent,
  TipoTerminalGmmDeletePopupComponent,
  TipoTerminalGmmDeleteDialogComponent,
  tipoTerminalRoute,
  tipoTerminalPopupRoute
} from './';

const ENTITY_STATES = [...tipoTerminalRoute, ...tipoTerminalPopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoTerminalGmmComponent,
    TipoTerminalGmmDetailComponent,
    TipoTerminalGmmUpdateComponent,
    TipoTerminalGmmDeleteDialogComponent,
    TipoTerminalGmmDeletePopupComponent
  ],
  entryComponents: [
    TipoTerminalGmmComponent,
    TipoTerminalGmmUpdateComponent,
    TipoTerminalGmmDeleteDialogComponent,
    TipoTerminalGmmDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclTipoTerminalGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
