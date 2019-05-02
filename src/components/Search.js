import { getStarships } from '../api.js';


class Search {
  constructor() {
    this.element = document.getElementById('search-box');

    this.element.onkeyup = this.getData.bind(this);
  }

  getData(event) {
    const {value} = event.target;

    if (value.length >= 3) {
      getStarships(value)
        .then(response => this.success(response))
        .catch(err => this.error(err));
    }
  }

  success(response) {
    // Broadcast a custom event with the data in it.
    let event = new CustomEvent('fetchSuccess', {detail: response.results});
    document.body.dispatchEvent(event);
  }

  error(err) {
    // NOTE: add some UI feedback.
    console.error(err);
  }
}

export default Search;
