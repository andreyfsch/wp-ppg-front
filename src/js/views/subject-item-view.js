import PpgItemView from './ppg-item-view.js';

export class SubjectItemView extends PpgItemView {
  constructor (subjectModel) {
    super();
    this._model = subjectModel;
    this._categoryColorKeys = {
      D: this._categoryColors.blue,
      MA: this._categoryColorKeys.red,
      MP: this._categoryColors.gold,
      E: this._categoryColors.green,
      A: this._categoryColors.grey,
      PD: this._categoryColors.orange,
      R: this._categoryColorKeys.teal
    };
  }

  renderCategoryColor () {
    return this._categoryColors[this._model.levelAcronym];
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
