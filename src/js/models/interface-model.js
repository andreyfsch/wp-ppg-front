import ITEMS_PER_PAGE from '../configs/index.js';

export const state = {
  ppg_data: [],
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: ITEMS_PER_PAGE
  },
  selected_item_id: ''
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

const persistSelectedItem = function () {
  window.localStorage.setItem(
    'PPG-SelectedItem',
    JSON.stringify(state.selected_item_id)
  );
};

export const selectItem = function (item) {
  state.selected_item_id = item.id;

  state.ppg_data.forEach((el) => {
    if (el.id === item.id) el.selected = true;
  });

  persistSelectedItem();
};

export const deleteSelection = function (id) {
  // Delete bookmark
  const index = state.ppg_data.findIndex((el) => el.id === id);
  state.ppg_data.splice(index, 1);

  // Mark item as NOT selected
  state.ppg_data.forEach((el) => {
    if (el.id === state.selected_item_id) el.selected = false;
  });

  persistSelectedItem();
};

export const init = function () {
  const storage = window.localStorage.getItem('PPG-SelectedItem');
  if (storage) state.selected_item_id = JSON.parse(storage);
};
init();

export const clearSelection = function () {
  window.localStorage.clear('PPG-SelectedItem');
};
