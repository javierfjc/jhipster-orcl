/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmpresasComponentsPage, EmpresasDeleteDialog, EmpresasUpdatePage } from './empresas-gmm.page-object';

const expect = chai.expect;

describe('Empresas e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empresasUpdatePage: EmpresasUpdatePage;
  let empresasComponentsPage: EmpresasComponentsPage;
  let empresasDeleteDialog: EmpresasDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Empresas', async () => {
    await navBarPage.goToEntity('empresas-gmm');
    empresasComponentsPage = new EmpresasComponentsPage();
    await browser.wait(ec.visibilityOf(empresasComponentsPage.title), 5000);
    expect(await empresasComponentsPage.getTitle()).to.eq('jhipsterOrclApp.empresas.home.title');
  });

  it('should load create Empresas page', async () => {
    await empresasComponentsPage.clickOnCreateButton();
    empresasUpdatePage = new EmpresasUpdatePage();
    expect(await empresasUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.empresas.home.createOrEditLabel');
    await empresasUpdatePage.cancel();
  });

  it('should create and save Empresas', async () => {
    const nbButtonsBeforeCreate = await empresasComponentsPage.countDeleteButtons();

    await empresasComponentsPage.clickOnCreateButton();
    await promise.all([
      empresasUpdatePage.setCodigoInput('codigo'),
      empresasUpdatePage.setDescripcionInput('descripcion'),
      empresasUpdatePage.setTituloInput('titulo'),
      empresasUpdatePage.setCifInput('cif'),
      empresasUpdatePage.setFechaAltaInput('2000-12-31'),
      empresasUpdatePage.setEstadoInput('estado'),
      empresasUpdatePage.setFechaEstadoInput('2000-12-31'),
      empresasUpdatePage.setExclusivaInput('exclusiva')
    ]);
    expect(await empresasUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await empresasUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await empresasUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await empresasUpdatePage.getCifInput()).to.eq('cif', 'Expected Cif value to be equals to cif');
    expect(await empresasUpdatePage.getFechaAltaInput()).to.eq('2000-12-31', 'Expected fechaAlta value to be equals to 2000-12-31');
    expect(await empresasUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await empresasUpdatePage.getFechaEstadoInput()).to.eq('2000-12-31', 'Expected fechaEstado value to be equals to 2000-12-31');
    expect(await empresasUpdatePage.getExclusivaInput()).to.eq('exclusiva', 'Expected Exclusiva value to be equals to exclusiva');
    await empresasUpdatePage.save();
    expect(await empresasUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await empresasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Empresas', async () => {
    const nbButtonsBeforeDelete = await empresasComponentsPage.countDeleteButtons();
    await empresasComponentsPage.clickOnLastDeleteButton();

    empresasDeleteDialog = new EmpresasDeleteDialog();
    expect(await empresasDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.empresas.delete.question');
    await empresasDeleteDialog.clickOnConfirmButton();

    expect(await empresasComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
