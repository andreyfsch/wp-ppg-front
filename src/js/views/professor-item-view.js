import PpgItemView from './ppg-item-view.js';
import configs from '../configs/index.js';
const { CATEGORY_COLORS } = configs;

export default class ProfessorItemView extends PpgItemView {
  constructor (professorModel, coords) {
    super(professorModel, coords);
    this._categoryColorKeys = {
      1: CATEGORY_COLORS.blue,
      2: CATEGORY_COLORS.gold,
      3: CATEGORY_COLORS.orange,
      4: CATEGORY_COLORS.green
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
    return this._model.name;
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
