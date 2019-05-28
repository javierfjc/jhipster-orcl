import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AgentesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-agentes-gmm div table .btn-danger'));
  title = element.all(by.css('jhi-agentes-gmm div h2#page-heading span')).first();

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

export class AgentesUpdatePage {
  pageTitle = element(by.id('jhi-agentes-gmm-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  descripcionInput = element(by.id('field_descripcion'));
  fechaAltaInput = element(by.id('field_fechaAlta'));
  estadoInput = element(by.id('field_estado'));
  fechaEstadoInput = element(by.id('field_fechaEstado'));
  tpNumeroInput = element(by.id('field_tpNumero'));
  tpRegalosSelect = element(by.id('field_tpRegalos'));

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

  async setTpNumeroInput(tpNumero) {
    await this.tpNumeroInput.sendKeys(tpNumero);
  }

  async getTpNumeroInput() {
    return await this.tpNumeroInput.getAttribute('value');
  }

  async setTpRegalosSelect(tpRegalos) {
    await this.tpRegalosSelect.sendKeys(tpRegalos);
  }

  async getTpRegalosSelect() {
    return await this.tpRegalosSelect.element(by.css('option:checked')).getText();
  }

  async tpRegalosSelectLastOption(timeout?: number) {
    await this.tpRegalosSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class AgentesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-agentes-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-agentes'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
