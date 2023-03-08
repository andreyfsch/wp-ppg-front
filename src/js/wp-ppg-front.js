import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { ResizeObserver } from '@juggle/resize-observer';
import model from './models/index.js';
import view from './views/index.js';
const { init, loadPPGData, state } = model;
const { ProfessorItemView } = view;

window.ResizeObserver = ResizeObserver;

init();

const data = loadPPGData('PROFESSORS');

data.then(console.log(state));

state.ppg_data.forEach((professorObj, index) => {
  console.log(professorObj);
  const itemView = new ProfessorItemView(professorObj, [0, index]);
  itemView.render();
});

// function handleDisplayLoader () {
//   document.querySelector('#ppg-ufrgs-wp-component__loader').classList.toggle('display--none');
//   document.querySelector('#ppg-ufrgs-wp-component__content').classList.toggle('display--none');
// }

// function handleItemChange (ev) {
//   section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');
//   section_listing.style.gridTemplateColumns = 'repeat( auto-fit, minmax(10rem, 1fr) )';
//   const details = document.querySelector('details.ppg-ufrgs-wp__details');
//   if (!details.classList.contains('ppg-ufrgs-wp__details--open')) {
//     openDetails(ev);
//   }
// }

// function createDivItem () {
//   const divItem = document.createElement('div');
//   divItem.className = 'ppg-ufrgs-wp__listing__item';
//   return divItem;
// }

// function createRadioItem (line, col) {
//   const radioButton = document.createElement('input');
//   radioButton.type = 'radio';
//   radioButton.name = 'ppg-ufrgs-wp__listing-item';
//   radioButton.id = 'ppg-ufrgs-wp__listing__item--' + line + '--' + col;
//   radioButton.className = 'ppg-ufrgs-wp__listing__item__rdo ' + line + '--' + col;
//   radioButton.addEventListener('change', handleItemChange());

//   return radioButton;
// }

// function createLabelItem (item, line, col) {
//   const rdoLabel = document.createElement('label');
//   rdoLabel.setAttribute('for', +line + '--' + col);
//   rdoLabel.className = 'ppg-ufrgs-wp__listing__item__label';

//   const content = createContentItem(item);

//   rdoLabel.appendChild(content);

//   return rdoLabel;
// }

// function createContentItem (item) {
//   const contentDiv = document.createElement('div');
//   contentDiv.className = 'ppg-ufrgs-wp__listing__item__conteudo';

//   const degree = createSpanCategoryItem(item);
//   const title = createTitleItem(item);
//   const name = createNameItem(item);
//   const description = createDescriptionItem(item);

//   contentDiv.appendChild(degree);
//   contentDiv.appendChild(title);
//   contentDiv.appendChild(name);
//   contentDiv.appendChild(description);

//   return contentDiv;
// }

// function createSpanCategoryItem (item) {
//   const category = document.createElement('span');
//   let degree = '';
//   if (item.NomeNivelCursoPG.startsWith('Dou')) {
//     degree = 'ppg-ufrgs-wp__listing__item__badge--doutorado';
//   } else if (item.NomeNivelCursoPG.startsWith('Mes')) {
//     degree = 'ppg-ufrgs-wp__listing__item__badge--mestrado';
//   } else {
//     degree = 'ppg-ufrgs-wp__listing__item__badge--outros';
//   }
//   category.className = 'ppg-ufrgs-wp__listing__item__badge ' + degree;
//   category.textContent = item.NomeNivelCursoPG;

//   return category;
// }

// function createTitleItem (item) {
//   const title = document.createElement('h3');
//   title.className = 'ppg-ufrgs-wp__heading ppg-ufrgs-wp__heading--tertiary ppg-ufrgs-wp__listing__item__cod';
//   title.textContent = item.Sigla;

//   return title;
// }

// function createNameItem (item) {
//   const itemName = document.createElement('h4');
//   itemName.className = 'ppg-ufrgs-wp__heading ppg-ufrgs-wp__heading--quaternary ppg-ufrgs-wp__listing__item__nome';
//   itemName.textContent = item.NomeDisciplina;

//   return itemName;
// }

