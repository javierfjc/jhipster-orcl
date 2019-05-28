import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterOrclSharedModule } from 'app/shared';
import {
  AgentesGmmComponent,
  AgentesGmmDetailComponent,
  AgentesGmmUpdateComponent,
  AgentesGmmDeletePopupComponent,
  AgentesGmmDeleteDialogComponent,
  agentesRoute,
  agentesPopupRoute
} from './';

const ENTITY_STATES = [...agentesRoute, ...agentesPopupRoute];

@NgModule({
  imports: [JhipsterOrclSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AgentesGmmComponent,
    AgentesGmmDetailComponent,
    AgentesGmmUpdateComponent,
    AgentesGmmDeleteDialogComponent,
    AgentesGmmDeletePopupComponent
  ],
  entryComponents: [AgentesGmmComponent, AgentesGmmUpdateComponent, AgentesGmmDeleteDialogComponent, AgentesGmmDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclAgentesGmmModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
