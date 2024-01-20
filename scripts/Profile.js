'use strict';

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