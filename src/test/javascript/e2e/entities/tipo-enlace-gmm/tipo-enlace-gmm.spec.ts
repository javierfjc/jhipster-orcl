/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoEnlaceComponentsPage, TipoEnlaceDeleteDialog, TipoEnlaceUpdatePage } from './tipo-enlace-gmm.page-object';

const expect = chai.expect;

describe('TipoEnlace e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoEnlaceUpdatePage: TipoEnlaceUpdatePage;
  let tipoEnlaceComponentsPage: TipoEnlaceComponentsPage;
  let tipoEnlaceDeleteDialog: TipoEnlaceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoEnlaces', async () => {
    await navBarPage.goToEntity('tipo-enlace-gmm');
    tipoEnlaceComponentsPage = new TipoEnlaceComponentsPage();
    await browser.wait(ec.visibilityOf(tipoEnlaceComponentsPage.title), 5000);
    expect(await tipoEnlaceComponentsPage.getTitle()).to.eq('jhipsterOrclApp.tipoEnlace.home.title');
  });

  it('should load create TipoEnlace page', async () => {
    await tipoEnlaceComponentsPage.clickOnCreateButton();
    tipoEnlaceUpdatePage = new TipoEnlaceUpdatePage();
    expect(await tipoEnlaceUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.tipoEnlace.home.createOrEditLabel');
    await tipoEnlaceUpdatePage.cancel();
  });

  it('should create and save TipoEnlaces', async () => {
    const nbButtonsBeforeCreate = await tipoEnlaceComponentsPage.countDeleteButtons();

    await tipoEnlaceComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoEnlaceUpdatePage.setCodigoInput('codigo'),
      tipoEnlaceUpdatePage.setTituloInput('titulo'),
      tipoEnlaceUpdatePage.setDescripcionInput('descripcion'),
      tipoEnlaceUpdatePage.tipoTerminalSelectLastOption()
    ]);
    expect(await tipoEnlaceUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await tipoEnlaceUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await tipoEnlaceUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await tipoEnlaceUpdatePage.save();
    expect(await tipoEnlaceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoEnlaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoEnlace', async () => {
    const nbButtonsBeforeDelete = await tipoEnlaceComponentsPage.countDeleteButtons();
    await tipoEnlaceComponentsPage.clickOnLastDeleteButton();

    tipoEnlaceDeleteDialog = new TipoEnlaceDeleteDialog();
    expect(await tipoEnlaceDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.tipoEnlace.delete.question');
    await tipoEnlaceDeleteDialog.clickOnConfirmButton();

    expect(await tipoEnlaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
