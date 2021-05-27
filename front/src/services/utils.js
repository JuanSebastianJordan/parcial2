const HOME_API = "/api/homes";

const getHomes = async () => {
  return fetch(HOME_API)
    .then(getJSON)
    .catch(function (e) {
      console.log("Cant fetch data, error: " + e);
    });
};

const getHomeById = async (id) => {
  return fetch(`${HOME_API}/${id}`)
    .then(getJSON)
    .catch(function (e) {
      console.log("Cant fetch data, error: " + e);
    });
};

const getJSON = (response) => response.json();

export { getHomes, getHomeById };
