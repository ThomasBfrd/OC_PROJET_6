'use strict';

// Classe qui instancie la lightbox
export default class MediasLightbox {
	constructor() {
		// Initialisation d'un index permettant de parcourir le tableau des médias à travers la lightbox
		this.mediasListIndex = 0;
	}

	// Méthode qui permet d'ouvrir la lightbox au click sur un média
	// On appelle lors de l'ouverture setMediaLightBox avec comme paramètre
	// l'index actuel, le média et son titre sélectionné
	// Mais aussi les boutons pour afficher le média suivant/précédent
	launchLightbox(media, mediaTitle) {
		const next = document.querySelector('.next');
		const previous = document.querySelector('.previous');
		const mediaSelected = document.querySelectorAll('.photographer-media');

		mediaSelected.forEach((medias, index) =>
			medias.addEventListener('click', () => {
				this.setMediaLightBox(index, media, mediaTitle, next, previous);
			}),
		);

		mediaSelected.forEach((medias, index) =>
			medias.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					this.setMediaLightBox(index, media, mediaTitle, next, previous);
				}
			}),
		);
		return this;
	}

	// Méthode qui affichera le média sélectionné
	setMediaLightBox(index, media, mediaTitle, next, previous) {
		const lightBoxWrapper = document.querySelector('.lightbox_wrapper');
		const lightBoxMedia = document.querySelector('.lightbox_media');
		const lightBoxName = document.querySelector('.lightbox_name');
		const body = document.querySelector('body');
		body.style.overflow = 'hidden';
		window.scrollTo(0, 0);
		lightBoxWrapper.style.display = 'block';

		// On assigne le média et son titre à l'index actuel sélectionné
		const src = media[index];
		const nameSrc = mediaTitle[index];

		// On modifie l'index initialisé par celui correspondant à l'index du média sélectionné
		this.mediasListIndex = index;

		// On intègre dans le DOM le média et titre lié à leur index
		// Il s'agit de balise img ou video, générées dans le builder des médias
		lightBoxMedia.innerHTML = `${src}`;
		lightBoxName.innerHTML = `${nameSrc}`;

		// On vérifie si le média est une vidéo ou non
		this.isVideo(lightBoxMedia);
		// En fonction du bouton next ou previous, on modifie l'index
		// et on affichera le média correspondant à l'index sélectionné
		this.previousBtn(previous, media, mediaTitle);
		this.nextBtn(next, media, mediaTitle);
		this.keyboardParameters(media, mediaTitle);
		this.closeLightBox();
	}

	// On vérifie au tagname si le média est une vidéo ou non
	// S'il s'agit d'une vidéo, on ajoute les controls pour pouvoir visionner la vidéo
	isVideo(item) {
		if (item.children[0].tagName === 'VIDEO') {
			item.children[0].setAttribute('controls', true);
			item.children[0].setAttribute('controlslist', 'nodownload');
		}
	}

	keyboardParameters(media, title) {
		const displayedMedia = document.querySelector('.lightbox_media');
		let keydownPlay = true;
		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight' || event.key === '6') {
				this.next(media, title);
			} else if (event.key === 'ArrowLeft' || event.key === '4') {
				this.previous(media, title);
			} else if (
				// Si le tagname du média est une vidéo et qu'on appuie sur la touche "Espace"
				// On peut lancer la vidéo dans la lightbox
				displayedMedia.children[0].tagName === 'VIDEO' && event.key === ' '
			) {
				keydownPlay = !keydownPlay;
				if (!keydownPlay) {
					return displayedMedia.children[0].play();
				} else {
					return displayedMedia.children[0].pause();
				}
			}
		});
	}

	nextBtn(nextBtn, media, title) {
		nextBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.next(media, title);
		});
	}
	previousBtn(previousBtn, media, title) {
		previousBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.previous(media, title);
		});
	}

	// Méthode qui permet de changer l'index et afficher dans le DOM
	// Le nouveau média correspondant à son index
	next(media, title) {
		const lightBoxMedia = document.querySelector('.lightbox_media');
		const lightBoxName = document.querySelector('.lightbox_name');

		this.mediasListIndex += 1;

		if (
			this.mediasListIndex > media.length - 1 &&
      this.mediasListIndex > title.length - 1
		) {
			this.mediasListIndex = 0;
		}

		const src = media[this.mediasListIndex];
		const nameSrc = title[this.mediasListIndex];

		lightBoxMedia.innerHTML = `${src}`;
		lightBoxName.innerHTML = `${nameSrc}`;
		this.isVideo(lightBoxMedia);
	}

	// Méthode qui permet de changer l'index et afficher dans le DOM
	// Le nouveau média correspondant à son index
	previous(media, title) {
		const lightBoxMedia = document.querySelector('.lightbox_media');
		const lightBoxName = document.querySelector('.lightbox_name');

		this.mediasListIndex -= 1;

		if (this.mediasListIndex < 0) {
			this.mediasListIndex = media.length - 1;
		}

		const src = media[this.mediasListIndex];
		const nameSrc = title[this.mediasListIndex];

		lightBoxMedia.innerHTML = `${src}`;
		lightBoxName.innerHTML = `${nameSrc}`;
		this.isVideo(lightBoxMedia);
	}

	closeLightBox() {
		const lightBoxWrapper = document.querySelector('.lightbox_wrapper');
		const closeBtn = document.querySelector('.close');
		closeBtn.addEventListener('click', () => {
			const body = document.querySelector('body');
			body.style.overflow = 'scroll';
			lightBoxWrapper.style.display = 'none';
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				const body = document.querySelector('body');
				body.style.overflow = 'scroll';
				lightBoxWrapper.style.display = 'none';
			}
		});
	}
}
