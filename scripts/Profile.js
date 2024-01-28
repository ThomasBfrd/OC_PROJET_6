'use strict';

import API from './api/Api.js';
import PhotographerProfile from './pages/Photographer/PhotographerProfile.js';
import PhotographerMedias from './pages/Photographer/PhotographerMedias.js';

// Méthode qui permet d'instancier le builder de la page d'accueil
const profile = () => {
	// On instancie la classe API, où on appelle en async le fichier json
	new API().getData().then((data) => {
		// Une fois que les données sont récupérées, on les met en tant que paramètres
		// dans notre méthode qui va afficher le header et la galerie médias de chaque photographe
		new PhotographerProfile().createPhotographerCard(data);
		new PhotographerMedias().mediasProfile(data);
	}).catch(() => {
		console.error('Soucis dans la réception des données');
	});
};

profile();




