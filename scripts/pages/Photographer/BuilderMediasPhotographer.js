'use strict';

import MediasLightbox from './utils/MediasLightbox.js';
import MediasFactory from '../../factories/MediasFactory.js';

// On crée une classe Builder qui va générer chaque média
export default class Builder {
	constructor() {
		// On initialise le total de likes dans le mini footer
		this.totalLikes = 0;
	}

	createMediaCard(media, profile) {
		// On crée deux tableaux vides (médias et titres)
		// qui vont s'auto-compléter en fonction du nombre de donées récupérées
		const mediasList = [];
		const mediasTitlesList = [];
		const profileName = profile.name;
		// const mediaFactory = new MediasFactory();

		media.forEach((item) => {
			// On crée un article pour chaque média généré
			const article = document.createElement('article');
			const sectionMedias = document.querySelector('.medias');
			// On instancie chaque média grâce à un factory pattern (img ou video)
			const createMedia = new MediasFactory().createMedia(item, profileName);

			const mediaCard = `
				<div class="display_medias">
				<div title=${item.title} aria-label=${item.title}
				class="${createMedia.tagName === 'VIDEO' ? 'icon-video' : ''}">
				${createMedia.outerHTML}</div>
				<div class="infos_media">
				<span class="media_title">${item.title}</span>
				<div class="media_likes" aria-label="nombre de likes sur le média">
				<span class="likes">${item.likes}</span>
				<i class="fa-regular fa-heart heart" aria-label="icone de likes"></i>
				</div>
				</div>
				</div>
				`;

			// On cumule le nombre total de likes au fur et à mesure
			this.totalLikes += item.likes;
			// On ajoute chaque média dans les tableaux crées
			mediasList.push(createMedia.outerHTML);
			mediasTitlesList.push(item.title);
			article.innerHTML = mediaCard;
			sectionMedias.appendChild(article);

			// Pour chaque objet instancié, on l'instancie de nouveau dans
			// la lightbox, qui récupère le média et le titre
			new MediasLightbox().launchLightbox(mediasList, mediasTitlesList);
		});


		return this;
	}
}
