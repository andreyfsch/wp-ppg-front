import PpgItemView from './ppg-item-view.js';

export class ProfessorItemView extends PpgItemView {
  constructor (professorModel, coords) {
    super(professorModel, coords);
    this._categoryColorKeys = {
      1: this._categoryColors.blue,
      2: this._categoryColors.gold,
      3: this._categoryColors.orange,
      4: this._categoryColors.green
    };
  }

  _renderCategoryColor () {
    let color;
    const bondId = this._model.accreditation.bondId;
    if (bondId in this._categoryColorKeys) {
      color = this._categoryColorKeys[bondId];
    } else {
      color = this._categoryColorKeys.grey;
    }
    return color;
  }

  _hasCode () {
    return false;
  }

  _renderCode () {
    return '';
  }

  _renderCategory () {
    return this._model.accreditation.bond;
  }

  _renderName () {
    return this._model.accreditation.name;
  }

  _renderDescription () {
    const start = this._model.accreditation.start;
    const end = this._model.accreditation.end;
    const until = end === undefined ? '' : ' até ' + end;
    return `
      <p
        class="ppg-ufrgs-wp__description__paragraph">
        <b
          class="ppg-ufrgs-wp__description__bold">
          ${this._model.accreditation.scope}
        </b>
        <span
          class="ppg-ufrgs-wp__description__span">
          Desde ${start}${until}
        </span>
        <a
          target="_blank"
          href="${this._model.accreditation.lattesUrl}"
          class="ppg-ufrgs-wp__description__link">
          Currículo Lattes - CNPq
        </a>
      </p>
    `;
  }
}
