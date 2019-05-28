import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AlmacenesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-almacenes-gmm div table .btn-danger'));
  title = element.all(by.css('jhi-almacenes-gmm div h2#page-heading span')).first();

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

export class AlmacenesUpdatePage {
  pageTitle = element(by.id('jhi-almacenes-gmm-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  tituloInput = element(by.id('field_titulo'));
  fechaAltaInput = element(by.id('field_fechaAlta'));
  estadoInput = element(by.id('field_estado'));
  fechaEstadoInput = element(by.id('field_fechaEstado'));
  agentesSelect = element(by.id('field_agentes'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
  }

  async setTituloInput(titulo) {
    await this.tituloInput.sendKeys(titulo);
  }

  async getTituloInput() {
    return await this.tituloInput.getAttribute('value');
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

  async agentesSelectLastOption(timeout?: number) {
    await this.agentesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async agentesSelectOption(option) {
    await this.agentesSelect.sendKeys(option);
  }

  getAgentesSelect(): ElementFinder {
    return this.agentesSelect;
  }

  async getAgentesSelectedOption() {
    return await this.agentesSelect.element(by.css('option:checked')).getText();
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

export class AlmacenesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-almacenes-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-almacenes'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