// function createDescriptionItem (item) {
//   const description = document.createElement('p');
//   description.className = 'ppg-ufrgs-wp__listing__item__sumula';
//   description.textContent = item.Sumula;
//   $clamp(description, { clamp: 5 });

//   return description;
// }

// function createListingItem (item, line, col) {
//   const itemListagem = createDivItem();
//   const rdoListagem = createRadioItem(line, col);
//   const rdoLabel = createLabelItem(item, line, col);

//   itemListagem.appendChild(rdoListagem);
//   itemListagem.appendChild(rdoLabel);

//   return itemListagem;
// }

// function updateListagem (itemsListagem) {
//   const listagem = document.querySelector('section.ppg-ufrgs-wp-component__listing');

//   if (Array.isArray(itemsListagem) && itemsListagem.length > 0) {
//     itemsListagem.map((itemListagem) => {
//       let line; const col = calcMatrix(itemListagem, itemsListagem);
//       listagem.appendChild(createListingItem(itemListagem, line, col));
//     });
//   } else if (itemsListagem) {
//     listagem.appendChild(createListingItem(itemsListagem, 0, 0));
//   }
// }

// function watchGridArea () {
//   const section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');
//   const holder_width = section_listing.offsetWidth;
//   const listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
// }

// /**
//  * Calculates the number of rows and lines in the layout
//  * and handles grid areas.
//  */
// function correctCollapsedItems () {
//   const section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');
//   const holder_width = section_listing.offsetWidth;
//   const listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');

//   let collapsed_items = 0;
//   let items_width;
//   const gap = parseInt(window.getComputedStyle(section_listing).getPropertyValue('grid-gap').replace('px', ''));

//   listing_items.forEach(item => {
//     if (item.offsetWidth == Math.floor(0.01 * holder_width) ||
//       item.offsetWidth == Math.ceil(0.01 * holder_width)) {
//       collapsed_items += 1;
//     } else {
//       items_width = item.offsetWidth;
//     }
//   });

//   if (collapsed_items > 0) {
//     const num_columns = Math.floor(holder_width / (items_width + gap));
//     const num_lines = collapsed_items + 1;

//     const grid_capacity = num_columns * num_lines;
//     let new_lines = 0;

//     if (grid_capacity < listing_items.length) {
//       const empty_last_line = grid_capacity - (listing_items.length - collapsed_items);
//       new_lines = Math.ceil((collapsed_items - empty_last_line) / num_columns);
//     }

//     const total_lines = num_lines + new_lines;
//     const total_columns = num_columns + 1;

//     assignGridArea(total_lines, total_columns);
//   }

//   assignProperties();
// }

// /**
//  * Generates the grid-area property of every listing item in the layout
//  * and assings it to the elements' style.
//  * @param {number} total_lines - number of lines in layout grid.
//  * @param {number} total_columns - number of columns in layout grid.
//  */
// function assignItemsAreas (total_lines, total_columns) {
//   const listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
//   let item_count = 0;
//   const occupied_cells = [];

//   listing_items.forEach(item => {
//     item_count++;
//     let item_done = false;

//     for (let line = 0; line < total_lines; line++) {
//       for (let col = 0; col < total_columns; col++) {
//         if (item_count <= listing_items.length) {
//           if (!occupied_cells.includes('items-' + line + '-' + col)) {
//             item.style.gridArea = 'items-' + line + '-' + col;
//             occupied_cells.push('items-' + line + '-' + col);
//             item_done = true;
//             break;
//           }
//         }
//       }
//       if (item_done) {
//         break;
//       }
//     }
//   });
// }

// function openDetails (ev) {
//   const listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
//   const details = document.querySelector('details.ppg-ufrgs-wp__details');

//   details.classList.add('ppg-ufrgs-wp__details--open');

//   let num_lines = 0;
//   let num_columns = 0;
//   listing_items.forEach(item => {
//     const item_line = parseInt(window.getComputedStyle(item).getPropertyValue('grid-area').split('-')[1]);
//     const item_column = parseInt(window.getComputedStyle(item).getPropertyValue('grid-area').split('-')[2]);

