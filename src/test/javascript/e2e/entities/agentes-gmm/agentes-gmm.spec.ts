/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgentesComponentsPage, AgentesDeleteDialog, AgentesUpdatePage } from './agentes-gmm.page-object';

const expect = chai.expect;

describe('Agentes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agentesUpdatePage: AgentesUpdatePage;
  let agentesComponentsPage: AgentesComponentsPage;
  let agentesDeleteDialog: AgentesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Agentes', async () => {
    await navBarPage.goToEntity('agentes-gmm');
    agentesComponentsPage = new AgentesComponentsPage();
    await browser.wait(ec.visibilityOf(agentesComponentsPage.title), 5000);
    expect(await agentesComponentsPage.getTitle()).to.eq('jhipsterOrclApp.agentes.home.title');
  });

  it('should load create Agentes page', async () => {
    await agentesComponentsPage.clickOnCreateButton();
    agentesUpdatePage = new AgentesUpdatePage();
    expect(await agentesUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.agentes.home.createOrEditLabel');
    await agentesUpdatePage.cancel();
  });

  it('should create and save Agentes', async () => {
    const nbButtonsBeforeCreate = await agentesComponentsPage.countDeleteButtons();

    await agentesComponentsPage.clickOnCreateButton();
    await promise.all([
      agentesUpdatePage.setCodigoInput('codigo'),
      agentesUpdatePage.setDescripcionInput('descripcion'),
      agentesUpdatePage.setFechaAltaInput('2000-12-31'),
      agentesUpdatePage.setEstadoInput('estado'),
      agentesUpdatePage.setFechaEstadoInput('2000-12-31'),
      agentesUpdatePage.setTpNumeroInput('tpNumero'),
      agentesUpdatePage.tpRegalosSelectLastOption(),
      agentesUpdatePage.tipoTerminalSelectLastOption(),
      agentesUpdatePage.tipoAreaSelectLastOption(),
      agentesUpdatePage.tipoAgenteSelectLastOption(),
      agentesUpdatePage.empresaSelectLastOption(),
      agentesUpdatePage.almacenSelectLastOption()
    ]);
    expect(await agentesUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await agentesUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await agentesUpdatePage.getFechaAltaInput()).to.eq('2000-12-31', 'Expected fechaAlta value to be equals to 2000-12-31');
    expect(await agentesUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await agentesUpdatePage.getFechaEstadoInput()).to.eq('2000-12-31', 'Expected fechaEstado value to be equals to 2000-12-31');
    expect(await agentesUpdatePage.getTpNumeroInput()).to.eq('tpNumero', 'Expected TpNumero value to be equals to tpNumero');
    await agentesUpdatePage.save();
    expect(await agentesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agentesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Agentes', async () => {
    const nbButtonsBeforeDelete = await agentesComponentsPage.countDeleteButtons();
    await agentesComponentsPage.clickOnLastDeleteButton();

    agentesDeleteDialog = new AgentesDeleteDialog();
    expect(await agentesDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.agentes.delete.question');
    await agentesDeleteDialog.clickOnConfirmButton();

    expect(await agentesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
