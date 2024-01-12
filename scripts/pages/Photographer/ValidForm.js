
setTimeout(() => {
  // Bouton de fermeture de la modal après confirmation d'envoi du formulaire, appel de clearForm
  const successFormBtn = document.querySelector(".success-form-button");
  if (successFormBtn) {
    successFormBtn.addEventListener("click", (event) => {
      event.preventDefault();
      clearForm();
    });
  }

  // Réinitialisation du formulaire (inputs success / form reset / message de confirmation) et fermeture de la modal
  const clearForm = () => {
    const form = document.querySelector(".form");
    form.classList.remove("hide");
    const formContact = document.querySelector("form");
    formContact.reset();
    const modal = document.querySelector(".modal");
    modal.style.marginTop = "5dvh";
    const successForm = document.querySelector(".success-form");
    successForm.classList.add("hide");
    successForm.textContent = "";
    const successBtnForm = document.querySelector(".button-success");
    successBtnForm.classList.add("hide");
  };

  // Ecoute du bouton submit pour envoi du formulaire
  const submit = document.querySelector(".btn-submit");
  if (submit) {
    submit.addEventListener("click", (event) => {
      // Ecoute du bouton submit, qui récupère les valeurs de tous les champs appelés
      event.preventDefault();
      validForm();
    });
  }

  // Vérification du formulaire, si les données sont valides, on appelle submitForm
  const validForm = () => {
    let firstNameValue = validString("firstName");
    let lastNameValue = validString("lastName");
    let emailValue = validEmail();
    let messageValue = validMessage();

    // si toutes les validations retournent true, alors on peut appeler submitForm
    if (firstNameValue && lastNameValue && emailValue && messageValue) {
      console.log('tous les inputs sont validés');
      submitForm();

      return true;
    }

    return false;
  };

  // Données valides, on affiche alors le message de confirmation + bouton pour fermer la modal
  const submitForm = () => {
    const form = document.querySelector(".form");
    form.classList.add("hide");
    const modal = document.querySelector(".modal");
    modal.style.marginTop = "30dvh";
    const successForm = document.querySelector(".success-form");
    successForm.classList.remove("hide");
    successForm.textContent = "Merci pour les informations !";
    const successBtnForm = document.querySelector(".button-success");
    successBtnForm.classList.remove("hide");
    clearAllSuccessInput();
  };

  // Vérifie si le prénom et nom match avec la regex, et si les valeurs ne sont pas nulles
  const validString = (elementId) => {
    const inputId = document.querySelector(`#${elementId}`);
    const regexFirstLastName = /^([a-zA-Zà-üÀ-Ü0-9_ \s'-]){2,}$/g;

    if (regexFirstLastName.test(inputId.value)) {
      displayErrorMessage(elementId, "");
      successInput(elementId);

      return true;
    }

    displayErrorMessage(elementId, "Nom saisi invalide");

    return false;
  };

  // Vérifie si l'email match avec le regex
  const validEmail = () => {
    const email = document.querySelector("#email");
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;

    if (regexEmail.test(email.value)) {
      displayErrorMessage("email", "");
      successInput("email");
      return true;
    }

    displayErrorMessage("email", "Email saisi invalide");

    return false;
  };

  // Vérifie si le prénom et nom match avec la regex, et si les valeurs ne sont pas nulles
  const validMessage = () => {
    const inputId = document.querySelector(`#message`);

    if (inputId.value.trim().length >= 10) {
      const errorMessage = document.querySelector(".message-error");
      errorMessage.innerHTML = "";
      errorMessage.className = "message-error";
      successInput("message")
      return true;
    }

    const errorMessage = document.querySelector(".message-error");
    errorMessage.innerHTML = "Le message ne peut être vide";
    errorMessage.className = "message-error activeErrorMessage";

    return false;
  };

  // Ajout du message du data-error et passe la visibilité en true
  // Si la classe valid-input est présente, alors on la supprime pour afficher le data-error
  const displayErrorMessage = (inputId, message) => {
    const inputElement = document.querySelector(`#${inputId}`);
    if (inputElement) {
      const parentDiv = inputElement.closest("div");
      parentDiv.setAttribute("data-error", message);

      if (message) {
        if (inputElement.classList.contains("valid-input")) {
          inputElement.classList.remove("valid-input");
        }

        parentDiv.setAttribute("data-error-visible", "true");
      } else {
        parentDiv.removeAttribute("data-error-visible");
      }
    }
  };

  // Ajout de la classe valid-input si l'input ciblé a des données valides
  const successInput = (elementId) => {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.classList.add("valid-input");
    }
  };

  // Suppression de tous les success input
  const clearAllSuccessInput = () => {
    const element = document.querySelectorAll(`.text-control`);
    element.forEach((input) => {
      if (input) {
        input.classList.remove("valid-input");
      }
    });
  };

  // Récupération et validation de l'input text au focus out
  const firstnameField = document.querySelector("#firstName");
  if (firstnameField) {
    console.log('input name récupéré');
    firstnameField.addEventListener("focusout", () => {
      validString("firstName");
    });
  } else {
    console.log('input name NON récupéré');
  }

  // Récupération et validation de l'input text au focus out
  const lastnameField = document.querySelector("#lastName");
  if (lastnameField) {
    lastnameField.addEventListener("focusout", () => {
      validString("lastName");
    });
  }

  // Récupération et validation de l'input text au focus out
  const emailField = document.querySelector("#email");
  if (emailField) {
    emailField.addEventListener("focusout", () => {
      validEmail();
    });
  }

  // Récupération et validation de l'input text au focus out
  const messageField = document.querySelector("#message");
  if (messageField) {
    messageField.addEventListener("focusout", () => {
      validMessage();
    });
  }
}, 1000);
