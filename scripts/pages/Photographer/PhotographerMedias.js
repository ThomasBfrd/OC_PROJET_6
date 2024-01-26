'use strict';

import BuilderMediasPhotographer from './BuilderMediasPhotographer.js';
import SortMedia from './utils/SortMedias.js';
import ModalForm from './utils/ModalForm.js';
import LikeMedia from './utils/MediasLikes.js';

export default class PhotographerMedias {
	mediasProfile(data) {
		const dataPhotographers = data.photographers;
		const dataMedias = data.media;
		const paramsId = new URLSearchParams(document.location.search).get('id');

		const profile = dataPhotographers.filter((photographer) =>
			photographer.id === +paramsId)[0];
		const media = dataMedias.filter((medium) =>
			medium.photographerId === +paramsId);

		const gallerySection = new BuilderMediasPhotographer()
			.createMediaCard(media, profile);
		this.photographerResume(gallerySection.totalLikes, profile);
		new SortMedia(media, profile);
		new ModalForm().createModalContact(profile);
		new LikeMedia();
	}


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
