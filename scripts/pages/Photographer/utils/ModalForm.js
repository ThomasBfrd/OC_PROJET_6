'use strict';

export default class ModalForm {
  constructor() {
    this.contact = document.querySelector('#contact_modal');
  }
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
    $modalContact.innerHTML = modalForm;
    this.contact.appendChild($modalContact);

    const contactBtn = document.querySelector('.contact-button');

    contactBtn.addEventListener('click', () => {
      displayModal();
    });

    function displayModal() {
      const modal = document.getElementById('contact_modal');
      modal.style.display = 'block';
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }

    if (modalForm) {
      const closeBtn = document.getElementById('close');
      closeBtn.addEventListener('click', () => {
        closeModal();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      });
    }

    const closeModal = () => {
      const modal = document.getElementById('contact_modal');
      modal.style.display = 'none';
      const body = document.querySelector('body');
      body.style.overflow = 'visible';
      window.scrollTo(0, 0);
    };

    const successBtn = document.querySelector('.success-form-button');
    successBtn.addEventListener('click', () => {
      closeSuccessModal();
    });

    const closeSuccessModal = () => {
      const modal = document.getElementById('contact_modal');
      modal.style.display = 'none';
    };
  }
}
