import View from './view.js';
// import icons from 'url:../../icons/icon-sheet.svg';

const ABSTRACT_ERROR_MSG = 'Base class must not be instantiated.';

export default class PpgItemView extends View {
  constructor (model, coords) {
    super();
    if (this.constructor === PpgItemView) {
      throw new Error(ABSTRACT_ERROR_MSG);
    }
    this._model = model;
    this._handleCoords(coords);
    this._parentElement = document.querySelector(
      '.ppg-ufrgs-wp-component__listing'
    );
    this._categoryClassName = 'ppg-ufrgs-wp__badge';
    this._handleCode();
  }

  addHandlerClick (handler) {
    this.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _handleCoords (coords) {
    if (Array.isArray(coords)) {
      if (coords.length === 2) {
        this._pos = `${coords[0]}--${coords[1]}`;
        this._grid = true;
        this._xPos = coords[0];
        this._yPos = coords[1];
      } else if (coords.length < 2) {
        this._grid = false;
        this._pos = coords[0];
      } else {
        throw new RangeError('PPG item is either 1 or 2 dimentional.');
      }
    } else {
      throw new TypeError('PPG item requires coordinates to be Array.');
    }
  }

  _handleCode () {
    this._classNameCode = 'ppg-ufrgs-wp__content';
    if (this._hasCode()) {
      this._code = this._generateCode();
      this._classNameCode += ' ppg-ufrgs-wp__content--code';
    } else {
      this._code = '';
    }
  }

  _generateDescriptionLabelProp (label, prop) {
    return `
      <b
        class="ppg-ufrgs-wp__description__bold
          ppg-ufrgs-wp__description__bold--label">
        ${label}
      </b>
      <span
        class="ppg-ufrgs-wp__description__span
          ppg-ufrgs-wp__description__span--prop">
        ${prop}
      </span>
    `;
  }

  _generateCode () {
    return `
      <h3
        class="ppg-ufrgs-wp__heading
        ppg-ufrgs-wp__heading--tertiary
        ppg-ufrgs-wp__code">
        ${this._renderCode()}
      </h3>
    `;
  }

  _generateName () {
    const header = this._hasCode() ? 'h4' : 'h3';
    return `
    <${header}
      class="ppg-ufrgs-wp__heading
      ppg-ufrgs-wp__heading--quaternary
      ppg-ufrgs-wp__name">
      ${this._renderName()}
    </${header}>
    `;
  }

  _generateRadio () {
    return `
      <input
        type="radio"
        name="ppg-ufrgs-wp__listing-item"
        id="ppg-ufrgs-wp__listing-item--${this._pos}"
        class="ppg-ufrgs-wp__rdo" />
    `;
  }

  _generateLabel () {
    return `
      <label
        for="ppg-ufrgs-wp__listing-item--${this._pos}"
        class="ppg-ufrgs-wp__label">
    `;
  }

  _generateCategory () {
    const color = this._renderCategoryColor();
    const refClassName = this._categoryClassName;
    const finalClassName = refClassName + ' ' + refClassName + '--' + color;
    return `
      <span
        class="${finalClassName}">
        ${this._renderCategory()}
      </span>
    `;
  }

  _generateMarkup () {
    return `
      <div 
        class="ppg-ufrgs-wp__listing-item
          ppg-ufrgs-wp__listing-item--${this._pos}">
        ${this._generateRadio()}
        ${this._generateLabel()}
        <div
          class="${this._classNameCode}">
          ${this._generateCategory()}
          ${this._code}
          ${this._generateName()}
          <div
            class="ppg-ufrgs-wp__description">
            ${this._renderDescription()}
          </div>
        </div>
        </label>
      </div>
    `;
  }

  _renderCategoryColor () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }

  _hasCode () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }

  _renderCode () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }

  _renderCategory () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }

  _renderName () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }

  _renderDescription () {
    throw new Error(ABSTRACT_ERROR_MSG);
  }
}
