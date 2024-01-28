'use strict';

// Classe qui permet de gérer les likes sur les médias
export default class LikeMedia {
	constructor() {
		// On récupère toutes les icones "coeur"
		const hearts = document.querySelectorAll('.heart');

		// Pour chaque icone, on récupère l'élément qui précède l'icone, correspondant aux likes
		hearts.forEach((heart) => {
			const like = heart.previousElementSibling;
			const totalLikes = document.querySelector('.total-likes');

			// On crée un objet avec une propriété initiale pour chaque objet
			// Ce qui permet de vérifier si le média a déjà été liké ou non
			const media = {
				isLiked: false,
			};

			// Si on clique sur l'icone "coeur", on change l'état de isLiked
			// Si isLiked passe à true, alors on ajoute 1 aux likes du média, et 1 à totalLikes
			// Si isLikes passe à false, on retire 1 aux likes du média, et 1 à totalLikes
			// Et on change l'apparence de l'icone pour montrer si le média est liké ou non (coeur vide/rempli)
			heart.addEventListener('click', () => {
				media.isLiked = !media.isLiked;
				// Vu qu'on récupères des nombres depuis le DOM, il s'agit de strings
				// qu'il faut alors convertir en nombres
				let likeCounter = parseInt(like.innerHTML);
				let totalLikesCounter = parseInt(totalLikes.innerHTML);
				if (media.isLiked) {
					likeCounter++;
					totalLikesCounter++;
					heart.classList.remove('fa-regular');
					heart.classList.add('fa-solid');
				} else {
					likeCounter--;
					totalLikesCounter--;
					heart.classList.remove('fa-solid');
					heart.classList.add('fa-regular');
				}
				// On ajoute ensuite la valeur de like et totalLikes dans le DOM
				like.innerHTML = likeCounter;
				totalLikes.innerHTML = totalLikesCounter;
			});
		});
	}
}
