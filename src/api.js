// Helper functions to interact with the API.


const URL = 'https://swapi.co/api';
const defaultRequestOptions = {
  mode: 'cors'
};

/*
 * This is useful to deal with the implementation of fetch() API
 * and keep the Promise flow more familiar.
 */
function handleResponseStatus(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getStarships(query) {
  let uri = `${URL}/starships/`;

  if (query) {
    uri = `${uri}?search=${query}`;
  }

  return fetch(uri, defaultRequestOptions)
    .then(handleResponseStatus)
    .then(response => response.json())
    .catch(error => console.error)
}

export {
  getStarships
};
