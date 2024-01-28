'use strict';

// Classe qui instancie le formulaire sous forme de modal
export default class ModalForm {
	constructor() {
		// On récupère le wrapper qui contiendra le formulaire
		this.contact = document.querySelector('#contact_modal');
	}

	// Méthode qui créee le contenu HTML du formulaire
	createModalContact(profile) {
		const $modalContact = document.createElement('div');

		const modalForm = `
      <div class="modal">
          <div class="form" role="form">
            <header role="banner">
            <div class="form-header-text">
              <h2>Contactez-moi</h2> <br />
              <p>${profile.name}</p>
            </div>

              <button role="button" aria-label="fermer le formulaire" id="close" class="closeForm" >
                <img src="assets/icons/close.svg" alt="fermer le formulaire" />
              </button>
            </header>
            <form>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="firstName">Prénom</label>
                <br>
                <input role="input" class="text-control" type="text" id="firstName" name="firstName" minlength="2" autocomplete="prenom">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="lastName">Nom</label>
                <br>
                <input role="input" class="text-control" type="text" id="lastName" name="lastName" minlength="2" autocomplete="nom">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="email">Email</label>
                <br>
                <input role="input" class="text-control" type="email" id="email" name="email" minlength="2" autocomplete="email">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="message">Votre message</label>
                <br>
                <textarea role="textbox" class="text-control" type="text" id="message" name="message" minlength="10" maxlength="200"></textarea>
                <br>
                <span class="message-error"></span>
              </div>
              <button role="button" aria-label="envoyer" class="btn-submit contact-button button" type="submit" id="submit">Envoyer</button>
            </form>
            </div>
            <div class="success">
              <h2 class="success-form hide"> </h2>
              <div class="button-success hide" aria-label="Merci pour les informations">
                <button role="button" aria-label="fermer" class="btn-submit contact-button success-form-button">Fermer</button>
              </div>
            </div>
        </div>
      `;

		// On intègre le contenu HTML du formulaire dans le div crée plus haut
		$modalContact.innerHTML = modalForm;
		// Puis on ajoute ce div en tant qu'enfant au wrapper
		this.contact.appendChild($modalContact);

		const contactBtn = document.querySelector('.contact-button');
		// Variable qui surveille l'ouverture et la fermeture de la modal
		let isModalOpened = false;

		contactBtn.addEventListener('click', () => {
			isModalOpened = true;
			displayModal();
		});

		// Méthode qui modifie le CSS pour faire apparaitre le wrapper et sa modal
		function displayModal() {
			const modal = document.getElementById('contact_modal');
			modal.style.display = 'block';
			const body = document.querySelector('body');
			body.style.overflow = 'hidden';
			window.scrollTo(0, 0);
		}

		// Si le formulaire est existant, on récupère à l'intérieur le bouton pour fermer la modal
		if (modalForm) {
			const closeBtn = document.getElementById('close');
			closeBtn.addEventListener('click', () => {
				closeModal();
			});

			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape' && isModalOpened) {
					closeModal();
				}
			});
		}

		// Méthode qui modifie le CSS pour masquer et fermer la modal
		const closeModal = () => {
			isModalOpened = false;
			const modal = document.getElementById('contact_modal');
			modal.style.display = 'none';
			const body = document.querySelector('body');
			body.style.overflowY = 'visible';
			window.scrollTo(0, 0);
		};

		// Gestion d'event pour fermer la modal après avoir cliqué sur le bouton de succès
		const successBtn = document.querySelector('.success-form-button');
		successBtn.addEventListener('click', () => {
			closeSuccessModal();
		});

		// Méthode qui permet de masquer/fermer le message de confirmation
		// Après l'envoi des données du formulaire
		const closeSuccessModal = () => {
			const modal = document.getElementById('contact_modal');
			modal.style.display = 'none';
		};
	}
}
