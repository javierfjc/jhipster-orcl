import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  EmpresasGmmComponent,
  EmpresasGmmDetailComponent,
  EmpresasGmmUpdateComponent,
  EmpresasGmmDeletePopupComponent,
  EmpresasGmmDeleteDialogComponent,
  empresasRoute,
  empresasPopupRoute
} from './';

const ENTITY_STATES = [...empresasRoute, ...empresasPopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmpresasGmmComponent,
    EmpresasGmmDetailComponent,
    EmpresasGmmUpdateComponent,
    EmpresasGmmDeleteDialogComponent,
    EmpresasGmmDeletePopupComponent
  ],
  entryComponents: [EmpresasGmmComponent, EmpresasGmmUpdateComponent, EmpresasGmmDeleteDialogComponent, EmpresasGmmDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclEmpresasGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
