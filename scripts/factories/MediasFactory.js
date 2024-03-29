/* eslint-disable no-prototype-builtins */
'use strict';

// Factory Pattern, qui permet de piper en fonction du type de média (img ou vidéo)
export default class MediasFactory {
	// Méthode qui permet la création du type de média
	// Chaque type de média est return pour être ensuite récupéré dans le builder
	createMedia(media, profile ) {
		if (media.hasOwnProperty('image')) {
			const img = document.createElement('img');
			img.setAttribute('src', `/assets/photographers/${profile}/${media.image}`);
			img.setAttribute('tabindex', '0');
			img.setAttribute('alt', media.title);
			img.setAttribute('aria-label', 'image');
			img.setAttribute('role', 'img');
			img.className = 'photographer-media';
			return img;
		} else if (media.hasOwnProperty('video')) {
			const video = document.createElement('video');
			video.setAttribute('tabindex', '0');
			video.setAttribute('title', media.title);
			video.setAttribute('aria-label', 'video');
			video.setAttribute('src', `/assets/photographers/${profile}/${media.video}#t=0.1`);
			video.className = 'photographer-media video';
			return video;
		}
	}
}

