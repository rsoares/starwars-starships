/* Handles the list of starship items. */

class SortableList {
  constructor() {
    this.element = document.getElementById('starships-list');
    this.items = [];

    this.sortHash = {
      name: 'up',
      model: 'up',
      length: 'up',
      cost_in_credits: 'up'
    };

    let nameHeader = document.getElementById('by-name');
    let modelHeader = document.getElementById('by-model');
    let lengthHeader = document.getElementById('by-length');
    let costHeader = document.getElementById('by-cost');

    // Register event listeners.
    document.body.addEventListener('fetchSuccess', (event) => {
      this.renderData(event.detail);
    });
    nameHeader.onclick = () => this.sortStrings('name');
    modelHeader.onclick = () => this.sortStrings('model');
    lengthHeader.onclick = () => this.sortNumbers('length');
    costHeader.onclick = () => this.sortNumbers('cost_in_credits');
  }

  sortStrings(attribute) {
    let sortDirection = this.sortHash[`${attribute}`] === 'up' ? 1 : -1;

    this.items.sort((itemA, itemB) => {
      let nameA = itemA[`${attribute}`].toLowerCase();
      let nameB = itemB[`${attribute}`].toLowerCase();

      if (nameA < nameB) {
        return sortDirection;
      }
      if (nameA > nameB) {
        return -sortDirection;
      }
      return 0;
    });
    
    // Switch direction
    if (this.sortHash[`${attribute}`] === 'up') {
      this.sortHash[`${attribute}`] = 'down';
    } else if (this.sortHash[`${attribute}`] === 'down') {
      this.sortHash[`${attribute}`] = 'up';
    }

    this.renderData(this.items);
  }

  sortNumbers(attribute) {
    this.items.sort((itemA, itemB) => {
      let numberFromA = Number.isNaN(Number(itemA[`${attribute}`])) ? 0 : Number(itemA[`${attribute}`]);
      let numberFromB = Number.isNaN(Number(itemB[`${attribute}`])) ? 0 : Number(itemB[`${attribute}`]);

      if (this.sortHash[`${attribute}`] === 'up') {
        return numberFromA - numberFromB;
      } else if (this.sortHash[`${attribute}`] === 'down') {
        return -(numberFromA - numberFromB);
      }
    });

    // Switch direction
    if (this.sortHash[`${attribute}`] === 'up') {
      this.sortHash[`${attribute}`] = 'down';
    } else if (this.sortHash[`${attribute}`] === 'down') {
      this.sortHash[`${attribute}`] = 'up';
    }

    this.renderData(this.items);
  }

  renderData(eventData) {
    this.items = eventData;
    const headerData = ['name', 'model', 'length', 'cost_in_credits'];
    const oldTBody = this.element.getElementsByTagName('tbody')[0];

    // Cleanup the table.
    if (oldTBody) {
      this.element.removeChild(oldTBody);
    }
    
    const newTBody = document.createElement('tbody');
    
    // Insert table rows.
    this.items.forEach((item) => {
      let newRow = newTBody.insertRow(-1);
      
      headerData.forEach((d, index) => {
        newRow
          .insertCell(index)
          .appendChild(document.createTextNode(item[d]));
      });
    });

    this.element.appendChild(newTBody);
  }
}

export default SortableList;
