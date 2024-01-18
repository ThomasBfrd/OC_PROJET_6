import PhotographerMedias from "../../factories/GalleryFactory.js";
import LikeMedia from "./MediasLikes.js";

export default class SortMedia {
  constructor(medias, profile) {
    this.originalMedias = medias;
    this.sortedMedias = [...this.originalMedias];
    this.profile = profile;

    const dropdown = document.querySelector(".dropdown");

    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    select.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        this.changeMenu(option)
      });
    });

    let currentlySelectedIndex = -1; // Initialisation de l'index de l'option actuellement sélectionnée

    options.forEach((option) => {
     option.addEventListener('keydown', (event) => {
       if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
         event.preventDefault();
         currentlySelectedIndex--;
         if (currentlySelectedIndex < 0) {
           currentlySelectedIndex = options.length - 1; // Si on dépasse le début du tableau, on revient à la fin
         }
         options[currentlySelectedIndex].focus();
       } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
         event.preventDefault();
         currentlySelectedIndex++;
         if (currentlySelectedIndex >= options.length) {
           currentlySelectedIndex = 0; // Si on dépasse la fin du tableau, on revient au début
         }
         options[currentlySelectedIndex].focus();
       } else if (event.key === 'Enter') {
        this.changeMenu(option)
       } else if (event.key === 'Escape') {
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
       }
     });
    }); 
     
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.classList.remove("menu-open");
        caret.classList.remove("caret-rotate");
      }
    })

    // On récupère au clique le "li" sélectionné pour trier la liste des médias
    const menuItems = document.querySelectorAll(".menu li");
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        const selectedId = item.innerHTML;
        console.log(selectedId);
        this.filterSelected(selectedId);

        // Une fois que mediasSorted est mis à jour, il faut également le mettre à jour dans le DOM
        // On appelle donc la méthode updateMediaSection
        this.updateMediaSection(this.sortedMedias);
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const selectedId = item.innerHTML;
          this.filterSelected(selectedId);

          // Une fois que mediasSorted est mis à jour, il faut également le mettre à jour dans le DOM
          // On appelle donc la méthode updateMediaSection
          this.updateMediaSection(this.sortedMedias);
        }
      });
    });
  }

  filterSelected(selectedId) {
    switch (selectedId) {
      case "Popularité":
        this.sortedMedias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        this.sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Titre":
        this.sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
        break;

      // Par défaut, on affiche la liste de base des médias, non triée
      default:
        this.sortedMedias = this.originalMedias;
        break;
    }
  }

  changeMenu(optionValues) {
    const dropdown = document.querySelector(".dropdown");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    selected.textContent = optionValues.textContent;
    caret.classList.remove("caret-rotate");
    menu.classList.remove("menu-open");
    options.forEach((optionValues) => {
      optionValues.classList.remove("active");
    });
    optionValues.classList.add("active");
  }

  updateMediaSection(medias) {

    document.querySelector(".medias").innerHTML = "";
    new PhotographerMedias().createMediaCard(medias, this.profile);
    new LikeMedia();
  }
}
