export default class GridView {
  constructor (ppgData) {
    this._ppgData = ppgData;
  }

  /**
   * Assigns a new grid-areas property to the grid element
   * and a new grid-area to the grid-item elements.
   * @param {number} totalLines - number of lines in layout grid.
   * @param {number} totalColumns - number of columns in layout grid.
   * @param {boolean} [layoutOpen=false] - flag to handle opened or closed layout.
   */
  assignGridArea (totalLines, totalColumns, layoutOpen = false) {
    const sectionListing = document.querySelector('section.ppg-ufrgs-wp-component__listing');

    const gridAreas = this.genGridAreas(totalLines, totalColumns, layoutOpen);

    sectionListing.style.gridTemplateAreas = gridAreas;

    this.assignItemsAreas(totalLines, totalColumns, layoutOpen);
  }

  /**
   * Generates the grid-areas property of the grid element in the layout
   * and returns it.
   * @param {number} totalLines - number of lines in layout grid.
   * @param {number} totalColumns - number of columns in layout grid.
   * @param {boolean} [layoutOpen=false] - flag to handle opened or closed layout.
   * @returns {string} grid-areas - generated grid-area.
   */
  genGridAreas (totalLines, totalColumns, layoutOpen = false) {
    let gridAreas = '';
    let assignedAreas = 0;
    const listingItems = document.querySelectorAll('div.ppg-ufrgs-wp__listing__item');
    const numItems = listingItems.length;

    totalColumns = layoutOpen ? totalColumns - 1 : totalColumns;

    for (let line = 0; line < totalLines; line++) {
      gridAreas += '"';
      for (let col = 0; col < totalColumns; col++) {
        if (col === 0 && !layoutOpen) {
          if (line < 2) {
            gridAreas += 'details ';
          } else {
            gridAreas += '. ';
          }
          continue;
        }

        if (col <= 2 && line < 2 && layoutOpen) {
          gridAreas += 'details ';
          continue;
        }

        if (assignedAreas < numItems) {
          gridAreas += 'items--' + line + '--' + col;
          assignedAreas++;
        } else {
          gridAreas += '.';
        }

        if (col < totalColumns - 1) {
          gridAreas += ' ';
        }
      }
      gridAreas += '"';

      if (line < totalLines - 1) {
        gridAreas += ' ';
      }
    }

    return gridAreas;
  }

  assignProperties () {
    const details = document.querySelector('details.ppg-ufrgs-wp__details');
    const detailContent = details;
    const detailClosedWidth = details.scrollWidth;
    // open the details to get the height of the content
    details.open = true;
    // pass it to the the element as CSS property
    detailContent.style.setProperty('--details-content-width-open', detailContent.scrollWidth + 'px');
    details.style.setProperty('--details-width-open', detailContent.scrollWidth + detailClosedWidth + 'px');
    // close the details again
    details.open = false;

    detailContent.style.setProperty('--details-content-width-closed', detailContent.scrollWidth + 'px');
    details.style.setProperty('--details-width-closed', detailClosedWidth + 'px');

    window.addEventListener('resize', (ev) => {
      // if the details is open, adjust height
      if (details.classList.contains('is--open')) {
        detailContent.style.setProperty('--details-width-open', detailContent.scrollWidth + 'px');
      }
    });
  }
}
