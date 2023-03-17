import PpgItemView from './ppg-item-view.js';
import configs from '../configs/index.js';
const { CATEGORY_COLORS } = configs;

export class SubjectItemView extends PpgItemView {
  constructor (subjectModel) {
    super();
    this._model = subjectModel;
    this._categoryColorKeys = {
      D: CATEGORY_COLORS.blue,
      MA: CATEGORY_COLORS.red,
      MP: CATEGORY_COLORS.gold,
      E: CATEGORY_COLORS.green,
      A: CATEGORY_COLORS.grey,
      PD: CATEGORY_COLORS.orange,
      R: CATEGORY_COLORS.teal
    };
  }

  renderCategoryColor () {
    return CATEGORY_COLORS[this._model.levelAcronym];
  }

  hasCode () {
    return true;
  }

  renderCode () {
    return this._model.acronym;
  }

  renderCategory () {
    return this._model.level;
  }

  renderName () {
    return this._model.name;
  }

  _renderClasses () {
    return `
    <ul
      class="">
      ${this._renderClassesList()}
    </ul>`;
  }

  _renderClassesList () {
    return this._model.classes.map((classObj) => {
      return `
        <li
          class="">

        </li>
      `;
    });
  }

  renderDescription () {
    return `
      <span
        class="ppg-ufrgs-wp__description__span
        ppg-ufrgs-wp__description__span--between">
        ${this._generateDescriptionLabelProp('Modalidade',
          this._model.modality)}
        ${this._generateDescriptionLabelProp('N° de créditos',
          this._model.credits)}
      </span>
      <p
        class="ppg-ufrgs-wp__description__paragraph">
        <span
        ${this._model.summary}
      </p>
      <b
        class="ppg-ufrgs-wp__description__bold">
        Turmas
      </b>
      ${this._renderClasses()}
    `;
  }
}
