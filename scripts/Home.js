'use strict';


import API from '../scripts/api/Api.js';
import HomePageBuilder from '../scripts/pages/index.js';

// Méthode qui permet d'instancier le builder de la page d'accueil
const homepage = () => {
	// On instancie la classe API, où on appelle en async le fichier json
	new API().getData().then((data) => {
		// Une fois que les données sont récupérées, on les met en tant que paramètres
		// dans notre méthode qui va afficher tous les photographes, issue de la classe du builder
		new HomePageBuilder().displayPhotographers(data);
	}).catch(() => {
		console.error('Erreur lors du chargement des données depuis l\'API');
	});
};

homepage();
