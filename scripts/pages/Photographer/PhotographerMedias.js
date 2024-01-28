'use strict';

import BuilderMediasPhotographer from './BuilderMediasPhotographer.js';
import SortMedia from './utils/SortMedias.js';
import ModalForm from './utils/ModalForm.js';
import LikeMedia from './utils/MediasLikes.js';

// On crée une classe qui correspond à la galerie médias de la page des photographes
export default class PhotographerMedias {
	mediasProfile(data) {
		const dataPhotographers = data.photographers;
		const dataMedias = data.media;
		// On récupère le query params de l'url, correspondant à l'ID du profile
		const paramsId = new URLSearchParams(document.location.search).get('id');

		// On filtre les médias et le profile ayant le même ID du query params
		const profile = dataPhotographers.filter((photographer) =>
			photographer.id === +paramsId)[0];
		const media = dataMedias.filter((element) =>
			element.photographerId === +paramsId);

		// On instancie un builder pour les médias récupérés
		const gallerySection = new BuilderMediasPhotographer()
			.createMediaCard(media, profile);
		// On appelle la méthode qui génère le mini footer
		this.photographerResume(gallerySection.totalLikes, profile);
		// On instancie l'objet de tri
		new SortMedia(media, profile);
		// On instancie l'objet du formulaire
		new ModalForm().createModalContact(profile);
		// On instancie l'objet qui permet de liker un média
		new LikeMedia();
	}

	// Méthode qui crée le mini footer du photographe affiché
	photographerResume(totalLikes, profile) {
		const profielResume = document.querySelector('.resume-profile');
		const resume = `
                <div class="total-likes-heart">
                  <span class="total-likes">${totalLikes}</span>
                  <i class="fas fa-heart total-heart" aria-label='Total de likes'></i>
                </div>
                <span class="tjr-price">${profile.price} €/ jour</span>
                `;
		profielResume.innerHTML = resume;
	}
}
