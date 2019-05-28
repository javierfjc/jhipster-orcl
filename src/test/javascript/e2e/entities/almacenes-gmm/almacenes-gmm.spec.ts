/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlmacenesComponentsPage, AlmacenesDeleteDialog, AlmacenesUpdatePage } from './almacenes-gmm.page-object';

const expect = chai.expect;

describe('Almacenes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let almacenesUpdatePage: AlmacenesUpdatePage;
  let almacenesComponentsPage: AlmacenesComponentsPage;
  let almacenesDeleteDialog: AlmacenesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Almacenes', async () => {
    await navBarPage.goToEntity('almacenes-gmm');
    almacenesComponentsPage = new AlmacenesComponentsPage();
    await browser.wait(ec.visibilityOf(almacenesComponentsPage.title), 5000);
    expect(await almacenesComponentsPage.getTitle()).to.eq('jhipsterOrclApp.almacenes.home.title');
  });

  it('should load create Almacenes page', async () => {
    await almacenesComponentsPage.clickOnCreateButton();
    almacenesUpdatePage = new AlmacenesUpdatePage();
    expect(await almacenesUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.almacenes.home.createOrEditLabel');
    await almacenesUpdatePage.cancel();
  });

  it('should create and save Almacenes', async () => {
    const nbButtonsBeforeCreate = await almacenesComponentsPage.countDeleteButtons();

    await almacenesComponentsPage.clickOnCreateButton();
    await promise.all([
      almacenesUpdatePage.setCodigoInput('codigo'),
      almacenesUpdatePage.setTituloInput('titulo'),
      almacenesUpdatePage.setFechaAltaInput('2000-12-31'),
      almacenesUpdatePage.setEstadoInput('estado'),
      almacenesUpdatePage.setFechaEstadoInput('2000-12-31')
    ]);
    expect(await almacenesUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await almacenesUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await almacenesUpdatePage.getFechaAltaInput()).to.eq('2000-12-31', 'Expected fechaAlta value to be equals to 2000-12-31');
    expect(await almacenesUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await almacenesUpdatePage.getFechaEstadoInput()).to.eq('2000-12-31', 'Expected fechaEstado value to be equals to 2000-12-31');
    await almacenesUpdatePage.save();
    expect(await almacenesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await almacenesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Almacenes', async () => {
    const nbButtonsBeforeDelete = await almacenesComponentsPage.countDeleteButtons();
    await almacenesComponentsPage.clickOnLastDeleteButton();

    almacenesDeleteDialog = new AlmacenesDeleteDialog();
    expect(await almacenesDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.almacenes.delete.question');
    await almacenesDeleteDialog.clickOnConfirmButton();

    expect(await almacenesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
