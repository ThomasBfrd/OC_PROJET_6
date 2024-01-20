'use strict';


import API from '../scripts/api/Api.js';
import HomePageBuilder from '../scripts/pages/index.js';


const homepage = () => {
	new API().getData().then((data) => {
		new HomePageBuilder().displayPhotographers(data);
	}).catch(() => {
		console.error('Erreur lors du chargement des données depuis l\'API');
	});
};

homepage();
