const getIdByUrl = () => {
  const url = new URL(document.location);
  const id = parseInt(url.searchParams.get("id"));

  return id;
};

async function getPhotographers() {
  const reponse = await fetch("../../data/photographers.json");
  const photographers = await reponse.json();

  return photographers;
}

async function displayData(photographers) {
  const id = getIdByUrl();
  const photographer = photographers.filter((user) => user.id === id)[0];

  const photographerHeader = document.querySelector(".photograph_header");
  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerHeader.appendChild(userCardDOM);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
