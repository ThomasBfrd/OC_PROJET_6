"use strict";

import MediasLightbox from "../pages/Photographer/MediasLightbox.js";
import MediasFactory from "./MediasFactory.js";

export default class GalleryFactory {
  constructor() {
    this.totalLikes = 0;
  }

  createMediaCard(media, profile) {
    let mediasList = []
    let mediasTitlesList = []
    let profileName = profile.name;
    let mediaFactory = new MediasFactory();

  
    media.forEach((item) => {
      let article = document.createElement("article");
      let sectionMedias = document.querySelector(".medias");
      let createMedia = mediaFactory.createMedia(item, profileName);
  
      let mediaCard = `
       <div class="display_medias">
       <div title=${item.title}>
           ${createMedia.outerHTML}</div>
           <div class="infos_media">
               <span class="media_title">${item.title}</span>
               <div class="media_likes">
                <span class="likes">${item.likes}</span>
                <i class="fa-regular fa-heart heart"></i>
               </div>
           </div>
       </div>
      `;
     
      this.totalLikes += item.likes;
      mediasList.push(createMedia.outerHTML)
      mediasTitlesList.push(item.title)
      article.innerHTML = mediaCard;
      sectionMedias.appendChild(article);

      new MediasLightbox().launchLightbox(mediasList, mediasTitlesList)
  
     });

    return this;
   }
  
 
}
