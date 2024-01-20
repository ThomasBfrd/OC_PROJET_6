'use strict';

export default class PhotographerProfile {
	createPhotographerCard(data) {
		const photographerData = data.photographers;
		const paramsId = new URLSearchParams(document.location.search).get('id');
		const photographerById = photographerData.filter(
			(photographer) => photographer.id === +paramsId,
		);

		const sectionPhotographer = document.querySelector('.photograph_header');
		const article = document.createElement('article');
		document.title = `Fisheye - ${photographerById[0].name}`;

		const photographersCard = `
      <div class="textContent">
      <h2 class="name">${photographerById[0].name}</h2>
      <p class="city">${photographerById[0].city},
      ${photographerById[0].country}</p>
      <p class="tagline">${photographerById[0].tagline}</p>
    </div>
    <button class="contact-button" role="button">Contactez-moi</button>
    <div class="imgUser">
    <img role="img" src="../../../assets/photographers/
    Photographers_ID_Photos/${photographerById[0].portrait}"
      alt="portrait photographe" aria-label="portrait photographer"
      class="portrait_${photographerById[0].id}">
    </div>
    `;

		article.innerHTML = photographersCard;
		article.setAttribute('role', 'article');
		sectionPhotographer.appendChild(article);
	}
}
