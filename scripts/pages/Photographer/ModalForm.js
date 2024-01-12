'use strict';

export default class ModalForm {
  constructor() {
    this.contact = document.querySelector("#contact_modal");
  }
  createModalContact(profile) {

    const $modalContact = document.createElement("div");

    const modalForm = `
      <div class="modal">
          <div class="form" role="form">
            <header role="banner">
            <div class="form-header-text">
              <h2>Contactez-moi</h2> <br />
              <p>${profile.name}</p>
            </div>
              <img role="img" id="close" src="assets/icons/close.svg" />
            </header>
            <form>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="firstName">Prénom</label>
                <br>
                <input role="input" class="text-control" type="text" id="firstName" name="firstName" minlength="2">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="lastName">Nom</label>
                <br>
                <input role="input" class="text-control" type="text" id="lastName" name="lastName" minlength="2">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="email">Email</label>
                <br>
                <input role="input" class="text-control" type="email" id="email" name="email" minlength="2">
                <br>
              </div>
              <div class="formData" data-error="" data-error-visible="false">
                <label for="message">Votre message</label>
                <br>
                <textarea role="textbox" class="text-control" type="text" id="message" name="message" minlength="10" maxlength="200"></textarea>
                <br>
                <span class="message-error"></span>
              </div>
              <button role="button" class="btn-submit contact-button button" type="submit" id="submit">Envoyer</button>
            </form>
            </div>
            <div class="success">
              <h2 class="success-form hide"> </h2>
              <div class="button-success hide">
                <button role="button" type="button" class="btn-submit contact-button success-form-button">Fermer</button>
              </div>
            </div>
        </div>
      `;
    $modalContact.innerHTML = modalForm;
    this.contact.appendChild($modalContact);

    const contactBtn = document.querySelector(".contact-button");

    contactBtn.addEventListener("click", () => {
      displayModal();
    });

    function displayModal() {
      const modal = document.getElementById("contact_modal");
      modal.style.display = "block";
    }

    if (modalForm) {
      
      const closeBtn = document.getElementById("close");
      closeBtn.addEventListener("click", () => {
        closeModal();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      })
    }

    const closeModal = () => {
      const modal = document.getElementById("contact_modal");
      modal.style.display = "none";
    }

    
    const successBtn = document.querySelector(".success-form-button");
    successBtn.addEventListener('click', () => {
      closeSuccessModal()
    })
    
    const closeSuccessModal = () => {
      const modal = document.getElementById("contact_modal");
      modal.style.display = "none";
    }
  }
}