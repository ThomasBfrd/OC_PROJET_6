"use strict";

export default class LikeMedia {
    constructor() {
        let hearts = document.querySelectorAll('.heart')

        hearts.forEach(heart => {
            let like = heart.previousElementSibling;
            let totalLikes = document.querySelector('.total-likes')

            // On crée un objet avec une propriété initiale pour chaque objet
            let media = {
                isLiked: false,
            }

            heart.addEventListener('click', () => {
                media.isLiked = !media.isLiked;
                let likeCounter = parseInt(like.innerHTML)
                let totalLikesCounter = parseInt(totalLikes.innerHTML)
                if (media.isLiked) {                    
                    likeCounter++
                    totalLikesCounter++
                } else {
                    likeCounter--
                    totalLikesCounter--
                }
                like.innerHTML = likeCounter
                totalLikes.innerHTML = totalLikesCounter
            })
        })
    }
}