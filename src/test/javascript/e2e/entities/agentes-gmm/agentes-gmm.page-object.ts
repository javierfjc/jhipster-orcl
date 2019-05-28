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
  tipoTerminalSelect = element(by.id('field_tipoTerminal'));
  tipoAreaSelect = element(by.id('field_tipoArea'));
  tipoAgenteSelect = element(by.id('field_tipoAgente'));
  empresaSelect = element(by.id('field_empresa'));
  almacenSelect = element(by.id('field_almacen'));

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

  async tipoAreaSelectLastOption(timeout?: number) {
    await this.tipoAreaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoAreaSelectOption(option) {
    await this.tipoAreaSelect.sendKeys(option);
  }

  getTipoAreaSelect(): ElementFinder {
    return this.tipoAreaSelect;
  }

  async getTipoAreaSelectedOption() {
    return await this.tipoAreaSelect.element(by.css('option:checked')).getText();
  }

  async tipoAgenteSelectLastOption(timeout?: number) {
    await this.tipoAgenteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoAgenteSelectOption(option) {
    await this.tipoAgenteSelect.sendKeys(option);
  }

  getTipoAgenteSelect(): ElementFinder {
    return this.tipoAgenteSelect;
  }

  async getTipoAgenteSelectedOption() {
    return await this.tipoAgenteSelect.element(by.css('option:checked')).getText();
  }

  async empresaSelectLastOption(timeout?: number) {
    await this.empresaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async empresaSelectOption(option) {
    await this.empresaSelect.sendKeys(option);
  }

  getEmpresaSelect(): ElementFinder {
    return this.empresaSelect;
  }

  async getEmpresaSelectedOption() {
    return await this.empresaSelect.element(by.css('option:checked')).getText();
  }

  async almacenSelectLastOption(timeout?: number) {
    await this.almacenSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async almacenSelectOption(option) {
    await this.almacenSelect.sendKeys(option);
  }

  getAlmacenSelect(): ElementFinder {
    return this.almacenSelect;
  }

  async getAlmacenSelectedOption() {
    return await this.almacenSelect.element(by.css('option:checked')).getText();
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
