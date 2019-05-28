import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tipo-agente-gmm',
        loadChildren: './tipo-agente-gmm/tipo-agente-gmm.module#JhipsterOrclTipoAgenteGmmModule'
      },
      {
        path: 'tipo-area-gmm',
        loadChildren: './tipo-area-gmm/tipo-area-gmm.module#JhipsterOrclTipoAreaGmmModule'
      },
      {
        path: 'tipo-enlace-gmm',
        loadChildren: './tipo-enlace-gmm/tipo-enlace-gmm.module#JhipsterOrclTipoEnlaceGmmModule'
      },
      {
        path: 'tipo-terminal-gmm',
        loadChildren: './tipo-terminal-gmm/tipo-terminal-gmm.module#JhipsterOrclTipoTerminalGmmModule'
      },
      {
        path: 'almacenes-gmm',
        loadChildren: './almacenes-gmm/almacenes-gmm.module#JhipsterOrclAlmacenesGmmModule'
      },
      {
        path: 'empresas-gmm',
        loadChildren: './empresas-gmm/empresas-gmm.module#JhipsterOrclEmpresasGmmModule'
      },
      {
        path: 'agentes-gmm',
        loadChildren: './agentes-gmm/agentes-gmm.module#JhipsterOrclAgentesGmmModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterOrclEntityModule {}
