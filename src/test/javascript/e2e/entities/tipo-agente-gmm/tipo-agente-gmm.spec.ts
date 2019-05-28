/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoAgenteComponentsPage, TipoAgenteDeleteDialog, TipoAgenteUpdatePage } from './tipo-agente-gmm.page-object';

const expect = chai.expect;

describe('TipoAgente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoAgenteUpdatePage: TipoAgenteUpdatePage;
  let tipoAgenteComponentsPage: TipoAgenteComponentsPage;
  let tipoAgenteDeleteDialog: TipoAgenteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoAgentes', async () => {
    await navBarPage.goToEntity('tipo-agente-gmm');
    tipoAgenteComponentsPage = new TipoAgenteComponentsPage();
    await browser.wait(ec.visibilityOf(tipoAgenteComponentsPage.title), 5000);
    expect(await tipoAgenteComponentsPage.getTitle()).to.eq('jhipsterOrclApp.tipoAgente.home.title');
  });

  it('should load create TipoAgente page', async () => {
    await tipoAgenteComponentsPage.clickOnCreateButton();
    tipoAgenteUpdatePage = new TipoAgenteUpdatePage();
    expect(await tipoAgenteUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.tipoAgente.home.createOrEditLabel');
    await tipoAgenteUpdatePage.cancel();
  });

  it('should create and save TipoAgentes', async () => {
    const nbButtonsBeforeCreate = await tipoAgenteComponentsPage.countDeleteButtons();

    await tipoAgenteComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoAgenteUpdatePage.setCodigoInput('codigo'),
      tipoAgenteUpdatePage.setTituloInput('titulo'),
      tipoAgenteUpdatePage.setDescripcionInput('descripcion'),
      tipoAgenteUpdatePage.agentesSelectLastOption()
    ]);
    expect(await tipoAgenteUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await tipoAgenteUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await tipoAgenteUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await tipoAgenteUpdatePage.save();
    expect(await tipoAgenteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoAgenteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoAgente', async () => {
    const nbButtonsBeforeDelete = await tipoAgenteComponentsPage.countDeleteButtons();
    await tipoAgenteComponentsPage.clickOnLastDeleteButton();

    tipoAgenteDeleteDialog = new TipoAgenteDeleteDialog();
    expect(await tipoAgenteDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.tipoAgente.delete.question');
    await tipoAgenteDeleteDialog.clickOnConfirmButton();

    expect(await tipoAgenteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
