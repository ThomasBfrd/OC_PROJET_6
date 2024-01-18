'use strict';

export default class MediasLightbox {
  constructor() {
    this.mediasListIndex = 0;
  }

  launchLightbox(media, mediaTitle) {
    const next = document.querySelector('.next');
    const previous = document.querySelector('.previous');
    let mediaSelected = document.querySelectorAll('.photographer-media');

    mediaSelected.forEach((medias, index) =>
      medias.addEventListener('click', () => {
        this.setMediaLightBox(index, media, mediaTitle, next, previous);
      })
    );

    mediaSelected.forEach((medias, index) =>
      medias.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.setMediaLightBox(index, media, mediaTitle, next, previous);
        }
      })
    );
    return this;
  }

  setMediaLightBox(index, media, mediaTitle, next, previous) {
    const lightBoxWrapper = document.querySelector('.lightbox_wrapper');
    let lightBoxMedia = document.querySelector('.lightbox_media');
    let lightBoxName = document.querySelector('.lightbox_name');
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    lightBoxWrapper.style.display = 'block';

    let src = media[index];
    let nameSrc = mediaTitle[index];

    this.mediasListIndex = index;

    lightBoxMedia.innerHTML = `${src}`;
    lightBoxName.innerHTML = `${nameSrc}`;

    this.previousBtn(previous, media, mediaTitle);
    this.nextBtn(next, media, mediaTitle);
    this.keyboardParameters(media, mediaTitle);
    this.closeLightBox();
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
        displayedMedia.children[0].tagName === 'VIDEO' &&
        event.key === ' '
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

  next(media, title) {
    let lightBoxMedia = document.querySelector('.lightbox_media');
    let lightBoxName = document.querySelector('.lightbox_name');

    this.mediasListIndex += 1;

    if (
      this.mediasListIndex > media.length - 1 &&
      this.mediasListIndex > title.length - 1
    ) {
      this.mediasListIndex = 0;
    }

    let src = media[this.mediasListIndex];
    let nameSrc = title[this.mediasListIndex];

    lightBoxMedia.innerHTML = `${src}`;
    lightBoxName.innerHTML = `${nameSrc}`;
  }

  previous(media, title) {
    let lightBoxMedia = document.querySelector('.lightbox_media');
    let lightBoxName = document.querySelector('.lightbox_name');

    this.mediasListIndex -= 1;

    if (this.mediasListIndex < 0) {
      this.mediasListIndex = media.length - 1;
    }

    let src = media[this.mediasListIndex];
    let nameSrc = title[this.mediasListIndex];

    lightBoxMedia.innerHTML = `${src}`;
    lightBoxName.innerHTML = `${nameSrc}`;
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