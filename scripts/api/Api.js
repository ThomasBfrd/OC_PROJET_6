'use strict';

// Classe qui permet d'instancier la méthode de récupération des données
export default class API {
	async getData() {
		const url = '/../../data/photographers.json';

		// On appelle la méthode fetch pour récupérer de manière asynchrone les données
		const response = await fetch(url);
		const data = await response.json();

		const dataPhotographers = [...data.photographers];
		const dataMedias = [...data.media];

		// Vu qu'on a deux liste d'objets, on return un objet contenant les photographes et médias
		// On aura seulement à appeler photographers.[propriété] pour récupérer les données souhaitées
		return {
			'photographers': dataPhotographers,
			'media': dataMedias,
		};
	}
}