//     if (item_line > num_lines) {
//       num_lines = item_line;
//     }
//     if (item_column > num_columns) {
//       num_columns = item_column;
//     }
//   });

//   num_columns++;
//   num_columns++;

//   console.log(num_columns);
//   console.log(num_lines);
//   assignGridArea(num_lines, num_columns, true);
//   toggleDetailsOpen(ev);
// }

// /**
//  * Assigns a new grid-areas property to the grid element
//  * and a new grid-area to the grid-item elements.
//  * @param {number} total_lines - number of lines in layout grid.
//  * @param {number} total_columns - number of columns in layout grid.
//  * @param {boolean} [layout_open=false] - flag to handle opened or closed layout.
//  */
// function assignGridArea (total_lines, total_columns, layout_open = false) {
//   const section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');

//   const grid_areas = genGridAreas(total_lines, total_columns, layout_open);

//   section_listing.style.gridTemplateAreas = grid_areas;

//   assignItemsAreas(total_lines, total_columns, layout_open);
// }

// /**
//  * Generates the grid-areas property of the grid element in the layout
//  * and returns it.
//  * @param {number} total_lines - number of lines in layout grid.
//  * @param {number} total_columns - number of columns in layout grid.
//  * @param {boolean} [layout_open=false] - flag to handle opened or closed layout.
//  * @returns {string} grid-areas - generated grid-area.
//  */
// function genGridAreas (total_lines, total_columns, layout_open = false) {
//   let grid_areas = '';
//   let assigned_areas = 0;
//   const listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
//   const num_items = listing_items.length;

//   total_columns = layout_open ? total_columns - 1 : total_columns;

//   for (let line = 0; line < total_lines; line++) {
//     grid_areas += '\"';
//     for (let col = 0; col < total_columns; col++) {
//       if (col == 0 && !layout_open) {
//         if (line < 2) {
//           grid_areas += 'details ';
//         } else {
//           grid_areas += '. ';
//         }
//         continue;
//       }

//       if (col <= 2 && line < 2 && layout_open) {
//         grid_areas += 'details ';
//         continue;
//       }

//       if (assigned_areas < num_items) {
//         grid_areas += 'items--' + line + '--' + col;
//         assigned_areas++;
//       } else {
//         grid_areas += '.';
//       }

//       if (col < total_columns - 1) {
//         grid_areas += ' ';
//       }
//     }
//     grid_areas += '\"';

//     if (line < total_lines - 1) {
//       grid_areas += ' ';
//     }
//   }

//   return grid_areas;
// }

// function assignProperties () {
//   const details = document.querySelector('details.ppg-ufrgs-wp__details');
//   const detailContent = details;
//   const detailClosedWidth = details.scrollWidth;
//   // open the details to get the height of the content
//   details.open = true;
//   // pass it to the the element as CSS property
//   detailContent.style.setProperty('--details-content-width-open', detailContent.scrollWidth + 'px');
//   details.style.setProperty('--details-width-open', detailContent.scrollWidth + detailClosedWidth + 'px');
//   // close the details again
//   details.open = false;

//   detailContent.style.setProperty('--details-content-width-closed', detailContent.scrollWidth + 'px');
//   details.style.setProperty('--details-width-closed', detailClosedWidth + 'px');

//   details.addEventListener('toggle', (ev) => toggleDetailsOpen(ev));
//   window.addEventListener('resize', (ev) => {
//     // if the details is open, adjust height
//     if (details.classList.contains('is--open')) {
//       detailContent.style.setProperty('--details-width-open', detailContent.scrollWidth + 'px');
//     }
//   });
// }

// function toggleDetailsOpen (ev) {
//   const container = document.querySelector('details.ppg-ufrgs-wp__details');

//   const timeout = 2000;

//   // we can't use [open] as it will be only removed after the transition
//   container.classList.toggle('is--open');

//   // remove the open attribute once the transition is done, because otherwise we won't see the transition
//   if (container.open) {
//     ev.preventDefault();
//     setTimeout(function () {
//       container.open = false;
//     }, parseInt(timeout));
//   }
// }

// // document.addEventListener('DOMContentLoaded', carregaDisciplinas());
// // document.addEventListener('resize', correctCollapsedItems());
