import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EmpresasComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-empresas-gmm div table .btn-danger'));
  title = element.all(by.css('jhi-empresas-gmm div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EmpresasUpdatePage {
  pageTitle = element(by.id('jhi-empresas-gmm-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  descripcionInput = element(by.id('field_descripcion'));
  tituloInput = element(by.id('field_titulo'));
  cifInput = element(by.id('field_cif'));
  fechaAltaInput = element(by.id('field_fechaAlta'));
  estadoInput = element(by.id('field_estado'));
  fechaEstadoInput = element(by.id('field_fechaEstado'));
  exclusivaInput = element(by.id('field_exclusiva'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setTituloInput(titulo) {
    await this.tituloInput.sendKeys(titulo);
  }

  async getTituloInput() {
    return await this.tituloInput.getAttribute('value');
  }

  async setCifInput(cif) {
    await this.cifInput.sendKeys(cif);
  }

  async getCifInput() {
    return await this.cifInput.getAttribute('value');
  }

  async setFechaAltaInput(fechaAlta) {
    await this.fechaAltaInput.sendKeys(fechaAlta);
  }

  async getFechaAltaInput() {
    return await this.fechaAltaInput.getAttribute('value');
  }

  async setEstadoInput(estado) {
    await this.estadoInput.sendKeys(estado);
  }

  async getEstadoInput() {
    return await this.estadoInput.getAttribute('value');
  }

  async setFechaEstadoInput(fechaEstado) {
    await this.fechaEstadoInput.sendKeys(fechaEstado);
  }

  async getFechaEstadoInput() {
    return await this.fechaEstadoInput.getAttribute('value');
  }

  async setExclusivaInput(exclusiva) {
    await this.exclusivaInput.sendKeys(exclusiva);
  }

  async getExclusivaInput() {
    return await this.exclusivaInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EmpresasDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-empresas-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-empresas'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
