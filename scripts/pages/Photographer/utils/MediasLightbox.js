'use strict';

// Classe qui instancie la lightbox
export default class MediasLightbox {
	constructor(medias, mediasTitle) {
		// Initialisation d'un index permettant de parcourir le tableau des médias à travers la lightbox
		this.mediasListIndex = 0;
		this.mediasList = medias;
		this.mediasTitle = mediasTitle;

		this.launchLightbox(this.mediasList, this.mediasTitle);
	}


	// Méthode qui permet d'ouvrir la lightbox au click sur un média
	// On appelle lors de l'ouverture setMediaLightBox avec comme paramètre
	// l'index actuel, le média et son titre sélectionné
	// Mais aussi les boutons pour afficher le média suivant/précédent
	launchLightbox(media, mediaTitle) {
		const mediaSelected = document.querySelectorAll('.photographer-media');

		mediaSelected.forEach((medias, index) =>
			medias.addEventListener('click', () => {
				this.setMediaLightBox(index, media, mediaTitle);
			}),
		);

		mediaSelected.forEach((medias, index) =>
			medias.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					this.setMediaLightBox(index, media, mediaTitle);
				}
			}),
		);
		return this;
	}

	// Méthode qui affichera le média sélectionné
	setMediaLightBox(index, media, mediaTitle ) {
		const next = document.querySelector('.next');
		const previous = document.querySelector('.previous');
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
		this.removeNextBtnListener(next);
		this.removePreviousBtnListener(previous);
		this.removeKeyboardListener();
	
		// Now add new listeners
		this.nextBtn(next, this.mediasList, this.mediasTitle);
		this.previousBtn(previous, this.mediasList, this.mediasTitle);
		this.keyboardParameters(this.mediasList, this.mediasTitle);
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

	nextBtn(nextBtn, media, title) {
		this.removeNextBtnListener(nextBtn);
		const listener = (e) => {
			e.preventDefault();
			this.next(media, title);
		};
		nextBtn.addEventListener('click', listener);
		nextBtn._listener = listener;
	}

	previousBtn(previousBtn, media, title) {
		this.removePreviousBtnListener(previousBtn);
		const listener = (e) => {
			e.preventDefault();
			this.previous(media, title);
		};
		previousBtn.addEventListener('click', listener);
		previousBtn._listener = listener;
	}

	keyboardParameters(media, title) {
		const displayedMedia = document.querySelector('.lightbox_media');
		let keydownPlay = true;
		this.removeKeyboardListener();
		const listener = (event) => {
			switch (event.key) {
			case 'ArrowRight' || '6':
				event.preventDefault();
				this.next(media, title);
				break;
			case 'ArrowLeft' || '4':
				event.preventDefault();
				this.previous(media, title);
				break;
			case 'Escape':
				this.closeLightBox();
				break;
			case ' ':
				if (displayedMedia.children[0].tagName === 'VIDEO') {
					keydownPlay = !keydownPlay;
					if (!keydownPlay) {
						displayedMedia.children[0].play();
					} else {
						displayedMedia.children[0].pause();
					}}
				break;
			default:
				break;
			}
		};
		document.addEventListener('keydown', listener);
		document._keyboardListener = listener;
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
		const lightBoxMedia = document.querySelector('.lightbox_media');
		const lightBoxName = document.querySelector('.lightbox_name');
		closeBtn.addEventListener('click', () => {
			const body = document.querySelector('body');
			body.style.overflow = 'scroll';
			lightBoxWrapper.style.display = 'none';
			this.mediasListIndex = 0;
			lightBoxMedia.innerHTML = '';
			lightBoxName.innerHTML = '';
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				const body = document.querySelector('body');
				body.style.overflow = 'scroll';
				lightBoxWrapper.style.display = 'none';
			}
		});
	}

	removeNextBtnListener(nextBtn) {
		const listener = nextBtn._listener;
		if (listener) {
			nextBtn.removeEventListener('click', listener);
			delete nextBtn._listener;
		}
	}
	
	removePreviousBtnListener(previousBtn) {
		const listener = previousBtn._listener;
		if (listener) {
			previousBtn.removeEventListener('click', listener);
			delete previousBtn._listener;
		}
	}
	
	removeKeyboardListener() {
		const listener = document._keyboardListener;
		if (listener) {
			document.removeEventListener('keydown', listener);
			delete document._keyboardListener;
		}
	}
}
