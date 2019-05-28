import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoEnlaceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-enlace-gmm div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-enlace-gmm div h2#page-heading span')).first();

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

export class TipoEnlaceUpdatePage {
  pageTitle = element(by.id('jhi-tipo-enlace-gmm-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  tituloInput = element(by.id('field_titulo'));
  descripcionInput = element(by.id('field_descripcion'));
  tipoTerminalSelect = element(by.id('field_tipoTerminal'));

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

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async tipoTerminalSelectLastOption(timeout?: number) {
    await this.tipoTerminalSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoTerminalSelectOption(option) {
    await this.tipoTerminalSelect.sendKeys(option);
  }

  getTipoTerminalSelect(): ElementFinder {
    return this.tipoTerminalSelect;
  }

  async getTipoTerminalSelectedOption() {
    return await this.tipoTerminalSelect.element(by.css('option:checked')).getText();
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

export class TipoEnlaceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoEnlace-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoEnlace'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
