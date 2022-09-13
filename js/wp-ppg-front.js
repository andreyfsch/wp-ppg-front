const BASE_URL = 'https://cors-container.herokuapp.com/https://api.ufrgs.br/v2/pos-graduacao'; //VERIFICAR FUNCIONAMENTO NO WORDPRESS

axios.interceptors.request.use((config) => {
    handleDisplayLoader();
    return config;
}, (error) => {
    return Promise.reject(error);
});

const consomeAPI = async (endpoint, param, key) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}/${param}`,);

        const dados = response.data.data[key];

        return dados;
    } catch (err) { console.log(err) };
};

const handleDisplayLoader = () => {
    document.querySelector('#ppg-ufrgs-wp-component__loader').classList.toggle('display--none');
    document.querySelector('#ppg-ufrgs-wp-component__content').classList.toggle('display--none');
}

//  <div class="ppg-ufrgs-wp__listing__item"><input type="radio"
//     name="ppg-ufrgs-wp__listing-item" id="ppg-ufrgs-wp__listing__item--1"
//     class="ppg-ufrgs-wp__listing__item__rdo"><label for="ppg-ufrgs-wp__listing__item--1"
//         class="ppg-ufrgs-wp__listing__item__label"></label>
// </div> 

const criarItemListagem = (item, index) => {

    let itemListagem = document.createElement('div');
    itemListagem.className = 'ppg-ufrgs-wp__listing__item';

    let rdoListagem = document.createElement('input');
    rdoListagem.type = 'radio';
    rdoListagem.name = 'ppg-ufrgs-wp__listing-item';
    rdoListagem.id = 'ppg-ufrgs-wp__listing__item--' + index;
    rdoListagem.className = 'ppg-ufrgs-wp__listing__item__rdo';
    rdoListagem.addEventListener('change', (ev) => {
        section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');
        section_listing.style.gridTemplateColumns = "repeat( auto-fit, minmax(20rem, 1fr) )";
        openDetails(ev);
    });

    let rdoLabel = document.createElement('label');
    rdoLabel.setAttribute('for', 'ppg-ufrgs-wp__listing__item--' + index);
    rdoLabel.className = 'ppg-ufrgs-wp__listing__item__label';


    let conteudoItem = document.createElement('div');
    conteudoItem.className = 'ppg-ufrgs-wp__listing__item__conteudo';

    let tituloItem = document.createElement('h3');
    tituloItem.className = 'ppg-ufrgs-wp__heading ppg-ufrgs-wp__heading--tertiary';
    tituloItem.innerHTML = item.Sigla;
    conteudoItem.appendChild(tituloItem);

    let nomeItem = document.createElement('h4');
    nomeItem.className = 'ppg-ufrgs-wp__heading ppg-ufrgs-wp__heading--quaternary';
    nomeItem.innerHTML = item.NomeDisciplina;
    conteudoItem.appendChild(nomeItem);




    rdoLabel.appendChild(conteudoItem);

    itemListagem.appendChild(rdoListagem);
    itemListagem.appendChild(rdoLabel);


    return itemListagem;
};

const updateListagem = itemsListagem => {
    let listagem = document.querySelector('section.ppg-ufrgs-wp-component__listing');

    if (Array.isArray(itemsListagem) && itemsListagem.length > 0) {
        itemsListagem.map((itemListagem, index) => {
            listagem.appendChild(criarItemListagem(itemListagem, index));
        });
    } else if (itemsListagem) {
        listagem.appendChild(criarItemListagem(itemsListagem, 0));
    }
};

const carregaDisciplinas = async () => {
    updateListagem(await consomeAPI('disciplinas/programa', 443, 'disciplinas'));
    handleDisplayLoader();
};

/**
 * Calculates the number of rows and lines in the layout
 * and handles grid areas.
 */
function correctCollapsedItems() {
    var section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');
    var holder_width = section_listing.offsetWidth;
    var listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');

    var collapsed_items = 0;
    var items_width;
    var gap = parseInt(window.getComputedStyle(section_listing).getPropertyValue('grid-gap').replace('px', ''));

    listing_items.forEach(item => {
        if (item.offsetWidth == Math.floor(0.01 * holder_width)
            || item.offsetWidth == Math.ceil(0.01 * holder_width)) {
            collapsed_items += 1;
        } else {
            items_width = item.offsetWidth;
        }
    });

    if (collapsed_items > 0) {
        var num_columns = Math.floor(holder_width / (items_width + gap));
        var num_lines = collapsed_items + 1;

        var grid_capacity = num_columns * num_lines;
        var new_lines = 0;

        if (grid_capacity < listing_items.length) {
            var empty_last_line = grid_capacity - (listing_items.length - collapsed_items);
            new_lines = Math.ceil((collapsed_items - empty_last_line) / num_columns);
        }

        var total_lines = num_lines + new_lines;
        var total_columns = num_columns + 1;

        assignGridArea(total_lines, total_columns);
    }

    assignProperties();
}

/**
 * Generates the grid-area property of every listing item in the layout
 * and assings it to the elements' style.
 * @param {number} total_lines - number of lines in layout grid.
 * @param {number} total_columns - number of columns in layout grid.
 * @param {boolean} [layout_open=false] - flag to handle opened or closed layout.
 */
function assignItemsAreas(total_lines, total_columns, layout_open = false) {
    var listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
    var start_col = layout_open ? 0 : 1;
    var stop_col = layout_open ? total_columns - 1 : total_columns;
    var item_count = 0;
    var occupied_cells = [];

    listing_items.forEach(item => {
        item_count++;
        var item_done = false;

        for (let line = 0; line < total_lines; line++) {
            for (let col = start_col; col < stop_col; col++) {
                if (line == 0 && col == 0 //details 
                    || (line == 1 && col == 0)) {
                    continue;
                }
                if (item_count <= listing_items.length) {

                    if (!occupied_cells.includes('items-' + line + '-' + col)) {
                        item.style.gridArea = 'items-' + line + '-' + col;
                        occupied_cells.push('items-' + line + '-' + col);
                        item_done = true;
                        break;
                    }
                }
            }
            if (item_done) {
                break;
            }
        }

    });
}

function openDetails(ev) {
    var listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
    var details = document.querySelector('details.ppg-ufrgs-wp__details');

    var num_lines = 0;
    var num_columns = 0;
    listing_items.forEach(item => {
        let item_line = parseInt(window.getComputedStyle(item).getPropertyValue('grid-area').split('-')[1]);
        let item_column = parseInt(window.getComputedStyle(item).getPropertyValue('grid-area').split('-')[2]);

        if (item_line > num_lines) {
            num_lines = item_line;
        }
        if (item_column > num_columns) {
            num_columns = item_column;
        }
    });
    num_lines++;
    num_columns++;
    assignGridArea(num_lines, num_columns, true);
    toggleDetailsOpen(ev);
}


/**
 * Assigns a new grid-areas property to the grid element
 * and a new grid-area to the grid-item elements.
 * @param {number} total_lines - number of lines in layout grid.
 * @param {number} total_columns - number of columns in layout grid.
 * @param {boolean} [layout_open=false] - flag to handle opened or closed layout.
 */
function assignGridArea(total_lines, total_columns, layout_open = false) {
    var section_listing = document.querySelector('section.ppg-ufrgs-wp-component__listing');

    var grid_areas = genGridAreas(total_lines, total_columns, layout_open);

    section_listing.style.gridTemplateAreas = grid_areas;

    assignItemsAreas(total_lines, total_columns, layout_open);
}

/**
 * Generates the grid-areas property of the grid element in the layout
 * and returns it.
 * @param {number} total_lines - number of lines in layout grid.
 * @param {number} total_columns - number of columns in layout grid.
 * @param {boolean} [layout_open=false] - flag to handle opened or closed layout.
 * @returns {string} grid-areas - generated grid-area.
 */
function genGridAreas(total_lines, total_columns, layout_open = false) {
    var grid_areas = '';
    var assigned_areas = 0;
    var listing_items = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
    var num_items = listing_items.length;

    total_columns = layout_open ? total_columns - 1 : total_columns;

    for (let line = 0; line < total_lines; line++) {
        grid_areas += '\"';
        for (let col = 0; col < total_columns; col++) {
            if (col == 0) {
                if (line < 2) {
                    grid_areas += 'details';
                } else {
                    if (layout_open) {
                        grid_areas += 'items-' + line + '-' + col;
                        assigned_areas++;
                    } else {
                        grid_areas += '.';
                    }
                }
            } else if (assigned_areas < num_items) {
                grid_areas += 'items-' + line + '-' + col;
                assigned_areas++;
            } else {
                grid_areas += '.';
            }
            if (col < total_columns - 1) {
                grid_areas += ' ';
            }

        }
        grid_areas += '\"';

        if (line < total_lines - 1) {
            grid_areas += ' ';
        }
    }

    return grid_areas;
}

const assignProperties = () => {
    let details = document.querySelector('details.ppg-ufrgs-wp__details');
    let detailContent = details;
    let detailClosedWidth = details.scrollWidth;
    // open the details to get the height of the content
    details.open = true;
    // pass it to the the element as CSS property
    detailContent.style.setProperty('--details-content-width-open', detailContent.scrollWidth + 'px');
    details.style.setProperty('--details-width-open', detailContent.scrollWidth + detailClosedWidth + 'px');
    // close the details again
    details.open = false;

    detailContent.style.setProperty('--details-content-width-closed', detailContent.scrollWidth + 'px');
    details.style.setProperty('--details-width-closed', detailClosedWidth + 'px');

    details.addEventListener('toggle', (ev) => toggleDetailsOpen(ev));
    window.addEventListener('resize', (ev) => {
        // if the details is open, adjust height
        if (details.classList.contains('is--open')) {
            detailContent.style.setProperty('--details-width-open', detailContent.scrollWidth + 'px');
        }
    });
}






function toggleDetailsOpen(ev) {

    console.log(ev);

    var container = document.querySelector('details.ppg-ufrgs-wp__details');

    const timeout = getComputedStyle(container.querySelector('div.ppg-ufrgs-wp__details__wrapper')).getPropertyValue('--details-transition-time');

    // we can't use [open] as it will be only removed after the transition
    container.classList.toggle('is--open');

    // remove the open attribute once the transition is done, because otherwise we won't see the transition
    if (container.open) {
        ev.preventDefault();
        setTimeout(function () {

            container.open = false;
        }, parseInt(timeout))
    }
}

document.addEventListener('DOMContentLoaded', svg4everybody());
document.addEventListener('DOMContentLoaded', carregaDisciplinas());
document.addEventListener('DOMContentLoaded', correctCollapsedItems());
