/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoAreaComponentsPage, TipoAreaDeleteDialog, TipoAreaUpdatePage } from './tipo-area-gmm.page-object';

const expect = chai.expect;

describe('TipoArea e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoAreaUpdatePage: TipoAreaUpdatePage;
  let tipoAreaComponentsPage: TipoAreaComponentsPage;
  let tipoAreaDeleteDialog: TipoAreaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoAreas', async () => {
    await navBarPage.goToEntity('tipo-area-gmm');
    tipoAreaComponentsPage = new TipoAreaComponentsPage();
    await browser.wait(ec.visibilityOf(tipoAreaComponentsPage.title), 5000);
    expect(await tipoAreaComponentsPage.getTitle()).to.eq('jhipsterOrclApp.tipoArea.home.title');
  });

  it('should load create TipoArea page', async () => {
    await tipoAreaComponentsPage.clickOnCreateButton();
    tipoAreaUpdatePage = new TipoAreaUpdatePage();
    expect(await tipoAreaUpdatePage.getPageTitle()).to.eq('jhipsterOrclApp.tipoArea.home.createOrEditLabel');
    await tipoAreaUpdatePage.cancel();
  });

  it('should create and save TipoAreas', async () => {
    const nbButtonsBeforeCreate = await tipoAreaComponentsPage.countDeleteButtons();

    await tipoAreaComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoAreaUpdatePage.setCodigoInput('codigo'),
      tipoAreaUpdatePage.setTituloInput('titulo'),
      tipoAreaUpdatePage.setDescripcionInput('descripcion'),
      tipoAreaUpdatePage.agentesSelectLastOption()
    ]);
    expect(await tipoAreaUpdatePage.getCodigoInput()).to.eq('codigo', 'Expected Codigo value to be equals to codigo');
    expect(await tipoAreaUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await tipoAreaUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await tipoAreaUpdatePage.save();
    expect(await tipoAreaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoAreaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoArea', async () => {
    const nbButtonsBeforeDelete = await tipoAreaComponentsPage.countDeleteButtons();
    await tipoAreaComponentsPage.clickOnLastDeleteButton();

    tipoAreaDeleteDialog = new TipoAreaDeleteDialog();
    expect(await tipoAreaDeleteDialog.getDialogTitle()).to.eq('jhipsterOrclApp.tipoArea.delete.question');
    await tipoAreaDeleteDialog.clickOnConfirmButton();

    expect(await tipoAreaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
