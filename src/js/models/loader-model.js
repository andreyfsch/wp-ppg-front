import config from '../configs/index.js';
import { state } from './interface-model.js';
import model from './model.js';
import AJAX from '../helper.js';
const {
  createResearchObject, createSubjectObject,
  createThesisObject, createProfessorObject,
  createStudentObject, createCourseObject,
  createProgramObject
} = model;

export const loadPPGData = async function (
  apiOption,
  programId = config.DEFAULT_COD_ORGAO,
  page = config.DEFAULT_PAGE,
  perPage = config.ITEMS_PER_PAGE
) {
  try {
    const data = await AJAX(
      config.API_URL +
      config.API_OPTIONS[apiOption] +
      config.API_PROGRAM_PARAM +
      programId +
      config.API_PER_PAGE_PARAM +
      page +
      config.API_PER_PAGE_PARAM +
      perPage
    );
    const results = [];
    switch (apiOption) {
      case 'RESEARCHES':
        data.items.forEach(
          (item) => { results.push(createResearchObject(item)); }
        );
        break;
      case 'SUBJECTS':
        data.disciplinas.forEach(
          (item) => { results.push(createSubjectObject(item)); }
        );
        break;
      case 'THESES':
        data.teses.forEach(
          (item) => { results.push(createThesisObject(item)); }
        );
        break;
      case 'PROFESSORS':
        data.docentes.forEach(
          (item) => { results.push(createProfessorObject(item)); }
        );
        break;
      case 'STUDENTS':
        data.items.forEach(
          (item) => { results.push(createStudentObject(item)); }
        );
        break;
      case 'COURSES':
        data.items.forEach(
          (item) => { results.push(createCourseObject(item)); }
        );
        break;
      case 'PROGRAMS':
        data.programas.forEach(
          (item) => { results.push(createProgramObject(item)); }
        );
        break;
    }

    state.ppg_data = results;

    const selectedItem = results.find(
      e => e.id === state.selected_item_id
    );

    if (selectedItem !== undefined) selectedItem.selected = true;
  } catch (err) {
    console.error(`Temp ereror handling: ${err}`);
    throw err;
  }
};

// export const loadSearchResults = async function (query) {
//   try {
//     state.search.query = query;

//     const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
//     console.log(data);

//     state.search.results = data.data.recipes.map((rec) => {
//       return {
//         id: rec.id,
//         title: rec.title,
//         publisher: rec.publisher,
//         image: rec.image_url,
//         ...(rec.key && { key: rec.key })
//       };
//     });
//     state.search.page = 1;
//   } catch (err) {
//     console.error(`${err} 💥💥💥💥`);
//     throw err;
//   }
// };
