import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { ResizeObserver } from '@juggle/resize-observer';
import model from './models/index.js';
import view from './views/index.js';
const { init, loadPPGData, state } = model;
const { ProfessorItemView } = view;

window.ResizeObserver = ResizeObserver;

init();

const data = loadPPGData('PROFESSORS', 1223);

data.then(() => {
  state.ppg_data.forEach((professorObj, index) => {
    const itemView = new ProfessorItemView(professorObj, [0, index]);
    itemView.append();
    console.log(itemView);
  });
  console.log(state.ppg_data);
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
