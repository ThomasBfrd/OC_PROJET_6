"use strict";

export default class MediasFactory {
    createMedia(media, profile  ) {
        if (media.hasOwnProperty('image')) {
            let img = document.createElement('img')
            img.setAttribute('src', `/assets/photographers/${profile}/${media.image}`)
            img.setAttribute('tabindex', '0')
            img.setAttribute('alt', media.title)
            img.setAttribute('aria-label', 'image')
            img.setAttribute('role', 'img')
            img.className = 'photographer-media';
            return img;
        } else if (media.hasOwnProperty('video')) {
            let video = document.createElement('video')
            video.setAttribute('tabindex', '0')
            video.setAttribute('controls', 'true')
            video.setAttribute('title', media.title)
            video.setAttribute('aria-label', 'video')
            video.setAttribute('src', `/assets/photographers/${profile}/${media.video}`)
            video.className = 'photographer-media video';
            return video;
        }
    }
}

