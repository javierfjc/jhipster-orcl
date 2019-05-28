import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  TipoAreaGmmComponent,
  TipoAreaGmmDetailComponent,
  TipoAreaGmmUpdateComponent,
  TipoAreaGmmDeletePopupComponent,
  TipoAreaGmmDeleteDialogComponent,
  tipoAreaRoute,
  tipoAreaPopupRoute
} from './';

const ENTITY_STATES = [...tipoAreaRoute, ...tipoAreaPopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoAreaGmmComponent,
    TipoAreaGmmDetailComponent,
    TipoAreaGmmUpdateComponent,
    TipoAreaGmmDeleteDialogComponent,
    TipoAreaGmmDeletePopupComponent
  ],
  entryComponents: [TipoAreaGmmComponent, TipoAreaGmmUpdateComponent, TipoAreaGmmDeleteDialogComponent, TipoAreaGmmDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclTipoAreaGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
