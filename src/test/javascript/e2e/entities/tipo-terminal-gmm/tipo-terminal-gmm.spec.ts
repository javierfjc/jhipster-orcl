/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoTerminalComponentsPage, TipoTerminalDeleteDialog, TipoTerminalUpdatePage } from './tipo-terminal-gmm.page-object';

const expect = chai.expect;

describe('TipoTerminal e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoTerminalUpdatePage: TipoTerminalUpdatePage;
  let tipoTerminalComponentsPage: TipoTerminalComponentsPage;
  let tipoTerminalDeleteDialog: TipoTerminalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoTerminals', async () => {
    await navBarPage.goToEntity('tipo-terminal-gmm');
    tipoTerminalComponentsPage = new TipoTerminalComponentsPage();
    await browser.wait(ec.visibilityOf(tipoTerminalComponentsPage.title), 5000);
    expect(await tipoTerminalComponentsPage.getTitle()).to.eq('jhipsterOrclApp.tipoTerminal.home.title');
  });

  it('should load create TipoTerminal page', async () => {
    await tipoTerminalComponentsPage.clickOnCreateButton();
    tipoTerminalUpdatePage = new TipoTerminalUpdatePage();
    expect(await tipoTerminalUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.tipoTerminal.home.createOrEditLabel');
    await tipoTerminalUpdatePage.cancel();
  });

  it('should create and save TipoTerminals', async () => {
    const nbButtonsBeforeCreate = await tipoTerminalComponentsPage.countDeleteButtons();

    await tipoTerminalComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoTerminalUpdatePage.setCodigoInput('codigo'),
      tipoTerminalUpdatePage.setTituloInput('titulo'),
      tipoTerminalUpdatePage.setDescripcionInput('descripcion'),
      tipoTerminalUpdatePage.setPathEnvioInput('pathEnvio'),
      tipoTerminalUpdatePage.setPathRecibirInput('pathRecibir'),
      tipoTerminalUpdatePage.setContadorInput('5'),
      tipoTerminalUpdatePage.controlVisitasSelectLastOption(),
      tipoTerminalUpdatePage.controlCobrosSelectLastOption(),
      tipoTerminalUpdatePage.tipoImporteDto1SelectLastOption(),
      tipoTerminalUpdatePage.tipoImporteDto2SelectLastOption(),
      tipoTerminalUpdatePage.tipoImporteDto3SelectLastOption(),
      tipoTerminalUpdatePage.tipoEnlaceSelectLastOption()
    ]);
    expect(await tipoTerminalUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await tipoTerminalUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await tipoTerminalUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );
    expect(await tipoTerminalUpdatePage.getPathEnvioInput()).to.eq('pathEnvio', 'Expected PathEnvio value to be equals to pathEnvio');
    expect(await tipoTerminalUpdatePage.getPathRecibirInput()).to.eq(
      'pathRecibir',
      'Expected PathRecibir value to be equals to pathRecibir'
    );
    expect(await tipoTerminalUpdatePage.getContadorInput()).to.eq('5', 'Expected contador value to be equals to 5');
    await tipoTerminalUpdatePage.save();
    expect(await tipoTerminalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoTerminalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoTerminal', async () => {
    const nbButtonsBeforeDelete = await tipoTerminalComponentsPage.countDeleteButtons();
    await tipoTerminalComponentsPage.clickOnLastDeleteButton();

    tipoTerminalDeleteDialog = new TipoTerminalDeleteDialog();
    expect(await tipoTerminalDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.tipoTerminal.delete.question');
    await tipoTerminalDeleteDialog.clickOnConfirmButton();

    expect(await tipoTerminalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
