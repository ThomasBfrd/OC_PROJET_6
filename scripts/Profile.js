'use strict';

// OK Finir le clavier pour la lightbox : (4 et 6 et left / right) OK
// OK Ajouter echap pour fermer le dropdown OK
// OK Ajouter echap pour fermer la modale OK
// OK Ajouter entrer pour ouvrir la lightbox OK
// Dans lightbox - espace pour lancer la vidéo
// Ajouter animation like coeur
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