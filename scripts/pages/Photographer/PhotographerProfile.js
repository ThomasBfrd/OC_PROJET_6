'use strict';

// On crée une classe qui correspond au header de la page des photographes
export default class PhotographerProfile {
	// Méthode qu'on appelle dans Profile pour instancier chaque profile
	createPhotographerCard(data) {
		const photographerData = data.photographers;
		// On récupère le query params de l'url, correspondant à l'ID du profile
		const paramsId = new URLSearchParams(document.location.search).get('id');
		// On récupère le profile des data ayant le même ID du query params
		const photographerById = photographerData.filter(
			(photographer) => photographer.id === +paramsId,
		);

		const sectionPhotographer = document.querySelector('.photograph_header');
		const article = document.createElement('article');
		// Vu qu'on utilise filter un array, on return un nouvel aray,
		// On récupère alors le premier index, qui correspond à l'ID du query params
		document.title = `Fisheye - ${photographerById[0].name}`;

		const photographersCard = `
      <div class="textContent">
      <h2 class="name">${photographerById[0].name}</h2>
      <p class="city">${photographerById[0].city},
      ${photographerById[0].country}</p>
      <p class="tagline">${photographerById[0].tagline}</p>
    </div>
	<div class="spacer"></div>
    <button class="contact-button" role="button" aria-labelledby="contacter le photographe">Contactez-moi</button>
    <div class="imgUser">
    <img role="img" src="../../../assets/photographers/Photographers_ID_Photos/${photographerById[0].portrait}"
      alt="portrait photographe" aria-label="portrait photographer"
      class="portrait_${photographerById[0].id}">
    </div>
    `;

		// On ajoute le contenu du header dans l'article
		// Puis on l'ajoute à la section du DOM
		article.innerHTML = photographersCard;
		article.setAttribute('role', 'article');
		sectionPhotographer.appendChild(article);
	}
}
