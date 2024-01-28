'use strict';
// Classe qui permet d'instancier les profils sur la page d'accueil
export default class HomePageBuilder {
	displayPhotographers(data) {
		const profiles = data.photographers;
		profiles.map((photographe) => {
			const sectionPhotographers = document.getElementById('photographers');
			// On crée un article par profil
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

			// On ajoute l'article à la section du DOM en tant qu'enfant
			// Puis on ajoute le contenu de la card à l'article 
			sectionPhotographers.appendChild(article);
			article.innerHTML = photographerCard;
		});
	}
}
