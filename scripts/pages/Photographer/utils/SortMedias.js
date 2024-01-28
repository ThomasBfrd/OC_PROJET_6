'use strict';

import BuilderMediasPhotographer from '../BuilderMediasPhotographer.js';
import LikeMedia from './MediasLikes.js';

// Classe qui gère le tri des médias
export default class SortMedia {
	constructor(medias, profile) {
		// On assigne les données récupérées du constructor à des variables
		// On crée un tableau avec l'ordre original des médias
		this.originalMedias = medias;
		// On crée une copie du tableau des médias qu'on utilisera pour le tri
		this.sortedMedias = [...this.originalMedias];
		this.profile = profile;
		this.totalLikes = 0;

		// On récupère le nombre total de likes 
		const totalLikes = document.querySelector('.total-likes');
		this.totalLikes = this.originalMedias.reduce((acc, cur) => acc + cur.likes, 0);

		// On récupère tous les éléments du dropdown dans le DOM
		const dropdown = document.querySelector('.dropdown');
		const select = dropdown.querySelector('.select');
		const caret = dropdown.querySelector('.caret');
		const menu = dropdown.querySelector('.menu');
		const options = dropdown.querySelectorAll('.menu li');

		// Au click ou keydown, on ajoute des évènements pour l'ouverture/fermeture du dropdown
		select.addEventListener('click', () => {
			caret.classList.toggle('caret-rotate');
			menu.classList.toggle('menu-open');
		});

		select.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				caret.classList.toggle('caret-rotate');
				menu.classList.toggle('menu-open');
			}
		});

		options.forEach((option) => {
			option.addEventListener('click', () => {
				this.changeMenu(option);
			});
		});
		
		// Initialisation de l'index de l'option actuellement sélectionnée
		let currentlySelectedIndex = -1; 

		// Toutes les méthodes gérées en fonction du keydown effectué
		options.forEach((option) => {
			option.addEventListener('keydown', (event) => {
				if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
					event.preventDefault();
					// On soustrait de 1 la valeur de l'index de l'option cible
					currentlySelectedIndex--;

					if (currentlySelectedIndex < 0) {
						// Si on dépasse le début du tableau, on revient à la fin
						currentlySelectedIndex = options.length - 1;
					}
					// on focus l'option sur laquelle se trouve le user pour le sélectionner
					options[currentlySelectedIndex].focus();
				} else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
					event.preventDefault();
					// On additionne de 1 la valeur de l'index de l'option cible
					currentlySelectedIndex++;

					if (currentlySelectedIndex >= options.length) {
						// Si on dépasse la fin du tableau, on revient au début
						currentlySelectedIndex = 0; 
					}
					// on focus l'option sur laquelle se trouve le user pour le sélectionner
					options[currentlySelectedIndex].focus();

				} else if (event.key === 'Enter') {
					// Si une option est focus, et qu'on appuie sur "Entrer", on appelle changeMenu
					// Qui permettra d'afficher l'option ciblée
					this.changeMenu(option);

					// Possibilité de fermer le keydown avec la touche Echap
				} else if (event.key === 'Escape') {

					caret.classList.toggle('caret-rotate');
					menu.classList.toggle('menu-open');
				}
			});
		});

		// Fermeture du dropdown aec la touche "Echap" même si on est pas focus sur une option
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				menu.classList.remove('menu-open');
				caret.classList.remove('caret-rotate');
			}
		});

		// On récupère au clique le "li" sélectionné pour trier la liste des médias
		const menuItems = document.querySelectorAll('.menu li');
		menuItems.forEach((item) => {
			item.addEventListener('click', () => {
				const selectedId = item.innerHTML;
				this.filterSelected(selectedId);

				// Une fois que mediasSorted est mis à jour, il faut également le mettre à jour dans le DOM
				// On appelle donc la méthode updateMediaSection
				this.updateMediaSection(this.sortedMedias);
				totalLikes.innerHTML = this.totalLikes;
			});

			item.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					const selectedId = item.innerHTML;
					this.filterSelected(selectedId);

					// Une fois que mediasSorted est mis à jour, il faut également le mettre à jour dans le DOM
					// On appelle donc la méthode updateMediaSection
					this.updateMediaSection(this.sortedMedias);
					totalLikes.innerHTML = this.totalLikes;
				}
			});
		});
	}

	// Méthode qui permet de trier les médias selon l'option séléctionnée
	filterSelected(selectedId) {
		switch (selectedId) {
		case 'Popularité':
			this.sortedMedias.sort((a, b) => b.likes - a.likes);
			break;
		case 'Date':
			this.sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
			break;
		case 'Titre':
			this.sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
			break;

			// Par défaut, on affiche la liste de base des médias, non triée
		default:
			this.sortedMedias = this.originalMedias;
			break;
		}
	}

	// Méthode qui permet d'afficher l'option sélectionnée
	// gère aussi le hover et la gestion du caret
	changeMenu(optionValues) {
		const dropdown = document.querySelector('.dropdown');
		const caret = dropdown.querySelector('.caret');
		const menu = dropdown.querySelector('.menu');
		const options = dropdown.querySelectorAll('.menu li');
		const selected = dropdown.querySelector('.selected');

		selected.textContent = optionValues.textContent;
		caret.classList.remove('caret-rotate');
		menu.classList.remove('menu-open');
		options.forEach((optionValues) => {
			optionValues.classList.remove('active');
			optionValues.classList.remove('hover');
		});
		optionValues.classList.add('active');
		optionValues.classList.add('hover');
	}

	// Méthode qui instancie les médias triés pour regénérer la galerie des médias affichés
	// Mais aussi la gestion des likes
	updateMediaSection(medias) {
		document.querySelector('.medias').innerHTML = '';
		new BuilderMediasPhotographer().createMediaCard(medias, this.profile);
		new LikeMedia();
	}
}
