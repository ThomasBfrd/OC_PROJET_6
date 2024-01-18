'use strict';

// OK Finir le clavier pour la lightbox : (4 et 6 et left / right) OK
// OK Ajouter echap pour fermer le dropdown OK
// OK Ajouter echap pour fermer la modale OK
// OK Ajouter entrer pour ouvrir la lightbox OK
// OK Ajouter changement état like coeur OK
// OK Ajout de margin gallery OK
// OK Zoom léger photos home OK 
// OK Dropdown - échap général OK
// OK Data et errors en blanc pour contraste OK
// OK Modale Form : stop scroll + margin OK
// OK Ajouter titre média lightbox OK
// OK Dans lightbox - espace pour lancer la vidéo OK
// Check l'accessibility

import API from './api/Api.js';
import PhotographerProfile from './pages/Photographer/PhotographerProfile.js';
import PhotographerMedias from './pages/Photographer/PhotographerMedias.js'

const profile = () => {
    new API().getData().then((data) => {
        new PhotographerProfile().createPhotographerCard(data);
        new PhotographerMedias().mediasProfile(data);
      }).catch(() => {
        console.error('Soucis dans la réception des données', data);
    })
}

profile()