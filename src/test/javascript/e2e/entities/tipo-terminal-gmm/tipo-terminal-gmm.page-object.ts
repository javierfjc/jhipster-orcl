import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoTerminalComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-terminal-gmm div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-terminal-gmm div h2#page-heading span')).first();

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

export class TipoTerminalUpdatePage {
  pageTitle = element(by.id('jhi-tipo-terminal-gmm-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  tituloInput = element(by.id('field_titulo'));
  descripcionInput = element(by.id('field_descripcion'));
  pathEnvioInput = element(by.id('field_pathEnvio'));
  pathRecibirInput = element(by.id('field_pathRecibir'));
  contadorInput = element(by.id('field_contador'));
  controlVisitasSelect = element(by.id('field_controlVisitas'));
  controlCobrosSelect = element(by.id('field_controlCobros'));
  tipoImporteDto1Select = element(by.id('field_tipoImporteDto1'));
  tipoImporteDto2Select = element(by.id('field_tipoImporteDto2'));
  tipoImporteDto3Select = element(by.id('field_tipoImporteDto3'));
  tipoEnlaceSelect = element(by.id('field_tipoEnlace'));

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

  async setPathEnvioInput(pathEnvio) {
    await this.pathEnvioInput.sendKeys(pathEnvio);
  }

  async getPathEnvioInput() {
    return await this.pathEnvioInput.getAttribute('value');
  }

  async setPathRecibirInput(pathRecibir) {
    await this.pathRecibirInput.sendKeys(pathRecibir);
  }

  async getPathRecibirInput() {
    return await this.pathRecibirInput.getAttribute('value');
  }

  async setContadorInput(contador) {
    await this.contadorInput.sendKeys(contador);
  }

  async getContadorInput() {
    return await this.contadorInput.getAttribute('value');
  }

  async setControlVisitasSelect(controlVisitas) {
    await this.controlVisitasSelect.sendKeys(controlVisitas);
  }

  async getControlVisitasSelect() {
    return await this.controlVisitasSelect.element(by.css('option:checked')).getText();
  }

  async controlVisitasSelectLastOption(timeout?: number) {
    await this.controlVisitasSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setControlCobrosSelect(controlCobros) {
    await this.controlCobrosSelect.sendKeys(controlCobros);
  }

  async getControlCobrosSelect() {
    return await this.controlCobrosSelect.element(by.css('option:checked')).getText();
  }

  async controlCobrosSelectLastOption(timeout?: number) {
    await this.controlCobrosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTipoImporteDto1Select(tipoImporteDto1) {
    await this.tipoImporteDto1Select.sendKeys(tipoImporteDto1);
  }

  async getTipoImporteDto1Select() {
    return await this.tipoImporteDto1Select.element(by.css('option:checked')).getText();
  }

  async tipoImporteDto1SelectLastOption(timeout?: number) {
    await this.tipoImporteDto1Select
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTipoImporteDto2Select(tipoImporteDto2) {
    await this.tipoImporteDto2Select.sendKeys(tipoImporteDto2);
  }

  async getTipoImporteDto2Select() {
    return await this.tipoImporteDto2Select.element(by.css('option:checked')).getText();
  }

  async tipoImporteDto2SelectLastOption(timeout?: number) {
    await this.tipoImporteDto2Select
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTipoImporteDto3Select(tipoImporteDto3) {
    await this.tipoImporteDto3Select.sendKeys(tipoImporteDto3);
  }

  async getTipoImporteDto3Select() {
    return await this.tipoImporteDto3Select.element(by.css('option:checked')).getText();
  }

  async tipoImporteDto3SelectLastOption(timeout?: number) {
    await this.tipoImporteDto3Select
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoEnlaceSelectLastOption(timeout?: number) {
    await this.tipoEnlaceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoEnlaceSelectOption(option) {
    await this.tipoEnlaceSelect.sendKeys(option);
  }

  getTipoEnlaceSelect(): ElementFinder {
    return this.tipoEnlaceSelect;
  }

  async getTipoEnlaceSelectedOption() {
    return await this.tipoEnlaceSelect.element(by.css('option:checked')).getText();
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

export class TipoTerminalDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoTerminal-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoTerminal'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
