'use strict';

export default class HomePageBuilder {
	displayPhotographers(data) {
		const profiles = data.photographers;
		profiles.map((photographe) => {
			const sectionPhotographers = document.getElementById('photographers');
			const article = document.createElement('article');
			const photographerCard = `
            <a href="../../photographer.html?id=${photographe.id}" title="${photographe.name}">
                <div class="imgUser ">
                    <div class="zoomEffect">
                        <img src="../../assets/photographers/Photographers_ID_Photos/${photographe.portrait}"
                        alt="Photographe ${photographe.name}"
                        aria-label="Photographe ${photographe.name}"
                        role="img"
                        class="portrait_${photographe.id}">
                    </div>
                </div>
                <h2 class="name">${photographe.name}</h2>
            </a>
            <div class="textContent">
                <p class="city">${photographe.city}, ${photographe.country}</p>
                <p class="tagline">${photographe.tagline}</p>
                <p class="price">${photographe.price}€/jour</p>
            </div>
            `;

			sectionPhotographers.appendChild(article);
			article.innerHTML = photographerCard;
		});
	}
}
